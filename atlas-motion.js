/* Territory-only transitions between sourced endpoint maps; reveals do not reconstruct battle routes. */
(function(root){
'use strict';
let pending=null,active=null,serial=0,polityAliases={};
function configure(data){polityAliases=data.aliases||{};}
const lastHtml=new WeakMap(),ns='http://www.w3.org/2000/svg';
const reduced=()=>typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches;
const el=(tag,attrs={})=>{const n=document.createElementNS(ns,tag);for(const [k,v]of Object.entries(attrs))n.setAttribute(k,v);return n;};
function territories(node){return [...node.querySelectorAll('.territory')].filter(n=>!n.closest('.map-transition-layer'));}
function territoryBounds(nodes){const boxes=nodes.map(n=>n.getBBox()),x=Math.min(...boxes.map(b=>b.x)),y=Math.min(...boxes.map(b=>b.y));return {x,y,width:Math.max(...boxes.map(b=>b.x+b.width))-x,height:Math.max(...boxes.map(b=>b.y+b.height))-y};}
function signature(nodes){return nodes.map(n=>[n.getAttribute('d'),n.getAttribute('fill'),n.getAttribute('stroke-dasharray')].join('|')).sort().join('~');}
function cleanClone(n){const c=n.cloneNode(true);for(const a of ['id','tabindex','role','aria-label'])c.removeAttribute(a);c.classList.remove('territory');c.classList.add('motion-territory');c.style.visibility='';return c;}
function finish(){if(!active)return;cancelAnimationFrame(active.raf);active.layer.remove();for(const n of territories(active.node))n.style.visibility='';active.node.querySelectorAll('.outcome-map-layer').forEach(n=>n.style.opacity='');active.node.setAttribute('data-motion-state','stable');active=null;}
function begin(node,key,context={}){
 // Labels and annual metadata can redraw during a transition without restarting it.
 if(document.documentElement.classList.contains('timeline-scrubbing')||reduced())finish();
 pending={nodes:territories(node).map(cleanClone),signature:signature(territories(node)),context,previous:node.__atlasMotionContext};
 node.__atlasMotionContext=context;return pending.nodes.length>0;
}
function kindFor(before,after){
 if(!before||after.index<before.index||Math.abs(after.index-before.index)>1)return 'fade';
 if(after.event?.type==='replacement')return 'succession';
 if(after.frame.features.length>before.frame.features.length&&before.frame.features.some(f=>!after.frame.features.some(n=>n.properties.title===f.properties.title)))return 'split';
 if(['conquest','coalition','surrender'].includes(after.event?.type))return 'conquest';
 return after.frame.id!==before.frame.id?'territorial':'fade';
}
function originFor(state,node){
 const before=state.previous,after=state.context,event=after.event;
 const winner=before?.frame.features.find(f=>(event?.winners||[]).some(name=>(polityAliases[name]||[name]).includes(f.properties.title)));
 const loser=before?.frame.features.find(f=>(event?.losers||[]).some(name=>(polityAliases[name]||[name]).includes(f.properties.title)));
 if(winner&&loser){
  const target=after.project(d3.geoCentroid(loser)),points=[];
  const visit=v=>{if(typeof v[0]==='number')points.push(after.project(v));else v.forEach(visit);};visit(winner.geometry.coordinates);
  return points.filter(p=>p.every(Number.isFinite)).sort((a,b)=>Math.hypot(a[0]-target[0],a[1]-target[1])-Math.hypot(b[0]-target[0],b[1]-target[1]))[0]||target;
 }
 const b=territoryBounds(territories(node));return [b.x+b.width*.5,b.y+b.height*.5];
}
function end(node,changed){const state=pending;pending=null;queueMicrotask(()=>complete(node,changed,state));}
function complete(node,changed,state){
 const next=territories(node).filter(n=>!n.closest('.map-transition-layer')),nextSignature=signature(next);
 if(active&&active.signature===nextSignature){node.insertBefore(active.layer,next[0].parentNode);for(const n of next)n.style.visibility='hidden';return;}
 if(!changed||!state||state.signature===nextSignature){if(active)finish();return;}
 finish();if(reduced()||document.documentElement.classList.contains('timeline-scrubbing'))return;
 const kind=kindFor(state.previous,state.context),duration=kind==='split'?1700:kind==='fade'?900:1500;
 const layer=el('g',{'class':'map-transition-layer','aria-hidden':'true','pointer-events':'none','data-transition-kind':kind});
 const defs=el('defs'),old=el('g'),fresh=el('g');
 state.nodes.forEach(n=>old.append(n));next.forEach(n=>fresh.append(cleanClone(n)));
 layer.append(defs,old,fresh);node.insertBefore(layer,next[0].parentNode);next.forEach(n=>n.style.visibility='hidden');
 const bounds=node.ownerSVGElement.viewBox.baseVal,b=territoryBounds([...old.children,...fresh.children]),pad=2000;
 const extent={x:Math.min(-pad,b.x-pad),y:Math.min(-pad,b.y-pad),width:Math.max(bounds.width,b.width)+pad*4,height:Math.max(bounds.height,b.height)+pad*4};
 let oldMask,newMask,circleOld,circleNew,strips=[],outline;
 if(kind==='succession'||kind==='conquest'||kind==='territorial'){
  const id='atlas-transition-'+(++serial);oldMask=el('mask',{id:id+'-old',maskUnits:'userSpaceOnUse',...extent});newMask=el('mask',{id:id+'-new',maskUnits:'userSpaceOnUse',...extent});
  oldMask.append(el('rect',{...extent,fill:'white'}));newMask.append(el('rect',{...extent,fill:'black'}));defs.append(oldMask,newMask);old.setAttribute('mask','url(#'+id+'-old)');fresh.setAttribute('mask','url(#'+id+'-new)');
  if(kind==='succession'){
   const h=Math.max(20,b.height/12);for(let i=0;i<12;i++){const attrs={x:b.x-4,y:b.y+i*h-2,width:b.width+8,height:0};const a=el('rect',{...attrs,fill:'black'}),c=el('rect',{...attrs,fill:'white'});oldMask.append(a);newMask.append(c);strips.push({a,c,h:h+4,index:i});}
  }else{
   const [cx,cy]=originFor(state,node);const radius=Math.max(...[[b.x,b.y],[b.x+b.width,b.y],[b.x,b.y+b.height],[b.x+b.width,b.y+b.height]].map(p=>Math.hypot(p[0]-cx,p[1]-cy)))+20;
   const gradient=el('radialGradient',{id:id+'-gradient'});gradient.append(el('stop',{offset:'.84','stop-color':'white'}),el('stop',{offset:'1','stop-color':'white','stop-opacity':'0'}));defs.append(gradient);
   // Alpha masks are complementary; the soft leading edge blends old and new fills.
   oldMask.style.maskType='luminance';newMask.style.maskType='luminance';
   const inverse=el('radialGradient',{id:id+'-inverse'});inverse.append(el('stop',{offset:'.84','stop-color':'black'}),el('stop',{offset:'1','stop-color':'black','stop-opacity':'0'}));defs.append(inverse);
   circleOld=el('circle',{cx,cy,r:0,fill:'url(#'+id+'-inverse)'});circleNew=el('circle',{cx,cy,r:0,fill:'url(#'+id+'-gradient)'});circleOld.dataset.radius=radius;oldMask.append(circleOld);newMask.append(circleNew);
  }
 }else if(kind==='split'){
  outline=el('g');next.forEach(n=>{const c=cleanClone(n);c.setAttribute('fill','none');c.setAttribute('stroke-width','1.4');outline.append(c);});layer.append(outline);fresh.style.opacity='0';outline.style.opacity='0';
 }
 const start=performance.now();node.setAttribute('data-motion-kind',kind);node.setAttribute('data-motion-state','transitioning');node.setAttribute('data-motion-count',String(Number(node.getAttribute('data-motion-count')||0)+1));
 active={layer,node,signature:nextSignature,raf:0};const run=active;
 function tick(now){if(active!==run)return;const t=Math.min(1,(now-start)/duration),smooth=v=>{v=Math.max(0,Math.min(1,v));return v*v*(3-2*v);};
  node.querySelectorAll('.outcome-map-layer').forEach(n=>n.style.opacity=String(smooth((t-.65)/.35)));
  if(strips.length){for(const s of strips){const h=s.h*smooth((t-s.index*.018)/.78);s.a.setAttribute('height',h);s.c.setAttribute('height',h);}}
  else if(circleOld){const r=+circleOld.dataset.radius*smooth(t)*1.2;circleOld.setAttribute('r',r);circleNew.setAttribute('r',r);old.style.opacity=String(1-smooth((t-.78)/.22));}
  else if(outline){const color=smooth((t-.3)/.7);outline.style.opacity=String(smooth(t/.35)*(1-color*.45));old.style.opacity=String(1-color);fresh.style.opacity=String(color);}
  else{old.style.opacity=String(1-smooth(t));fresh.style.opacity=String(smooth(t));}
  if(t===1)finish();else run.raf=requestAnimationFrame(tick);
 }tick(start);
}
function busy(){return !!active;}
// Court panels keep their elements, image resources, disclosure state and scroll positions.
function nodeKey(node){return node.nodeType===1?(node.getAttribute('data-court-id')||node.getAttribute('data-court-person')||node.id||''):'';}
function compatible(a,b){return a.nodeType===b.nodeType&&(a.nodeType!==1||(a.localName===b.localName&&a.namespaceURI===b.namespaceURI));}
function reconcile(parent,desired){const old=[...parent.childNodes],keys=new Map(old.map(n=>[nodeKey(n),n]).filter(([k])=>k)),used=new Set();let anchor=parent.firstChild;for(const fresh of [...desired.childNodes]){const key=nodeKey(fresh);let node=key?keys.get(key):old.find(n=>!used.has(n)&&!nodeKey(n)&&compatible(n,fresh));if(!node||used.has(node)||!compatible(node,fresh))node=fresh.cloneNode(true);else if(node.nodeType===3||node.nodeType===8){if(node.nodeValue!==fresh.nodeValue)node.nodeValue=fresh.nodeValue;}else if(node.nodeType===1){for(const attr of [...node.attributes]){if(node.localName==='details'&&attr.name==='open')continue;if(!fresh.hasAttributeNS(attr.namespaceURI,attr.localName))node.removeAttributeNS(attr.namespaceURI,attr.localName);}for(const attr of [...fresh.attributes]){if(node.localName==='details'&&attr.name==='open')continue;if(node.getAttributeNS(attr.namespaceURI,attr.localName)!==attr.value)node.setAttributeNS(attr.namespaceURI,attr.name,attr.value);}reconcile(node,fresh);}used.add(node);if(node!==anchor)parent.insertBefore(node,anchor);anchor=node.nextSibling;}for(const node of old)if(!used.has(node))node.remove();}
function steady(node,html){node.getAnimations().forEach(a=>a.cancel());const template=document.createElement('template');template.innerHTML=html;reconcile(node,template.content);}
function replace(node,html,key,options={}){const previous=node.getAttribute('data-motion-key');if(lastHtml.get(node)===html){node.setAttribute('data-motion-key',key);return false;}if(options.stable)steady(node,html);else node.innerHTML=html;lastHtml.set(node,html);node.setAttribute('data-motion-key',key);if(!options.stable&&previous!==null&&previous!==key&&!reduced()&&!document.documentElement.classList.contains('timeline-scrubbing')){node.getAnimations().forEach(a=>a.cancel());node.animate([{opacity:.2,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:460,easing:'ease-out'});node.setAttribute('data-motion-count',String(Number(node.getAttribute('data-motion-count')||0)+1));return true;}return false;}
root.AtlasMotion={begin,end,replace,busy,configure};
})(globalThis);
