/* Unified local search across calendar years, periods, rulers, eras and events. */
(function(root){
'use strict';
const esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const norm=s=>String(s??'').normalize('NFKC').toLowerCase().replace(/[\s·・，,。()（）—－-]/g,'');
const labels={year:'年份',event:'事件',dynasty:'朝代／分期',ruler:'帝王／统治者',era:'年号'};
const glyphs={year:'历',event:'事',dynasty:'朝',ruler:'君',era:'元'};
function parseYear(value,min=-2070,max=1911){
 const s=String(value).normalize('NFKC').trim().replace(/\s+/g,'');
 let year;
 if(/^-?\d{1,5}(?:年)?$/.test(s))year=Number(s.replace(/年$/,''));
 else {const before=s.match(/^(?:公元前|前|BCE?|B\.C\.?)(\d{1,5})年?$/i)||s.match(/^(\d{1,5})(?:BCE?|B\.C\.?)$/i);const after=s.match(/^(?:公元|AD|CE)(\d{1,5})年?$/i)||s.match(/^(\d{1,5})(?:AD|CE)$/i);if(before)year=-Number(before[1]);else if(after)year=Number(after[1]);}
 if(year===undefined)return null;
 return {year,error:year===0?'历史纪年没有公元0年，请输入公元前1年或公元1年。':year<min||year>max?'可跳转范围为公元前2070年至公元1911年。':null};
}
function indexData({events,reigns,lineages,dynasties},yr){
 const entries=[],periods=new Set(),groups=new Map();
 const range=(a,b)=>yr(a)+(b!==undefined&&b!==a?'—'+yr(b):'');
 for(const d of dynasties){periods.add(d.name);entries.push({id:'dynasty:'+d.name,type:'dynasty',title:d.name,subtitle:range(d.from,d.to)+(d.kind==='period'?' · 历史分期':''),year:d.from,terms:[d.name]});}
 for(const d of dynasties)for(const [from,to,label] of d.segments||[]){const title=label.replace(/（.*?）/g,'');if(periods.has(title))continue;periods.add(title);entries.push({id:'segment:'+title,type:'dynasty',title,subtitle:range(from,to)+' · '+d.name+'代分段',year:from,terms:[title,...title.split('·')]});}
 for(const d of lineages.dynasties){const rs=reigns.reigns.filter(r=>r.dynasty===d.label);if(!periods.has(d.label)&&rs.length){const from=Math.min(...rs.map(r=>r.from)),to=Math.max(...rs.map(r=>r.to));entries.push({id:'dynasty:'+d.label,type:'dynasty',title:d.label==='刘宋'?'（南朝）宋':d.label,subtitle:range(from,to),year:from,terms:[d.label,d.label==='刘宋'?'南朝宋':d.label]});}}
 for(const r of reigns.reigns){if(r.from>1911||r.to<-2070)continue;const key=r.dynasty+'|'+r.name;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(r);}
 for(const [key,rs] of groups){rs.sort((a,b)=>a.from-b.from);const r=rs[0],d=lineages.dynasties.find(d=>d.label===r.dynasty),title=d?.titles?.[r.name]||r.title||r.name;const terms=[r.name,title,r.dynasty,...rs.flatMap(v=>[v.title,...(v.eras||[]).map(e=>e.name)])];entries.push({id:'ruler:'+key,type:'ruler',title:title===r.name?r.name:title+' · '+r.name,subtitle:(r.dynasty==='刘宋'?'（南朝）宋':r.dynasty)+' · '+rs.map(v=>range(v.from,v.to)).join('／'),year:Math.max(-2070,r.from),name:r.name,polity:r.polity,terms});
  const seen=new Set();for(const v of rs)for(const era of v.eras||[]){const id=era.name+'|'+era.from;if(seen.has(id)||era.from>1911||era.to<-2070)continue;seen.add(id);entries.push({id:'era:'+key+'|'+id,type:'era',title:era.name,subtitle:title+' · '+r.name+' · '+range(era.from,era.to),year:Math.max(-2070,era.from),name:r.name,polity:r.polity,terms:[era.name,r.name,title,r.dynasty]});}
 }
 for(const e of events.events)entries.push({id:'event:'+e.id,type:'event',title:e.title,subtitle:range(e.year,e.endYear)+(e.endYear>e.year?' · 持续事件':'')+' · '+e.category,year:e.year,terms:[e.title,...(e.people||[])]});
 return entries.map(e=>({...e,keys:e.terms.map(norm)}));
}
function search(entries,query){const q=norm(query);if(!q)return [];return entries.map(e=>{const exact=e.keys.some(t=>t===q),prefix=e.keys.some(t=>t.startsWith(q)),match=e.keys.some(t=>t.includes(q));return {e,score:norm(e.title)===q?0:exact?1:prefix?2:match?3:9};}).filter(r=>r.score<9).sort((a,b)=>a.score-b.score||({dynasty:0,event:1,ruler:2,era:3}[a.e.type]-{dynasty:0,event:1,ruler:2,era:3}[b.e.type])||a.e.year-b.e.year).map(r=>r.e);}
function mount(ctx){
 const input=document.getElementById('atlasJump'),panel=document.getElementById('jumpPanel'),list=document.getElementById('jumpResults'),status=document.getElementById('jumpStatus'),clear=document.getElementById('jumpClear');
 const entries=indexData(ctx,ctx.yr);let matches=[],selected=-1;
 function close(){panel.hidden=true;input.setAttribute('aria-expanded','false');input.removeAttribute('aria-activedescendant');}
 function choose(i){const item=matches[i];if(!item)return;ctx.stop();close();ctx.setYear(item.year);if(item.name)ctx.selectRuler(item);input.value='';clear.hidden=true;input.blur();}
 function highlight(i){selected=i;list.querySelectorAll('[data-jump-index]').forEach((b,j)=>{b.classList.toggle('selected',j===i);b.setAttribute('aria-selected',String(j===i));});const active=list.querySelector('[data-jump-index="'+i+'"]');if(active){input.setAttribute('aria-activedescendant',active.id);active.scrollIntoView({block:'nearest'});}else input.removeAttribute('aria-activedescendant');}
 function draw(){const q=input.value.trim(),parsed=parseYear(q);clear.hidden=!q;panel.hidden=false;input.setAttribute('aria-expanded','true');
  if(parsed){matches=parsed.error?[]:[{id:'year:'+parsed.year,type:'year',title:'跳到'+ctx.yr(parsed.year),subtitle:'定位地图、统治者与当年事件',year:parsed.year}];status.textContent=parsed.error||'年份定位';}
  else if(q){const all=search(entries,q);matches=all.slice(0,30);status.textContent=all.length?'找到 '+all.length+' 项'+(all.length>30?' · 显示前30项，请继续输入缩小范围':''):'暂未找到匹配项，试试年份、朝代、帝王称号或事件名称。';}
  else{matches=[{id:'current',type:'year',title:ctx.yr(ctx.getYear()),subtitle:'当前年份',year:ctx.getYear()},...['安史之乱','唐太宗 · 李世民','秦','三国'].map(title=>entries.find(e=>e.title===title)).filter(Boolean)];status.textContent='输入年份、事件、朝代、帝王或年号';}
  list.innerHTML=matches.map((e,i)=>'<button type="button" role="option" id="jump-option-'+i+'" aria-selected="false" data-jump-index="'+i+'"><span class="jump-glyph jump-'+e.type+'" aria-hidden="true">'+glyphs[e.type]+'</span><span class="jump-text"><strong>'+esc(e.title)+'</strong><small>'+esc(e.subtitle)+'</small></span><span class="jump-kind">'+labels[e.type]+'</span></button>').join('');list.querySelectorAll('[data-jump-index]').forEach(b=>b.onclick=()=>choose(+b.dataset.jumpIndex));highlight(-1);
 }
 input.disabled=false;input.onfocus=()=>{ctx.stop();draw();};input.oninput=draw;
 input.onkeydown=e=>{if(e.isComposing)return;if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close();}else if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();if(panel.hidden)draw();if(matches.length)highlight(selected<0?(e.key==='ArrowDown'?0:matches.length-1):(selected+(e.key==='ArrowDown'?1:-1)+matches.length)%matches.length);}else if(e.key==='Enter'){e.preventDefault();if(panel.hidden)draw();if(matches.length)choose(selected<0?0:selected);}};
 clear.onclick=()=>{input.value='';input.focus();draw();};document.addEventListener('pointerdown',e=>{if(!e.target.closest('.atlas-jump'))close();});document.addEventListener('focusin',e=>{if(!e.target.closest('.atlas-jump'))close();});document.addEventListener('keydown',e=>{if(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!['INPUT','TEXTAREA','SELECT','BUTTON'].includes(e.target.tagName)&&!document.querySelector('dialog[open]')){e.preventDefault();input.focus();}});
}
const api={parseYear,indexData,search,mount};root.AtlasJump=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
