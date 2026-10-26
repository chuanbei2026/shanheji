/* Contemporary raster wordmarks, contextualized by sourced calligraphic traditions. */
(function(root){
'use strict';
let data={entries:[]};
const esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const families={秦:'qin',汉:'han',西汉:'han',东汉:'han',晋:'jin',西晋:'jin',东晋:'jin',隋:'sui',唐:'tang',北宋:'song',南宋:'song',宋:'song',元:'yuan',明:'ming',清:'qing'};
function get(label,year){if(label==='宋'&&year<600)return null;if(label==='唐'&&year>=690&&year<=704)return null;return data.entries.find(e=>e.id===families[label])||null;}
function picture(e,cls='',ink=''){
  const label=esc(e.glyph+' · '+e.style);
  if(!ink)return '<img class="dynasty-lettering-image '+cls+'" src="'+esc(e.asset)+'" width="56" height="56" loading="lazy" decoding="async" alt="'+label+'" draggable="false">';
  const id='lettering-ink-'+e.id+'-'+cls.replace(/[^a-z0-9]/gi,'')+'-'+ink.replace('#','');
  // Color only the ink at render time; preserve source alpha and tonal dry-brush texture.
  return '<svg class="dynasty-lettering-image dynasty-lettering-tinted '+cls+'" width="56" height="56" viewBox="0 0 100 100" role="img" aria-label="'+label+'" data-lettering-ink="'+esc(ink)+'"><defs><filter id="'+id+'" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 -0.2126 -0.7152 -0.0722 1 0" result="ink-alpha"/><feFlood flood-color="'+esc(ink)+'"/><feComposite in2="ink-alpha" operator="in"/></filter></defs><image href="'+esc(e.asset)+'" width="100" height="100" filter="url(#'+id+')"/></svg>';
}
function init(input,context={}){data=input;const dialog=document.getElementById('letteringDialog');document.getElementById('letteringGallery').innerHTML=data.entries.map(e=>'<article class="lettering-evidence" data-lettering-evidence="'+e.id+'"><div class="lettering-specimen">'+picture(e)+'</div><div><h3>'+esc(e.label)+'<small>'+esc(e.style)+'</small></h3><p>'+esc(e.note)+'</p><a href="'+esc(e.source.url)+'" target="_blank" rel="noopener">'+esc(e.source.title)+' ↗</a></div></article>').join('');document.addEventListener('click',event=>{const button=event.target.closest('[data-dynasty-lettering]');if(!button)return;event.preventDefault();context.stop?.();dialog.showModal();const card=dialog.querySelector('[data-lettering-evidence="'+button.dataset.dynastyLettering+'"]');card?.scrollIntoView({block:'center'});});}
function cardHeader(label,year,total,note){const e=get(label,year);if(!e)return null;return '<div class="sovereign-heading dynasty-art-header"><button class="dynasty-art-seal" data-dynasty-lettering="'+e.id+'" aria-label="'+esc(label+'题签，'+e.style+'，查看书体依据')+'" title="'+esc(e.style+' · 点击看借鉴依据')+'">'+picture(e,'dynasty-card-image',root.AtlasDesign?.get(label,year)?.hex)+'</button><span class="dynasty-art-caption"><b>'+esc(label)+'</b><small title="'+esc(note)+'">帝系 · 共 '+total+' 位</small></span></div>';}
function heading(node,label,year){const e=get(label,year);node.classList.toggle('has-dynasty-lettering',!!e);node.setAttribute('aria-label',label);if(!e){node.textContent=label;return;}node.innerHTML=picture(e,'dynasty-heading-image',root.AtlasDesign?.get(label,year)?.hex)+'<span class="dynasty-heading-label">'+esc(label)+'</span>';node.title=e.style+' · 艺术化题签';}
root.DynastyLettering={init,get,picture,cardHeader,heading};if(typeof module!=='undefined')module.exports=root.DynastyLettering;
})(globalThis);
