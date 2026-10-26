/* Source-backed place-name explorer. GPL-3.0. */
(function(root){
'use strict';
let context;
const el=id=>document.getElementById(id);
const esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function links(sources){return sources.map(s=>'<li><a href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer">'+esc(s.title)+' ↗</a>'+(s.evidence?'<p>'+esc(s.evidence)+'</p>':'')+'</li>').join('');}
function render(){
 const {cities,data,getYear,yr}=context,year=getYear(),query=el('cityEvidenceSearch').value.trim();
 const records=cities.map(c=>({c,entry:data.entries[c[0]],current:CityNames.resolve(c,year,data)}));
 for(const e of data.extra||[])records.push({c:[e.modern,...e.point,e.region],entry:e,current:CityNames.all([],year,{...data,extra:[e]})[0]||{modern:e.modern,name:null,note:e.note},extra:true});
 const total=records.filter(r=>r.current.name).length;
 el('cityEvidenceYear').textContent=yr(year)+' · 当前浏览年份';
 el('cityEvidenceStats').textContent='本年 '+total+' 处有名称依据 · 共 '+records.length+' 处参照地／独立城址 · '+Object.values(data.entries).reduce((n,e)=>n+e.periods.length,0)+' 段名称记录';
 const filtered=records.filter(r=>!query||[r.c[0],r.c[3],...(r.entry?.periods||[]).map(p=>p.name)].join(' ').includes(query));
 filtered.sort((a,b)=>Number(!!b.current.name)-Number(!!a.current.name));
 el('cityEvidenceResults').innerHTML=filtered.map(({c,entry,current,extra})=>{
 const periods=entry?.periods||[],active=current.period;
 const sources=current.name?current.sources:CityNames.sourceList(entry,null,data);
 return '<article class="evidence-card"><div class="evidence-card-head"><div><span class="evidence-modern">'+(extra?'独立古城址 · ':'今地参照 · ')+esc(c[0])+'</span><h3>'+esc(current.name||'本年暂不标注')+'</h3></div><span class="evidence-status '+(!current.name?'pending':'')+'">'+esc(current.name?(current.name===c[0]?'当时已用此名':current.kind||'历史称谓'):'称谓／城址待核')+'</span></div>'+(active?'<p class="evidence-range">本表适用：'+yr(active.from)+' — '+yr(active.to)+'</p>':'')+'<p>'+esc(current.note||entry?.note||'该年的名称与城址尚未可靠确认。')+'</p>'+(active?.evidence?'<p>'+esc(active.evidence)+'</p>':'')+'<ul class="evidence-links">'+links(sources)+'</ul><details class="evidence-timeline" '+(query?'open':'')+'><summary>查看已整理的名称沿革 · '+periods.length+' 段</summary><ol>'+periods.map(p=>'<li class="'+(year>=p.from&&year<=p.to?'is-current':'')+'"><span>'+yr(p.from)+' — '+yr(p.to)+'</span><strong>'+esc(p.name)+'</strong><small>'+esc(p.kind||'城邑／治所称谓')+'</small>'+(p.note?'<p>'+esc(p.note)+'</p>':'')+'<ul class="evidence-links">'+links(CityNames.sourceList(entry,p,data))+'</ul></li>').join('')+'</ol></details></article>';
 }).join('')||'<p class="no-result">没有找到对应城名。可输入“西安”“长安”“开封”等今名或古名。</p>';
}
function open(name=''){context.stop();el('cityEvidenceSearch').value=name;render();const d=el('cityEvidenceDialog');if(!d.open)d.showModal();d.scrollTop=0;}
function init(ctx){context=ctx;el('cityEvidenceBtn').onclick=()=>open();el('closeCityEvidence').onclick=()=>el('cityEvidenceDialog').close();el('cityEvidenceSearch').oninput=render;}
root.CityEvidence={init,open};
})(globalThis);
