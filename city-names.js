/* Historical city labels. GPL-3.0. Data and references: city-names.json. */
(function(root){
'use strict';
function sourceList(entry,period,data){return [...new Set(period?.sources?.length?period.sources:entry?.sources||[])].map(id=>data.sources[id]).filter(Boolean);}
function resolve(c,year,data){
 const e=data.entries[c[0]];const period=e?.periods.find(p=>year>=p.from&&year<=p.to);
 return {modern:c[0],region:c[3],name:period?.name||null,point:period?.point||[c[1],c[2]],period,kind:period?.kind||'城邑／治所称谓',note:[e?.note,period?.note].filter(Boolean).join(' '),sources:sourceList(e,period,data),status:period?'已有资料依据':'此年称谓或城址待核'};
}
function all(cities,year,data,modern=false){
 const list=cities.map(c=>resolve(c,year,data)).filter(c=>modern||c.name);
 for(const e of data.extra||[]){const p=e.periods.find(p=>year>=p.from&&year<=p.to);if(p)list.push({modern:e.modern,region:e.region,name:p.name,point:p.point||e.point,period:p,kind:p.kind||'独立古城址',note:[e.note,p.note].filter(Boolean).join(' '),sources:sourceList(e,p,data),status:'已有资料依据',extra:true});}
 return list;
}
const api={resolve,all,sourceList};if(typeof module==='object'&&module.exports)module.exports=api;else root.CityNames=api;
})(typeof globalThis==='object'?globalThis:this);
