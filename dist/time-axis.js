/* Calendar-scaled dynasty overview. Negative years are BCE; historical chronology has no year zero. */
(function(scope){
  'use strict';
  const minYear=-2070,maxYear=1911;
  const toAxis=year=>year<0?year:year-1;
  const fromAxis=value=>value<0?value:value+1;
  const minAxis=toAxis(minYear),maxAxis=toAxis(maxYear),endAxis=maxAxis+1;
  // Keep calendar arithmetic separate from the compressed display scale.
  const overviewEnd=-770,overviewShare=.05,pivotAxis=toAxis(overviewEnd);
  function axisFraction(value){return value<pivotAxis?(value-minAxis)/(pivotAxis-minAxis)*overviewShare:overviewShare+(value-pivotAxis)/(endAxis-pivotAxis)*(1-overviewShare);}
  const fraction=year=>axisFraction(toAxis(year));
  const pointFraction=year=>axisFraction(toAxis(year)+.5);
  const spanFraction=(from,to)=>axisFraction(toAxis(to)+1)-fraction(from);
  function yearAtFraction(value){const f=Math.max(0,Math.min(1,Number(value)||0)),a=f<overviewShare?minAxis+f/overviewShare*(pivotAxis-minAxis):pivotAxis+(f-overviewShare)/(1-overviewShare)*(endAxis-pivotAxis);return fromAxis(Math.max(minAxis,Math.min(maxAxis,Math.floor(a+1e-8))));}
  const rulerTicks=[minYear,overviewEnd,-600,-400,-200,1,200,400,600,800,1000,1200,1400,1600,1800,1911];
  function clampYear(year){year=Math.round(Number(year));if(!Number.isFinite(year))return minYear;if(year===0)year=1;return Math.max(minYear,Math.min(maxYear,year));}
  function frameIndex(frames,year){let lo=0,hi=frames.length;while(lo<hi){const mid=(lo+hi)>>1;if(frames[mid].year<=year)lo=mid+1;else hi=mid;}return Math.max(0,lo-1);}
  const dynasties=[
    {name:"夏",from:-2070,to:-1601,color:"#97836a",note:"约前2070—约前1600为通行年代框架；夏王朝与具体考古遗存的对应尚有争论，非精确逐年断代。",segments:[[-2070,-1601,"夏（约年框架）","dynasty"]],events:[]},
    {name:"商",from:-1600,to:-1047,color:"#96746e",note:"约前1600—前1046；早商都邑与晚商殷墟分开标示，早期具体王年不伪造。",segments:[[-1600,-1047,"商","dynasty"]],events:[]},
    {name:"周",from:-1046,to:-256,color:"#7c8d74",note:"约前1046西周起；前770东周。春秋、战国属周代后期，周王畿不代表统治全部诸侯疆域。",segments:[[-1046,-771,"西周","dynasty"],[-770,-256,"东周·春秋战国","dynasty"]],events:[{year:-770,label:"平王东迁"}]},
    {name:'秦',from:-221,to:-207,color:'#777c6b',note:'以前221年统一六国为起点，前207年秦亡。',segments:[[-221,-207,'秦','dynasty']],events:[]},
    {name:'汉',from:-202,to:220,color:'#b98565',note:'西汉前202—8年、东汉25—220年；9—24年的中断另用条纹表示。汉王时期不作为本条起点。',segments:[[-202,8,'西汉','dynasty'],[9,24,'中断 · 新朝与更始之际','interruption'],[25,220,'东汉','dynasty']],events:[{year:25,label:'刘秀称帝，东汉建立'}]},
    {name:'三国',kind:'period',from:220,to:280,color:'#8c94a0',note:'历史分期，不是单一王朝。220年曹魏建立，221年蜀汉、229年孙吴称帝；265年晋代魏，280年晋灭吴。',segments:[[220,280,'三国','period']],events:[{year:280,label:'晋灭吴，三国结束'}]},
    {name:'晋',from:265,to:420,color:'#9e9f70',note:'西晋265—316年，东晋317—420年；280年灭吴。晋的存续区间不表示全程统一。',segments:[[265,316,'西晋','dynasty'],[317,420,'东晋','dynasty']],events:[{year:280,label:'晋灭吴'}]},
    {name:'南北朝',kind:'period',from:420,to:589,color:'#8c94a0',note:'采用420—589年的通行分期；南北多个王朝并立，不是一朝。北魏始于386年，本条不把北朝政权的起年等同整个分期起年；581年隋建立后，南陈仍延续至589年。',segments:[[420,589,'南北朝','period']],events:[{year:589,label:'隋灭陈，南北朝结束'}]},
    {name:'隋',from:581,to:618,color:'#a99359',note:'581年代北周，589年灭陈。',segments:[[581,618,'隋','dynasty']],events:[{year:589,label:'隋灭陈'}]},
    {name:'唐',from:618,to:907,color:'#bfab72',note:'618年建唐；690—705年武周另用条纹标识。后期藩镇割据并不表示全程稳定统一。',segments:[[618,689,'唐','dynasty'],[690,704,'武周','interruption'],[705,907,'唐','dynasty']],events:[{year:628,label:'平梁师都'}]},
    {name:'五代十国',kind:'period',from:907,to:979,color:'#8c94a0',note:'历史分期，不是单一政权；五代为907—960年，十国部分政权在宋建立后继续存在，979年宋灭北汉。本条采用907—979年范围。',segments:[[907,979,'五代十国','period']],events:[{year:960,label:'宋建立，五代结束'},{year:979,label:'宋灭北汉'}]},
    {name:'宋',from:960,to:1279,color:'#8e9f6c',note:'北宋960—1127年，南宋1127—1279年；1127年发生朝廷更替，并存的辽、金、西夏等未并入宋的存续条带。',segments:[[960,1127,'北宋','dynasty'],[1127,1279,'南宋','dynasty']],events:[{year:1127,label:'靖康之变与南宋建立'}]},
    {name:'元',from:1271,to:1368,color:'#829fa0',note:'1271年定国号大元，1279年灭南宋。这里不把整个蒙古帝国都算作元朝。',segments:[[1271,1368,'元','dynasty']],events:[{year:1279,label:'元灭南宋'}]},
    {name:'明',from:1368,to:1644,color:'#b97967',note:'1368年建明，1644年北京明廷覆亡；南明另见地图势力，未并入本条。',segments:[[1368,1644,'明','dynasty']],events:[{year:1382,label:'明军平定云南'}]},
    {name:'清',from:1636,to:1912,color:'#779482',note:'1636年改国号为清，1644年入关。清帝1912年退位，本图展示截止1911年。',segments:[[1636,1911,'清','dynasty']],events:[{year:1644,label:'清军入关'},{year:1683,label:'郑氏降清'},{year:1759,label:'平大小和卓'}]}
  ];
  function focusIndex(year){let hit=-1;dynasties.forEach((d,i)=>{if(year>=d.from&&year<=d.to&&(hit<0||d.from>=dynasties[hit].from))hit=i;});if(hit>=0)return hit;let distance=Infinity;dynasties.forEach((d,i)=>{const gap=Math.min(Math.abs(toAxis(year)-toAxis(d.from)),Math.abs(toAxis(year)-toAxis(d.to)));if(gap<distance){distance=gap;hit=i;}});return hit;}
  const api={overviewEnd,overviewShare,axisFraction,pointFraction,spanFraction,yearAtFraction,rulerTicks,focusIndex,minYear,maxYear,minAxis,maxAxis,endAxis,toAxis,fromAxis,fraction,clampYear,frameIndex,dynasties};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else scope.TimeAxis=api;
})(typeof window!=='undefined'?window:globalThis);
