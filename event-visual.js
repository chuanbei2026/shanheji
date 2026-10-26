/* Shared event grammar: military conquest is distinct from succession or submission. */
(function(root){
'use strict';
const esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const types={conquest:['conquest','灭国','攻灭'],coalition:['conquest','灭国','联合攻灭'],replacement:['succession','更替','取代'],surrender:['surrender','归降','归降'],collapse:['collapse','终结','政权崩溃'],capture:['war','战争','攻陷']};
const paths={swords:'m3 3 3.5 1 11 11-2.5 2.5-11-11L3 3Zm18 0-3.5 1-11 11 2.5 2.5 11-11L21 3ZM13.5 18.5l5-5M16 16l5 5M18.5 21l2.5-2.5M5.5 13.5l5 5M8 16l-5 5M3 18.5 5.5 21',arrow:'M4 12h16m-5-5 5 5-5 5',collapse:'M5 6a9 9 0 0 1 13 0M20 10a9 9 0 0 1-8 11M7 20a9 9 0 0 1-4-10M12 4l-2 7 5 2-3 7',external:'M12 3a9 9 0 1 0 9 9M3 12h11M12 3c-4 5-4 13 0 18M12 21c2-2 3-4 3-6M15 3h6v6M21 3l-8 8'};
function icon(key){return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+(paths[key]||paths.arrow)+'"/></svg>';}
function outcome(e,outcomes=[]){return outcomes.find(o=>o.id===e.outcomeId)||e.relation||null;}
function kind(e,outcomes=[]){const o=outcome(e,outcomes);if(o&&types[o.type])return {key:types[o.type][0],label:types[o.type][1]};if(e.category==='对外与拓展')return {key:'external',label:'对外'};return null;}
function relation(o,compact=false){if(!o)return '';const type=types[o.type]||types.conquest,submit=o.type==='surrender',left=submit?o.losers:o.winners,right=submit?o.winners:o.losers,verb=type[2],a=(left||[]).join('＋'),b=(right||[]).join('、');if(o.type==='collapse')return '<span class="polity-relation relation-collapse'+(compact?' relation-compact':'')+'" role="img" aria-label="'+esc(b+'政权崩溃')+'"><span class="polity-party defeated"><b>'+esc(b)+'</b></span><span class="relation-symbol">'+icon('collapse')+'<small>政权崩溃</small></span></span>';return '<span class="polity-relation relation-'+esc(o.type)+(compact?' relation-compact':'')+'" role="img" aria-label="'+esc(a+verb+b)+'"><span class="polity-party '+(submit?'defeated':'victor')+'"><b>'+esc(a)+'</b></span><span class="relation-symbol">'+icon(['conquest','coalition','capture'].includes(o.type)?'swords':'arrow')+'<small>'+verb+'</small></span><span class="polity-party '+(submit?'victor':'defeated')+'"><b>'+esc(b)+'</b></span></span>';}
root.EventVisual={icon,outcome,kind,relation};if(typeof module!=='undefined')module.exports=root.EventVisual;
})(globalThis);
