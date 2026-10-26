/* Evidence controls line certainty; source geometry alone is not verification. */
(function(scope){
'use strict';
function certainty(feature){if(feature.geometry?.type==='Point')return 'location';const p=feature.properties||{};return p.boundaryCertainty==='documented'&&Array.isArray(p.boundarySources)&&p.boundarySources.length?'documented':'approximate';}
function dash(feature){return certainty(feature)==='approximate'?'5 3':null;}
function label(feature){return ({documented:'边界已有明确依据',approximate:'近似复原边界，未逐段核实',location:'地点／区域参照，不是疆界'})[certainty(feature)];}
function decorate(root,path,frame){const segments=frame.features.flatMap(f=>(f.properties?.boundarySegments||[]).filter(s=>s.certainty==='documented'&&s.sources?.length&&['LineString','MultiLineString'].includes(s.geometry?.type)));root.append('g').attr('class','verified-boundary-segments').attr('pointer-events','none').selectAll('path').data(segments).join('path').attr('d',s=>path({type:'Feature',geometry:s.geometry,properties:{}})).attr('fill','none').attr('stroke','#50644f').attr('stroke-width',1.3).attr('vector-effect','non-scaling-stroke');}
const api={certainty,dash,label,decorate};scope.BoundaryStyle=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
