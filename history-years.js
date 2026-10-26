/* Independent calendar, reigns, and period stories. GPL-3.0. */
(function(root){
'use strict';
const axis=y=>y<0?y:y-1;
const periods=[[-2070,-1601,"夏"],[-1600,-1047,"商"],[-1046,-771,"西周"],[-770,-476,"春秋"],[-475,-222,"战国"],[-221,-207,'秦'],[-206,-203,'楚汉之争'],[-202,8,'西汉'],[9,22,'新朝'],[23,24,'更始与群雄'],[25,219,'东汉'],[220,264,'三国'],[265,316,'西晋'],[317,419,'东晋十六国'],[420,580,'南北朝'],[581,617,'隋'],[618,689,'唐'],[690,704,'武周'],[705,906,'唐'],[907,959,'五代十国'],[960,1126,'北宋'],[1127,1278,'南宋'],[1279,1367,'元'],[1368,1643,'明'],[1644,1911,'清']];
function period(year){return periods.find(([a,b])=>year>=a&&year<=b)?.[2]||'历史岁月';}
function dynastyGroup(label){return label==='武周'?'唐':label==='东晋十六国'?'东晋':label;}
function trackReigns(data,label){const group=dynastyGroup(label);return data.reigns.filter(r=>dynastyGroup(r.dynasty)===group&&r.role!=='powerholder'&&r.role!=='regional').sort((a,b)=>a.from-b.from||a.to-b.to);}
function matches(r,feature,year){let title=typeof feature==='string'?feature:feature.properties.title;const exactAliases={'北元（鞑靼 · 瓦剌）':'北元','明夏（明玉珍）':'明夏','明夏（明升）':'明夏','夏（明玉珍）':'明夏','南明（明郑）':'明郑','金（迁都汴京）':'金','汉（刘邦）':'汉'};title=exactAliases[title]||title;if(year<-221)return r.polity===title;if(r.dynasty==='杨吴')return year>=902&&year<=937&&['吴','杨吴'].includes(title);if(r.polity==='吴'&&['吴','孙权势力'].includes(title)&&year>280)return false;if(r.polity==='蜀汉'&&['蜀','蜀汉','刘备势力'].includes(title))return true;if(r.polity==='吴'&&['吴','孙权势力'].includes(title))return true;if(r.polity==='西晋'&&title==='晋')return true;if(r.polity==='东晋'&&['晋','东晋'].includes(title))return true;if(r.polity==='更始汉'&&title.includes('更始'))return true;if(r.polity==='后金'&&title==='后金')return true;if(r.polity==='后金／清'&&['清','后金'].includes(title))return true;if(r.polity==='大蒙古国／元'&&['蒙古','大蒙古国','元'].includes(title))return true;const aliases={秦:['秦'],汉:['汉','汉（郡国并行）','西汉'],西汉:['汉','汉（郡国并行）','西汉'],东汉:['东汉'],新:['新（王莽）','新'],新朝:['新（王莽）','新'],西晋:['晋','西晋'],隋:['隋'],唐:['唐','唐（李渊）','唐 · 岐（关中）'],武周:['唐','周（武周）','武周'],北宋:['宋','北宋'],南宋:['南宋','南宋（闽广行朝）'],元:['元'],明:['明'],清:['清'],辽:['辽','契丹']};if((aliases[r.dynasty]||[r.polity,r.dynasty]).includes(title))return true;return !!r.polity&&r.polity===title;}
function at(data,year,feature){return data.reigns.filter(r=>r.from<=year&&r.to>=year&&(!feature||matches(r,feature,year))).sort((a,b)=>a.from-b.from||a.to-b.to);}
function era(r,year){const hits=(r.eras||[]).filter(e=>year>=e.from&&year<=e.to);return hits.map(e=>({name:e.name,number:(e.baseYear||1)+axis(year)-axis(e.from),...e}));}
function relatedStories(data,year,label){const group=dynastyGroup(label);return data.stories.filter(s=>dynastyGroup(s.dynasty)===group).sort((a,b)=>a.from-b.from);}
function distance(s,y){return y<s.from?s.from-y:y>s.to?y-s.to:0;}
function localWindow(data,year,label){const list=trackReigns(data,label);const p=periods.find(([a,b,n])=>year>=a&&year<=b&&n===label);return {reigns:list,from:Math.max(-221,list.length?Math.min(...list.map(r=>r.from)):p?.[0]||year-20),to:Math.min(1911,list.length?Math.max(...list.map(r=>r.to)):p?.[1]||year+20)};}
function span(from,to){return axis(to)-axis(from)+1;}
function chineseNumber(n){const digits='零一二三四五六七八九';if(n<10)return digits[n];if(n<20)return '十'+(n%10?digits[n%10]:'');if(n<100)return digits[Math.floor(n/10)]+'十'+(n%10?digits[n%10]:'');return String(n);}
function eraLabel(e){return e.name+(e.number===1?'元':chineseNumber(e.number))+'年';}
const api={eraLabel,period,periods,trackReigns,at,era,relatedStories,distance,localWindow,span};if(typeof module==='object'&&module.exports)module.exports=api;else root.HistoryYears=api;
})(typeof globalThis==='object'?globalThis:this);
