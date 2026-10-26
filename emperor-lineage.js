/* Explicit regnal rosters, independent of repeated reign intervals and map dates. */
(function(root){
'use strict';
const esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
let ctx;
function labelOf(d){return d.label==='刘宋'?'（南朝）宋':d.label;}
function canonical(name){return ({'拓跋宏':'元宏','拓跋恪':'元恪','拓跋诩':'元诩','元脩':'元修','拓跋浚':'拓跋濬'})[name]||name;}
function rankOf(d,name){return d.names.findIndex(n=>canonical(n)===canonical(name))+1;}
function ordinal(data,id,name){const dynasty=data.dynasties.find(d=>d.id===id||d.label===id);if(!dynasty)return null;const rank=rankOf(dynasty,name);return {dynasty,rank:rank||null,total:dynasty.names.length};}
function resolve(feature,year){if(year<-221)return "先秦王系";const title=typeof feature==='string'?feature:feature.properties.title;const aliases={'汉':'西汉','汉（郡国并行）':'西汉','魏':'曹魏','蜀':'蜀汉','刘备势力':'蜀汉','孙权势力':'孙吴','吴':'孙吴','晋':year<317?'西晋':'东晋','宋':year<600?'刘宋':'北宋','齐':'南齐','梁':'梁','陈':'陈','周（武周）':'武周','新（王莽）':'新朝','新':'新朝','后金':'清','大蒙古国':'元','蒙古':'元','唐（李渊）':'唐','唐 · 岐（关中）':'唐','南宋（闽广行朝）':'南宋','契丹':'辽'};return year>=690&&year<=704&&title==='唐'?'武周':aliases[title]||title;}
function caveat(id,name,year){if(id==='北魏'&&name==='拓跋珪'&&year<398)return '此时尚未称皇帝；398年称帝，按北魏帝系列第1位。';if(id==='北周'&&name==='宇文觉')return '在位时称周天王，皇帝称号为后来追尊；按通行北周帝系列第1位。';if(id==='北周'&&name==='宇文毓'&&year<559)return '此时称天王；559年改称皇帝，按北周帝系列第2位。';if(id==='秦'&&name==='子婴')return '子婴以秦王身份在位，另列末主，不编入两位皇帝的序号。';if(id==='西汉'&&name==='刘婴')return '孺子婴未正式即皇帝位，不编入皇帝序号；当时实际权力在王莽手中。';if(id==='隋'&&['杨侗','杨浩'].includes(name))return '隋末另立者；本表采用文帝、炀帝、恭帝杨侑三帝主线，另见计数说明。';if(id==='西汉'&&name==='刘邦'&&year<-202)return '此时为汉王；前202年称帝，列入西汉帝系第1位。';if(id==='孙吴'&&name==='孙权'&&year<229)return '此时尚未称帝；229年称帝，列入孙吴帝系第1位。';if(id==='东晋'&&name==='司马睿'&&year===317)return '此时为晋王；318年称帝，列入东晋帝系第1位。';if(id==='清'&&name==='努尔哈赤')return '此时为后金大汗；清太祖为追尊称号，按清十二帝的通行帝系列第1位。';if(id==='清'&&name==='皇太极'&&year<1636)return '此时为后金大汗；1636年称帝并改国号清。';if(id==='元'&&name==='忽必烈'&&year<1271)return '此时为蒙古大汗；1271年定国号元，按元代帝系列第1位。';if(id==='西夏'&&name==='李元昊'&&year<1038)return '此时尚未称帝；1038年称帝，按西夏帝系列第1位。';if(id==='辽'&&name==='耶律阿保机'&&year<916)return '此时为契丹首领；916年称帝，按辽代帝系列第1位。';return '';}
const calendar=root.HistoryYears||(typeof require==='function'?require('./history-years.js'):null);
function icon(crowned=true){return '<svg width="24" height="32" viewBox="0 0 24 32" aria-hidden="true" class="regal-person">'+(crowned?'<path class="regal-hat" d="M2 2h20v4H2zM7 6h10v3H7z"/><path class="regal-beads" d="M4 6v6M20 6v6M7 6v3M17 6v3"/>':'')+'<circle cx="12" cy="12" r="3.5"/><path d="M7 18l5-2 5 2 4 12H3z"/><path class="regal-collar" d="M8 17l4 6 4-6M12 23v7"/></svg>';}
function identities(info,year){return (info.rulers||[]).map(p=>{const reigns=(info.annualReigns||[]).filter(r=>canonical(r.name)===canonical(p.name)),eras=reigns.flatMap(r=>calendar.era(r,year));return {...p,label:(p.title&&p.title!==p.name?p.title:'在位者')+' '+p.name,era:[...new Set(eras.map(e=>calendar.eraLabel(e)))].join('／'),eraKey:[...new Set(eras.map(e=>e.name))].join('/')};});}
function describe(info,year){return identities(info,year).map(p=>p.label+(p.era?' · '+p.era:'')).join(' ／ ')||'本年在位者待核';}
function isImperial(feature,name,year){if(!ctx)return false;return !!ordinal(ctx.data,resolve(feature,year),name)?.rank;}
function mount(context){ctx=context;}
function reignsFor(name,id,all){return all.filter(r=>canonical(r.name)===canonical(name)&&r.role==='ruler'&&(r.dynasty===id||resolve(r.polity,r.from)===id));}

function reignYears(name,id,year,info){
  if(!ctx)return null;
  const axis=y=>y<0?y:y-1;
  const matches=reignsFor(name,id,ctx.getReigns().reigns),current=matches.filter(r=>year>=r.from&&year<=r.to);
  if(!current.length)return null;
  const imperialStart=({'西汉|刘邦':-202,'孙吴|孙权':229,'东晋|司马睿':318,'辽|耶律阿保机':916,'西夏|李元昊':1038,'清|皇太极':1636,'北周|宇文毓':559})[id+'|'+canonical(name)];const floor=imperialStart!==undefined&&year>=imperialStart?imperialStart:-Infinity;
  const intervals=matches.filter(r=>r.from<=year&&r.to>=floor).map(r=>[axis(Math.max(r.from,floor)),axis(Math.min(year,r.to))]).sort((a,b)=>a[0]-b[0]);
  let total=0,end=-Infinity;
  for(const [from,to] of intervals){if(to>end){total+=to-Math.max(from,end+1)+1;end=to;}}
  return total>0?total:null;
}
function tenureLabel(name,id,year,info){const n=reignYears(name,id,year,info);return n?'在位'+n+'年':'在位';}


function totalTenureLabel(name,id){
  if(!ctx)return '年数待核';
  const reported=ctx.data.dynasties.find(d=>d.id===id||d.label===id)?.tenureTotals?.[canonical(name)];if(reported)return reported.label;
  const rs=reignsFor(name,id,ctx.getReigns().reigns);
  if(!rs.length)return '年数待核';
  const last=Math.max(...rs.map(r=>r.to)),inclusive=reignYears(name,id,last,{});
  if(!inclusive)return '年数待核';
  if(inclusive===1)return '不足1年';
  // Only annual bounds are available; avoid pretending to know exact elapsed anniversaries.
  const segments=rs.filter(r=>r.from<=last).sort((a,b)=>a.from-b.from).reduce((acc,r)=>{if(!acc.length||r.from>acc[acc.length-1][1]+1)acc.push([r.from,r.to]);else acc[acc.length-1][1]=Math.max(acc[acc.length-1][1],r.to);return acc;},[]);
  return '在位约'+Math.max(1,inclusive-segments.length)+'年';
}

function shortTitle(title,id){let out=String(title||'');for(const prefix of [id,'南朝宋','南朝齐','南朝梁','南朝陈',...(id==='南宋'||id==='北宋'?['宋']:[])])if(prefix&&out.startsWith(prefix)&&out.length>prefix.length){out=out.slice(prefix.length);break;}return out;}
function verticalRoster(d,id,info,year){const active=new Set((info.rulers||[]).map(r=>canonical(r.name))),all=ctx.getReigns().reigns;return '<ol class="court-vertical-roster" aria-label="'+esc(labelOf(d))+'帝系，共'+d.names.length+'位">'+d.names.map((name,i)=>{const rs=reignsFor(name,id,all),title=d.titles?.[name]||rs[0]?.title||name,on=active.has(canonical(name)),range=rs.map(r=>ctx.yr(r.from)+'—'+ctx.yr(r.to)).join('／'),canJump=rs.length&&typeof ctx.setYear==='function',tag=canJump?'button':'div';return '<li class="court-reign-row'+(on?' is-reigning':'')+'"'+(on?' aria-current="true"':'')+'><'+tag+' class="court-reign-item"'+(canJump?' type="button" data-court-reign="'+i+'"':'')+' title="'+esc(title+' '+name+(range?' · '+range:''))+'" aria-label="'+esc('第'+(i+1)+'位，'+title+' '+name+'，'+(on?'本年'+tenureLabel(name,id,year,info):totalTenureLabel(name,id))+(canJump?'，跳到首次即位年份':''))+'"><span class="court-reign-number">'+String(i+1).padStart(2,'0')+'</span><span class="court-reign-identity"><b class="court-reign-title">'+esc(title)+'</b><i class="court-reign-dot" aria-hidden="true">·</i><span class="court-reign-name">'+esc(name)+'</span></span>'+'<em class="court-reign-status" title="'+(on?'截至所选年份：即位当年记1年；不等同年号年次':esc(d.tenureTotals?.[canonical(name)]?.note||'完整在位区间的约年数，按已收录起止年份估算；不精确到月日。尚未即位者也显示完整区间。'))+'">'+esc(on?tenureLabel(name,id,year,info):totalTenureLabel(name,id))+'</em>'+'</'+tag+'></li>';}).join('')+'</ol>'+((info.rulers||[]).length>1?'<small class="court-year-note">本年先后更替，按年并列点亮</small>':'');}
function renderSingle(feature,info){if(!ctx)return;const year=ctx.getYear(),id=resolve(feature,year),d=ctx.data.dynasties.find(d=>d.id===id||d.label===id),top=document.getElementById('emperorReadout'),roster=document.getElementById('emperorRoster'),rulers=info.rulers||[],people=identities(info,year),reference=info.referenceRulers||[],power=(info.powerHolders||[]).filter(p=>!rulers.some(r=>r.name===p.name));top.hidden=!d&&!rulers.length&&!power.length&&!reference.length;roster.hidden=!d;if(top.hidden)return;const listed=d&&!info.referenceOnly,listedNames=new Set(d?.names.map(canonical)||[]),unlisted=people.filter(p=>!listedNames.has(canonical(p.name))),statusNotes=people.map(p=>caveat(id,p.name,year)).filter(Boolean);const headingArt=listed&&root.DynastyLettering?.cardHeader(d.label,year,d.names.length,d.note);const html='<div class="sovereign-heading"><span>'+esc(listed?labelOf(d)+'帝系':(info.referenceOnly?'时代人物 · ':'在位统治者 · ')+((id==='武周'?'武周':info.displayTitle)||feature.properties?.title||''))+'</span>'+(d?'<small title="'+esc(d.note)+'">共 '+d.names.length+' 位</small>':'')+'</div>'+(listed?verticalRoster(d,id,info,year):people.map(p=>'<div class="sovereign-person"><div><strong>'+esc(p.label)+'</strong></div></div>').join(''))+(listed&&unlisted.length?unlisted.map(p=>'<div class="court-unlisted-current">本年在位 · '+esc(p.label)+'</div>').join(''):'')+(!people.length&&!reference.length?'<p class="emperor-caveat">本年在位者待核</p>':'')+(info.referenceOnly&&reference.length?reference.map(p=>'<div class="sovereign-person"><div><strong>'+esc(p.title)+' '+esc(p.name)+'</strong><small>约时代背景，不作本年在位断言</small></div></div>').join(''):'')+(statusNotes.length?'<details class="sovereign-caveat"><summary>身份说明</summary><p>'+statusNotes.map(esc).join(' ')+'</p></details>':'')+(power.length?'<div class="sovereign-power"><span>实权／军政</span>'+power.map(p=>'<b>'+esc(p.title)+' '+esc(p.name)+'</b>').join('')+'</div>':'');const finalHtml=headingArt?html.replace(/<div class="sovereign-heading">[\s\S]*?<\/div>/,headingArt):html;const key=id+'|'+people.map(p=>p.name+':'+p.title+':'+p.eraKey).join('|')+'|'+power.map(p=>p.name).join('|');if(root.AtlasMotion)root.AtlasMotion.replace(top,finalHtml,key);else top.innerHTML=finalHtml;top.classList.toggle('has-vertical-roster',!!listed);top.querySelectorAll('[data-court-reign]').forEach(button=>{button.onclick=()=>{const name=d.names[+button.dataset.courtReign],rs=reignsFor(name,id,ctx.getReigns().reigns);if(rs.length){ctx.stop?.();ctx.setYear(Math.min(...rs.map(r=>r.from)));}};});if(listed){const list=top.querySelector('.court-vertical-roster'),activeRow=list?.querySelector('.is-reigning');if(list&&activeRow){const rowTop=activeRow.offsetTop-list.offsetTop;if(rowTop<list.scrollTop||rowTop+activeRow.offsetHeight>list.scrollTop+list.clientHeight)list.scrollTop=Math.max(0,rowTop-list.clientHeight/2+activeRow.offsetHeight/2);}}if(!d)return;const link=top.querySelector('a');if(link)link.onclick=e=>{e.preventDefault();ctx.stop?.();const library=document.getElementById('libraryDialog');if(library&&!library.open)library.showModal();roster.querySelector('details').open=true;let ancestor=roster.parentElement;while(ancestor){if(ancestor.tagName==='DETAILS')ancestor.open=true;ancestor=ancestor.parentElement;}roster.scrollIntoView({block:'start'});};const active=new Set(rulers.map(r=>canonical(r.name)));const all=ctx.getReigns().reigns;roster.innerHTML='<details><summary>'+esc(labelOf(d))+'帝系 · 共 '+d.names.length+' 位'+(rulers.length?' · 当前 '+rulers.map(r=>{const n=rankOf(d,r.name);return esc(r.name)+(n?'（第'+n+'位）':'');}).join('／'):'')+'</summary><p class="roster-note">'+esc(d.note)+'</p><ol class="emperor-list">'+d.names.map((name,i)=>{const r=all.find(r=>canonical(r.name)===canonical(name)&&r.role==='ruler'&&(r.dynasty===id||resolve(r.polity,r.from)===id));return '<li class="'+(active.has(canonical(name))?'active':'')+'"><span class="emperor-number">'+(i+1)+'</span><span><b>'+esc(r?.title||d.titles?.[name]||name)+'</b>'+(r?'<small>'+esc(name)+'</small>':'')+'</span>'+(active.has(canonical(name))?'<em>本年在位</em>':'')+'</li>';}).join('')+'</ol><div class="roster-sources">'+d.sources.map(id=>ctx.data.sources[id]).filter(Boolean).map(s=>'<a href="'+esc(s.url)+'" target="_blank" rel="noopener">'+esc(s.title)+' ↗</a>').join('')+'</div><p class="roster-note">按本表列明的帝系统计人物；复位沿用原序号，追尊、另立、短期在位等范围见各朝说明。同年先后继位可能同时高亮，不表示同时执政。</p></details>';
}

const expandedCourts=new Set();
function peerCourts(year){if(!ctx?.getPeers)return [];const seen=new Set();return ctx.getPeers().flatMap(peer=>{const id=resolve(peer.feature,year),dynasty=ctx.data.dynasties.find(d=>d.id===id||d.label===id);if(!dynasty||peer.info.referenceOnly||seen.has(dynasty.id))return [];seen.add(dynasty.id);return [{...peer,id,dynasty}];});}

function arrangeCourts(peers,year){
  let north=[],south=[];
  if(year>=220&&year<=280){north=['曹魏','西晋'];south=['蜀汉','孙吴'];}
  else if(year>=317&&year<=589){north=['北魏','西魏','东魏','北周','北齐','隋'];south=['东晋','刘宋','南齐','梁','陈'];}
  else if(year>=1127&&year<=1279){north=['辽','金','西夏','元'];south=['南宋'];}
  const marked=peers.map(p=>({...p,band:north.includes(p.id)?'north':south.includes(p.id)?'south':''})),nc=marked.filter(p=>p.band==='north').length,sc=marked.filter(p=>p.band==='south').length;
  if(!nc||!sc||nc+sc!==peers.length||nc>2||sc>2)return {name:'',peers,north:0,south:0};
  marked.sort((a,b)=>(a.band==='north'?0:1)-(b.band==='north'?0:1)||(a.band==='north'?north.indexOf(a.id)-north.indexOf(b.id):south.indexOf(a.id)-south.indexOf(b.id)));
  return {name:'geographic-courts',peers:marked,north:nc,south:sc};
}

function render(feature,info){
  if(!ctx)return;
  const top=document.getElementById('emperorReadout');
  top.classList.remove('parallel-courts');top.setAttribute('aria-label','当前皇帝的本朝序位');
  renderSingle(feature,info);
  const year=ctx.getYear(),layout=arrangeCourts(peerCourts(year),year),peers=layout.peers;
  if(peers.length<2)return;
  top.hidden=false;top.classList.remove('has-vertical-roster');top.classList.add('parallel-courts');top.dataset.northCount=layout.north;top.dataset.southCount=layout.south;top.dataset.courtLayout=layout.name;
  top.setAttribute('aria-label','本年并立政权及统治者，共'+peers.length+'组');
  top.innerHTML='<div class="parallel-courts-heading"><b>并立政权</b><span>'+peers.length+' 组 · 帝系可展开</span></div><div class="parallel-courts-grid '+layout.name+'">'+peers.map((peer,i)=>{
    const d=peer.dynasty,people=identities(peer.info,year),title=peer.feature.properties.title,formal=(title==='刘备势力'&&year<221)||(title==='孙权势力'&&year<229)||['后金','大蒙古国','蒙古'].includes(title)?title:labelOf(d);
    const current=people.length?people.map(p=>'<strong>'+esc(p.label)+'</strong>').join(''):'<span class="parallel-unresolved">本年在位者待核</span>';
    const ranks=people.map(p=>rankOf(d,p.name)).filter(Boolean),eras=[...new Set(people.map(p=>p.era).filter(Boolean))],notes=people.map(p=>caveat(peer.id,p.name,year)).filter(Boolean),power=(peer.info.powerHolders||[]).filter(p=>!people.some(r=>r.name===p.name));
    return '<article class="parallel-court'+(peer.feature===feature?' is-selected':'')+'" style="--court-accent:'+esc(peer.color)+'" data-parallel-court="'+i+'" data-court-band="'+(peer.band||'')+'"><button class="parallel-court-select" data-peer-select="'+i+'" aria-label="选择'+esc(formal)+'疆域与纪年"><span><i aria-hidden="true"></i>'+esc(formal)+'</span><small>共 '+d.names.length+' 位</small></button><div class="parallel-current">'+current+'</div><div class="parallel-court-meta">'+esc([ranks.length?'第 '+ranks.join('／')+' 位':'',...people.map(p=>reignYears(p.name,peer.id,year,peer.info)).filter(Boolean).map(n=>'在位'+n+'年'),...eras].filter(Boolean).join(' · '))+'</div>'+(people.length>1?'<small class="parallel-year-change">本年先后更替</small>':'')+(power.length?'<div class="parallel-power">实权 · '+power.map(p=>esc((p.title||'')+' '+p.name)).join('／')+'</div>':'')+'<details class="parallel-court-roster" data-peer-roster="'+i+'"'+(expandedCourts.has(d.id)?' open':'')+'><summary>'+esc(labelOf(d))+'帝系</summary>'+verticalRoster(d,peer.id,peer.info,year)+(notes.length?'<p class="parallel-roster-note">'+notes.map(esc).join(' ')+'</p>':'')+'<p class="parallel-roster-note">'+esc(d.note)+'</p></details></article>';
  }).join('')+'</div>';
  top.querySelectorAll('[data-peer-select]').forEach(b=>b.onclick=()=>{ctx.stop?.();ctx.selectPeer?.(peers[+b.dataset.peerSelect].index);});
  top.querySelectorAll('[data-peer-roster]').forEach(el=>{const peer=peers[+el.dataset.peerRoster];el.ontoggle=()=>{if(el.open)expandedCourts.add(peer.dynasty.id);else expandedCourts.delete(peer.dynasty.id);if(el.open){const list=el.querySelector('.court-vertical-roster'),active=list?.querySelector('.is-reigning');if(list&&active)list.scrollTop=Math.max(0,active.offsetTop-list.offsetTop-list.clientHeight/2);}};el.querySelectorAll('[data-court-reign]').forEach(b=>b.onclick=()=>{const name=peer.dynasty.names[+b.dataset.courtReign],rs=reignsFor(name,peer.id,ctx.getReigns().reigns);if(rs.length){ctx.stop?.();ctx.setYear(Math.min(...rs.map(r=>r.from)));}});});
}

function decorateTrack(){if(!ctx)return;const all=ctx.getReigns().reigns;document.querySelectorAll('.reign-bar').forEach(b=>{b.querySelector('.emperor-bar-rank')?.remove();const r=all.find(r=>r.name===b.dataset.name&&r.from<=+b.dataset.from&&r.to>=+b.dataset.from&&r.role==='ruler');if(!r)return;const id=r.dynasty==='东汉'?'东汉':resolve(r.polity,r.from),o=ordinal(ctx.data,id,r.name);if(!o?.rank)return;if(b.getBoundingClientRect().width<105){b.title+=' · 本朝第'+o.rank+'位 / 共'+o.total+'位';return;}const rank=document.createElement('em');rank.className='emperor-bar-rank';rank.textContent='第'+o.rank+' / '+o.total+'位';b.append(rank);b.setAttribute('aria-label',r.title+' '+r.name+'，本朝第'+o.rank+'位，共'+o.total+'位，'+ctx.yr(+b.dataset.from)+'至'+ctx.yr(+b.dataset.to)+'，选择年份');});}
const api={arrangeCourts,totalTenureLabel,reignYears,tenureLabel,ordinal,resolve,caveat,icon,identities,describe,isImperial,mount,render,decorateTrack};root.EmperorLineage=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
