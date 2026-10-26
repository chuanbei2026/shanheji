/* Run with `node check-data.cjs` from this static export. Structural tests do not certify historical facts. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const read=f=>JSON.parse(fs.readFileSync(path.join(__dirname,f),'utf8'));
const Europe=require('./europe/europe.js'),Years=require('./history-years.js');
const events=read('history-events.json'),wars=read('wars.json'),reigns=read('reigns.json'),europe=read('europe/data.json'),atlas=read('atlas.json');
let checks=0;function check(value,message){assert.ok(value,message);checks++;}
for(const [label,rows]of [['China events',events.events],['China wars',wars.wars],['Europe events',europe.events],['Europe spans',europe.spans]]){check(new Set(rows.map(x=>x.id)).size===rows.length,label+' IDs must be unique');}
for(const e of europe.events){check(e.startYear<=e.endYear&&e.startYear!==0&&e.endYear!==0,e.id+' calendar range');check(e.sources.length&&e.sources.every(id=>europe.sources[id]?.url),e.id+' sources');for(const p of e.places){check(Number.isFinite(p.lon)&&Number.isFinite(p.lat)&&p.certainty==='approximate'&&!!p.note,e.id+' approximate geography');for(const w of p.windows||[]){check(w.fromYear<=w.toYear&&w.fromYear>=e.startYear&&w.toYear<=e.endYear,e.id+' phase inside parent interval');check((w.sources||[]).every(id=>europe.sources[id]),e.id+' phase sources');}if(p.contextOnly)check(!Europe.placeActive(p,e,e.startYear),e.id+' context-only points must never be active');}}
for(const s of europe.spans){check(s.startYear<=s.endYear&&s.sources.every(id=>europe.sources[id]?.url)&&!!s.note,s.id+' documented span');}
for(const r of reigns.reigns){check(r.from<=r.to&&r.sources?.length&&r.sources.every(id=>reigns.sources[id]?.url),r.name+' reign range and sources');}
for(const w of wars.wars){check(w.startYear<=w.endYear&&w.sourceIds.every(id=>wars.sources[id]?.url),w.id+' war interval/sources');check(w.eventIds.every(id=>events.events.some(e=>e.id===id)),w.id+' linked events');for(const p of w.locations){check(p.coordinates.length===2&&p.coordinates.every(Number.isFinite),w.id+' coordinates');if(p.fromYear!==undefined)check(p.fromYear>=w.startYear&&p.toYear<=w.endYear&&p.fromYear<=p.toYear,w.id+' phase bounds');}}
for(const y of [-499,-1,1,100,1918])check(Europe.fromAxis(Europe.axis(y))===y,'Calendar roundtrip '+y);
check(Europe.nextYear(-1,1)===1&&Europe.nextYear(1,-1)===-1,'No year zero');
check(Europe.parseYear('公元前221年')===-221&&Europe.parseYear('221 BC')===-221&&Europe.parseYear('0')===null,'Year input grammar');
for(const t of europe.placePhaseReview.regressionExpectations){const e=europe.events.find(e=>e.id===t.eventId),p=e.places[t.placeIndex];check(Europe.placeActive(p,e,t.year)===t.expectedActive,t.eventId+' phase '+p.name+' '+t.year);}
const expected=[['李旦',684,690,['载初元年']],['李显',705,707,['神龙三年','景龙元年']],['李亨',756,758,['至德三载','乾元元年']],['李亨',756,760,['乾元三年','上元元年']],['李隆基',712,744,['天宝三载']]];
for(const [name,from,y,labels]of expected){const r=reigns.reigns.find(r=>r.name===name&&r.from===from&&r.role==='ruler');check(!!r,'Reign exists '+name);const actual=Years.era(r,y).map(Years.eraLabel);check(labels.every(x=>actual.includes(x)),name+' era '+y+': '+actual.join('/'));}
check(Years.at(reigns,881,'归义军（张议潮）').some(x=>x.name==='张淮深'),'Annual identity overrides founder label');
check(Years.at(reigns,881,'南诏').some(x=>x.name==='隆舜'),'Nanzhao annual identity');
check(atlas.find(f=>f.id==='s_tang_d1').year===881,'Huang Chao civil-calendar anchor');
check(events.events.find(e=>e.id==='chron_huangchao_capital').year===881,'Huang Chao event/calendar alignment');
console.log(JSON.stringify({status:'passed',checks,chinaEvents:events.events.length,wars:wars.wars.length,europeEvents:europe.events.length,europeSpans:europe.spans.length,note:'Structure, references and selected calendar/visibility regressions only; not an independent certification of all historical claims.'},null,2));
