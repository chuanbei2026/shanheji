/* An event chronology independent of the atlas's territorial reference dates. */
(function(root){
'use strict';
const esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function endYear(e){return e.endYear??e.year;}
function boundaryEvents(events){return events.flatMap(e=>e.endYear>e.year?[e,{...e,id:e.id+':end',year:e.endYear,title:e.title+'结束',endYear:undefined,dateLabel:undefined}]:[e]).sort((a,b)=>a.year-b.year||a.id.localeCompare(b.id));}
function nearby(events,year){const boundaries=boundaryEvents(events);return {exact:events.filter(e=>e.year<=year&&endYear(e)>=year),previous:boundaries.filter(e=>e.year<year).at(-1),next:boundaries.find(e=>e.year>year)};}
function dateRange(e){return e.endYear>e.year?ctx.yr(e.year)+' — '+ctx.yr(e.endYear):(e.dateLabel||ctx.yr(e.year));}
function duration(e){if(!(e.endYear>e.year))return '';const y=ctx.getYear(),active=y>=e.year&&y<=e.endYear,status=y===e.year?'开始':y===e.endYear?'本年结束':active?'进行中':'事件跨度',progress=Math.max(0,Math.min(100,(y-e.year)/(e.endYear-e.year)*100));return '<div class="event-duration"><div class="duration-caption"><span class="duration-status">'+status+'</span><span>'+esc(e.durationLabel||'跨年事件')+'</span></div><div class="duration-track" role="meter" aria-label="'+esc(e.title+'年度进程')+'" aria-valuemin="'+e.year+'" aria-valuemax="'+e.endYear+'" aria-valuenow="'+Math.max(e.year,Math.min(e.endYear,y))+'"><i style="width:'+progress+'%"></i>'+(active?'<b style="left:'+progress+'%" title="'+esc(ctx.yr(y))+'"></b>':'')+'</div><div class="duration-dates"><button data-news-year="'+e.year+'"><strong>'+esc(ctx.yr(e.year))+'</strong><small>'+esc(e.startDateLabel||'开始')+'</small></button><button data-news-year="'+e.endYear+'"><strong>'+esc(ctx.yr(e.endYear))+'</strong><small>'+esc(e.endDateLabel||'结束')+'</small></button></div></div>';}
function neighboring(events,year,limit=6){const active=new Set(nearby(events,year).exact.map(e=>e.id)),seen=new Set();return boundaryEvents(events).filter(e=>e.year!==year&&Math.abs(e.year-year)<=80&&!active.has(e.id.replace(/:end$/,''))).sort((a,b)=>Math.abs(a.year-year)-Math.abs(b.year-year)||a.year-b.year).filter(e=>{const id=e.id.replace(/:end$/,'');if(seen.has(id))return false;seen.add(id);return true;}).slice(0,limit);}
function participants(e,compact=false){if(!e.people?.length)return '';return '<div class="event-people'+(compact?' compact':'')+'" aria-label="主要人物"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 4v3"/></svg><span>'+e.people.slice(0,compact?2:4).map(p=>'<b>'+esc(p)+'</b>').join('')+'</span></div>';}
function preview(e,compact=false){return participants(e,compact)+(e.brief?'<p class="event-brief'+(compact?' compact':'')+'">'+esc(e.brief)+'</p>':'');}
function filter(events,{year,scope,category,search},period){return events.filter(e=>(scope==='all'||Array.from({length:endYear(e)-e.year+1},(_,i)=>e.year+i).some(y=>period(y)===period(year)))&&(category==='all'||e.category===category)&&(!search||[e.title,e.summary,e.impact,String(e.year),String(e.endYear||''),e.startDateLabel,e.endDateLabel,...(e.people||[])].join(' ').includes(search)));}
let ctx,page=0,lastKey='',lastYear;
const $=id=>document.getElementById(id);
function references(event){return '<details class="news-sources"><summary>史料与出处</summary>'+event.sources.map(id=>ctx.data.sources[id]).filter(Boolean).map(s=>'<a href="'+esc(s.url)+'" target="_blank" rel="noopener">'+esc(s.title)+' ↗</a>').join('')+'</details>';}
const themes={'对外与拓展':{key:'external',label:'对外',path:'M12 3a9 9 0 1 0 9 9M3 12h11M12 3c-4 5-4 13 0 18M12 21c2-2 3-4 3-6M15 3h6v6M21 3l-8 8'},'疆域与战争':{key:'war',label:'战争',path:'M4 4l16 16M4 20L20 4M3 7l4-4M17 21l4-4M3 17l4 4M17 3l4 4'},'政权与变局':{key:'power',label:'变局',path:'M3 9 12 3l9 6M4 9h16M6 10v9m6-9v9m6-9v9M3 21h18M8 6h8'},'改革与社会':{key:'reform',label:'改革',path:'M4 5h16M4 12h16M4 19h16M8 2v6m8 1v6M9 16v6'},'文化与交流':{key:'culture',label:'文化',path:'M12 6v15M12 6C8 3 3 4 3 4v15s5-1 9 2c4-3 9-2 9-2V4s-5-1-9 2ZM6 8l3 1M6 12l3 1m6-4 3-1m-3 5 3-1'}};
function icon(category){const t=themes[category]||themes['政权与变局'];return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+t.path+'"/></svg>';}
function presentation(e){if(e.capitalMove)return {key:'capital',label:{move:'迁都',return:'还都',seat:'行在',dual:'两京',rename:'更名'}[e.capitalMove.kind]||'迁都'};return EventVisual.kind(e,ctx.outcomes?.events)||themes[e.category]||themes['政权与变局'];}
function eventIcon(e){const t=presentation(e);if(t.key==='capital')return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 20s-5-6-5-10a5 5 0 0 1 10 0c0 4-5 10-5 10ZM8 8v4M6 10h4M15 6h6m-3-3 3 3-3 3M15 18h6m-3-3 3 3-3 3"/></svg>';return t.key==='conquest'||t.key==='war'?EventVisual.icon('swords'):t.key==='external'?EventVisual.icon('external'):['succession','surrender'].includes(t.key)?EventVisual.icon('arrow'):t.key==='collapse'?EventVisual.icon('collapse'):icon(e.category);}
function eventRelation(e,compact=false){return EventVisual.relation(EventVisual.outcome(e,ctx.outcomes?.events),compact);}
function capitalRelation(e){const m=e.capitalMove;if(!m)return '';return '<div class="capital-move-relation" aria-label="'+esc(m.polity+'，'+m.from.label+'至'+m.to.label)+'"><span>'+esc(m.from.label)+'</span><i aria-hidden="true">'+(m.kind==='dual'?'↔':'→')+'</i><b>'+esc(m.to.label)+'</b></div>';}
function card(e,label){const theme=presentation(e),o=EventVisual.outcome(e,ctx.outcomes?.events),intro=e.brief||e.summary;return '<article class="history-event visual-event compact-event theme-'+theme.key+' '+(e.year<=ctx.getYear()&&endYear(e)>=ctx.getYear()?'event-current':'')+'" data-chronicle-event="'+esc(e.id)+'" aria-label="'+esc(e.title)+'"><div class="event-visual-head"><button class="news-year" data-news-year="'+e.year+'">'+esc(dateRange(e))+'</button><h3><span class="event-kind" title="'+esc(theme.label)+'"><span class="event-glyph">'+eventIcon(e)+'</span><small>'+esc(theme.label)+'</small></span>'+esc(e.title)+'</h3></div><p class="event-intro">'+esc(intro)+'</p>'+capitalRelation(e)+(root.WarContext?.cardLinks(e)||'')+(o?'<div class="event-relation">'+eventRelation(e,true)+'</div>':'')+duration(e)+participants(e,true)+(e.outcomeId?'<button class="news-map" data-news-outcome="'+esc(e.outcomeId)+'">◧ 前后版图 ↗</button>':'')+'<button type="button" class="event-story-toggle" aria-label="故事与影响" title="故事与影响"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6v15M12 6C8 3 3 4 3 4v15s5-1 9 2c4-3 9-2 9-2V4s-5-1-9 2Z"/></svg></button><div class="event-story-body" hidden>'+(e.people?.length>2?participants(e):'')+(e.endYear>e.year?'<p class="event-date-note">'+esc((e.startDateLabel||ctx.yr(e.year))+' — '+(e.endDateLabel||ctx.yr(e.endYear)))+'</p>':'')+'<p>'+esc(e.summary)+'</p>'+(e.impact?'<div class="news-impact"><b>此后</b> '+esc(e.impact)+'</div>':'')+(e.dateNote?'<p class="event-date-note">'+esc(e.dateNote)+'</p>':'')+references(e)+'</div></article>';}

function nearbyCard(e){const t=presentation(e),r=eventRelation(e,true);return '<button class="vicinity-card organized-event theme-'+t.key+'" data-news-year="'+e.year+'" aria-label="'+esc(ctx.yr(e.year)+'，'+e.title)+'"><span class="vicinity-meta"><time>'+esc(e.dateLabel||ctx.yr(e.year))+'</time><span class="event-kind-label">'+eventIcon(e)+esc(t.label)+'</span><i>↗</i></span><span class="vicinity-body">'+'<span class="vicinity-event-title">'+esc(e.title)+'</span>'+(r?'<span class="vicinity-relation">'+r+'</span>':'')+preview(e,true)+'</span></button>';}
function buildBand(){const band=$('eventBand');band.innerHTML=Object.entries(themes).map(([category,t])=>'<div class="event-lane theme-'+t.key+'"><span class="event-lane-label">'+icon(category)+esc(t.label)+'</span><div class="event-lane-track">'+ctx.data.events.filter(e=>e.category===category).map(e=>'<button class="event-pin'+(e.endYear>e.year?' event-span':'')+'" data-end-year="'+endYear(e)+'" data-band-event="'+esc(e.id)+'" data-year="'+e.year+'" style="left:'+TimeAxis.fraction(e.year)*100+'%;'+(e.endYear>e.year?'width:'+TimeAxis.spanFraction(e.year,e.endYear)*100+'%;':'')+'" title="'+esc(dateRange(e)+' · '+e.title)+'" aria-label="'+esc(ctx.yr(e.year)+'，'+e.title)+'"></button>').join('')+'</div></div>').join('');band.querySelectorAll('[data-band-event]').forEach(b=>b.onclick=()=>{ctx.stop();showMap();ctx.setYear(+b.dataset.year);});}
function updateBand(){document.querySelectorAll('.event-pin').forEach(b=>{const on=+b.dataset.year<=ctx.getYear()&&+b.dataset.endYear>=ctx.getYear();b.classList.toggle('current',on);b.setAttribute('aria-pressed',String(on));});}
function showMap(){const library=document.getElementById('libraryDialog');if(library?.open)library.close();}
function bind(node){node.querySelectorAll('.event-story-toggle').forEach(button=>button.onclick=()=>{ctx.stop();let dialog=$('eventStoryDialog');if(!dialog){dialog=document.createElement('dialog');dialog.id='eventStoryDialog';dialog.className='event-story-dialog';dialog.setAttribute('aria-labelledby','eventStoryTitle');document.body.append(dialog);}const article=button.closest('[data-chronicle-event]');dialog.innerHTML='<button class="close" aria-label="关闭故事与影响">×</button><h2 id="eventStoryTitle">'+esc(article.getAttribute('aria-label'))+'</h2>'+article.querySelector('.event-story-body').innerHTML;dialog.querySelector('.close').onclick=()=>dialog.close();dialog.showModal();});node.querySelectorAll('[data-news-year]').forEach(b=>b.onclick=()=>{ctx.stop();manualUntil=0;showMap();ctx.setYear(+b.dataset.newsYear);document.querySelector('.stage').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});});node.querySelectorAll('[data-news-outcome]').forEach(b=>b.onclick=()=>{ctx.stop();manualUntil=0;showMap();PolityOutcomes.open(b.dataset.newsOutcome);});node.querySelectorAll('details').forEach(d=>d.ontoggle=()=>{if(d.open)ctx.stop();});}
function renderCatalogue(){const y=ctx.getYear(),scope=$('historyScope').value,category=$('historyCategory').value,search=$('historySearch').value.trim(),key=[scope,category,search,scope==='period'?HistoryYears.period(y):'all'].join('|');if(lastKey!==key){page=0;lastKey=key;}const found=filter(ctx.data.events,{year:y,scope,category,search},HistoryYears.period),pages=Math.max(1,Math.ceil(found.length/12));page=Math.min(page,pages-1);$('historyCount').textContent=found.length+' 条选读 · 全编 '+ctx.data.events.length+' 条';$('historyEvents').innerHTML=found.slice(page*12,page*12+12).map(e=>card(e)).join('')||'<p class="no-result">这个范围暂未整理到匹配事件。可以更换主题，或选择“秦至清末”。</p>';$('historyPage').textContent=(page+1)+' / '+pages;$('historyPrevPage').disabled=page===0;$('historyNextPage').disabled=page>=pages-1;bind($('historyEvents'));}
// Keep the complete chronological list mounted; playback only changes state and scroll.
let timeline=null,manualUntil=0,positions=[];
function timelinePosition(year,anchors){
 if(!anchors.length)return 0;
 if(year<=anchors[0].year)return anchors[0].position;
 if(year>=anchors.at(-1).year)return anchors.at(-1).position;
 const right=anchors.findIndex(p=>p.year>=year),a=anchors[right-1],b=anchors[right];
 const axis=y=>y<0?y:y-1;
 return a.position+(b.position-a.position)*(axis(year)-axis(a.year))/(axis(b.year)-axis(a.year));
}
// The calendar is the only playback clock. A second easing loop trails the year,
// especially when its 85 ms lag exceeds a 62.5 ms fast-playback frame.
function followYear(immediate=false){
 if(!timeline||(!immediate&&performance.now()<manualUntil))return;
 timeline.pane.scrollTop=Math.max(0,timelinePosition(ctx.getYear(),positions)-timeline.pane.clientHeight/2);
}
function measureTimeline(){
 if(!timeline)return;
 const {node,pane,items}=timeline,padding=pane.clientHeight/2;
 node.style.paddingTop=padding+'px';node.style.paddingBottom=padding+'px';
 const grouped=new Map();
 for(const {event,element} of items){const y=event.year,top=element.offsetTop,bottom=top+element.offsetHeight,group=grouped.get(y);if(group)group.bottom=bottom;else grouped.set(y,{year:y,top,bottom});}
 positions=[...grouped.values()].map(p=>{const first=items.find(item=>item.event.year===p.year).element,head=first.querySelector('.event-visual-head');return {year:p.year,position:p.top+(head?head.offsetTop+head.offsetHeight/2:first.offsetHeight/2)};});
 followYear(true);
}
function ensureTimeline(){
 if(timeline)return;
 const node=$('annualNews'),pane=node.closest('.annual-news');node.classList.add('continuous-news');
 node.innerHTML=ctx.data.events.map(e=>card(e)).join('');bind(node);
 const elements=[...node.querySelectorAll('[data-chronicle-event]')];
 timeline={node,pane,items:ctx.data.events.map((event,i)=>({event,element:elements[i]}))};
 const release=()=>{manualUntil=performance.now()+3000;};
 pane.addEventListener('wheel',release,{passive:true});pane.addEventListener('touchstart',release,{passive:true});pane.addEventListener('pointerdown',release,{passive:true});
 pane.addEventListener('keydown',e=>{if(['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(e.key))release();});
 $('newsYearFocus').onclick=()=>{manualUntil=0;followYear();};
 node.addEventListener('toggle',()=>{const remembered=pane.scrollTop;measureTimeline();pane.scrollTop=remembered;},true);
 const resize=new ResizeObserver(measureTimeline);resize.observe(pane);resize.observe(node);
 measureTimeline();
}
function updateTimeline(year){
 ensureTimeline();$('newsFocusYear').textContent=ctx.yr(year);
 for(const {event:e,element} of timeline.items){
  const current=e.year<=year&&endYear(e)>=year;
  element.classList.toggle('event-current',current);element.classList.toggle('event-past',endYear(e)<year);element.classList.toggle('event-future',e.year>year);
  if(current)element.setAttribute('aria-current','date');else element.removeAttribute('aria-current');
  if(e.endYear>e.year){const slot=element.querySelector('.event-duration');if(slot)root.AtlasMotion.replace(slot,duration(e).replace(/^<div class="event-duration">|<\/div>$/g,''),'duration',{stable:true});}
 }
 if(lastYear!==year){const first=lastYear===undefined;lastYear=year;page=0;followYear(first);}
}
function render(){if(!ctx)return;const y=ctx.getYear(),n=nearby(ctx.data.events,y);updateTimeline(y);$('previousNews').disabled=!n.previous;$('nextNews').disabled=!n.next;$('previousNews').onclick=()=>{if(n.previous){ctx.stop();manualUntil=0;ctx.setYear(n.previous.year);}};$('nextNews').onclick=()=>{if(n.next){ctx.stop();manualUntil=0;ctx.setYear(n.next.year);}};updateBand();renderCatalogue();}

function mount(context){ctx=context;ctx.data.events.sort((a,b)=>a.year-b.year||a.id.localeCompare(b.id));buildBand();for(const id of ['historyScope','historyCategory'])$(id).onchange=renderCatalogue;$('historySearch').oninput=renderCatalogue;$('historyPrevPage').onclick=()=>{page--;renderCatalogue();$('historyChronicle').scrollIntoView({block:'start'});};$('historyNextPage').onclick=()=>{page++;renderCatalogue();$('historyChronicle').scrollIntoView({block:'start'});};}
function advance(year,direction,step=1){const values=[...new Set(boundaryEvents(ctx.data.events).map(e=>e.year))];const candidates=values.filter(y=>direction>0?y>year:y<year);if(direction<0)candidates.reverse();return candidates[Math.min(step-1,candidates.length-1)]??year;}
const api={timelinePosition,nearby,neighboring,filter,mount,render,advance};root.HistoryChronicle=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
