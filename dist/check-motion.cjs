/* Selected timing and connected-front regressions; run with node check-motion.cjs. */
'use strict';
const assert=require('node:assert/strict'),motion=require('./atlas-motion.js');let checks=0;
function check(ok,message){assert.ok(ok,message);checks++;}
for(const interval of [250,125,62.5]){const budget=motion.durationFor(interval,true);check(budget>0&&budget<=interval*2,'Animation must fit at most two selected playback frames');}
function field(width,height,oldOwner,newOwner,changed){const output=motion.frontField(Int32Array.from(oldOwner),Int32Array.from(newOwner),Uint8Array.from(changed),width,height);check([...output].every(x=>Number.isFinite(x)&&x>=0&&x<=1),'Every cell needs a finite bounded arrival time');return output;}
const width=12,height=8,total=width*height,old=new Int32Array(total),next=new Int32Array(total).fill(1),changed=new Uint8Array(total).fill(1);for(let y=0;y<height;y++){old[y*width]=1;changed[y*width]=0;}const growth=field(width,height,old,next,changed);for(let y=0;y<height;y++)check(growth[y*width+1]<growth[y*width+width-1],'Growth begins beside an existing color instead of a screen-centered circle');
const replacement=field(width,height,new Int32Array(total).fill(1),new Int32Array(total).fill(2),new Uint8Array(total).fill(1));check(replacement[0]<replacement[width-1],'A newly named dynasty must still have a finite directional front');
const retreat=field(width,height,old,new Int32Array(total),changed);check(retreat[1]<retreat[width-1],'Lost territory retreats from the adjacent target background');
field(3,3,[1,0,0,0,0,0,0,0,2],[3,0,0,0,0,0,0,0,4],[1,0,0,0,0,0,0,0,1]);
field(2,2,[1,1,1,1],[1,1,1,1],[0,0,0,0]);
console.log(JSON.stringify({status:'passed',checks,budgetsMs:{slow:motion.durationFor(250,true),medium:motion.durationFor(125,true),fast:motion.durationFor(62.5,true)},note:'Animation timing does not control the calendar timer. Visual fronts are not historical campaign paths.'},null,2));
