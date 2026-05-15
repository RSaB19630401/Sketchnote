import React, { useState, useCallback, useRef, useEffect } from "react";

const FC = `@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Patrick+Hand&display=swap');`;
function mkR(seed) { let s = Math.abs(seed||42)%2147483646+1; return ()=>{ s=(s*16807)%2147483647; return(s-1)/2147483646; }; }
function rr(x,y,w,h,rad,rng,a=2){ const r=()=>(rng()-0.5)*a,c=Math.min(rad,w/2,h/2); return `M${x+c+r()},${y+r()} L${x+w-c+r()},${y+r()} Q${x+w+r()},${y+r()} ${x+w+r()},${y+c+r()} L${x+w+r()},${y+h-c+r()} Q${x+w+r()},${y+h+r()} ${x+w-c+r()},${y+h+r()} L${x+c+r()},${y+h+r()} Q${x+r()},${y+h+r()} ${x+r()},${y+h-c+r()} L${x+r()},${y+c+r()} Q${x+r()},${y+r()} ${x+c+r()},${y+r()} Z`; }
function ln(x1,y1,x2,y2,rng){ return `M${x1},${y1} Q${(x1+x2)/2+(rng()-0.5)*5},${(y1+y2)/2+(rng()-0.5)*5} ${x2},${y2}`; }
function arr(x1,y1,x2,y2,rng,h=10){ const a=Math.atan2(y2-y1,x2-x1); return [ln(x1,y1,x2,y2,rng),`M${x2},${y2}L${x2+Math.cos(a+2.5)*h},${y2+Math.sin(a+2.5)*h}`,`M${x2},${y2}L${x2+Math.cos(a-2.5)*h},${y2+Math.sin(a-2.5)*h}`]; }
function blob(cx,cy,rx,ry,rng){ const p=[]; for(let i=0;i<=16;i++){const a=(i/16)*Math.PI*2,d=1+(rng()-0.5)*0.25;p.push(`${cx+Math.cos(a)*rx*d},${cy+Math.sin(a)*ry*d}`);}return `M${p[0]} `+p.slice(1).map(v=>`L${v}`).join(' ')+' Z'; }
function wt(t,m=22){ if(!t)return[];const w=t.split(' '),l=[];let c='';w.forEach(x=>{if((c+' '+x).trim().length>m&&c){l.push(c.trim());c=x;}else c=c?c+' '+x:x;});if(c.trim())l.push(c.trim());return l; }

function Sc(name,x,y,s,c) {
  const t = `translate(${x},${y}) scale(${s})`;
  const m = {
    mountainClimb: () => (<g transform={t}><path d="M0,80 L35,15 L70,80Z" fill="none" stroke={c} strokeWidth="2.5"/><path d="M5,75 Q20,60 25,45 Q30,55 35,40" fill="none" stroke={c} strokeWidth="1.8" strokeDasharray="4,3"/><circle cx="35" cy="8" r="5" fill={c} opacity="0.3"/><circle cx="30" cy="42" r="4" fill="none" stroke={c} strokeWidth="2"/><line x1="30" y1="46" x2="30" y2="56" stroke={c} strokeWidth="2"/><line x1="25" y1="50" x2="35" y2="48" stroke={c} strokeWidth="2"/><line x1="30" y1="56" x2="26" y2="64" stroke={c} strokeWidth="2"/><line x1="30" y1="56" x2="34" y2="64" stroke={c} strokeWidth="2"/></g>),
    targetHit: () => (<g transform={t}><circle cx="35" cy="40" r="30" fill="none" stroke={c} strokeWidth="2.5"/><circle cx="35" cy="40" r="20" fill="none" stroke={c} strokeWidth="2"/><circle cx="35" cy="40" r="10" fill="none" stroke={c} strokeWidth="2"/><circle cx="35" cy="40" r="3" fill={c}/><line x1="55" y1="20" x2="37" y2="38" stroke={c} strokeWidth="2.5"/><path d="M58,14 L55,20 L60,22" fill="none" stroke={c} strokeWidth="2"/></g>),
    bridge: () => (<g transform={t}><path d="M0,50 Q35,20 70,50" fill="none" stroke={c} strokeWidth="2.5"/><line x1="15" y1="42" x2="15" y2="65" stroke={c} strokeWidth="2"/><line x1="35" y1="32" x2="35" y2="65" stroke={c} strokeWidth="2"/><line x1="55" y1="42" x2="55" y2="65" stroke={c} strokeWidth="2"/><circle cx="10" cy="44" r="4" fill="none" stroke={c} strokeWidth="2"/><line x1="10" y1="48" x2="10" y2="56" stroke={c} strokeWidth="2"/><circle cx="62" cy="44" r="4" fill="none" stroke={c} strokeWidth="2"/><line x1="62" y1="48" x2="62" y2="56" stroke={c} strokeWidth="2"/></g>),
    seedToTree: () => (<g transform={t}><ellipse cx="10" cy="72" rx="6" ry="4" fill={c} opacity="0.3"/><line x1="35" y1="72" x2="35" y2="55" stroke={c} strokeWidth="2"/><ellipse cx="35" cy="55" rx="8" ry="10" fill="none" stroke={c} strokeWidth="2"/><line x1="58" y1="72" x2="58" y2="35" stroke={c} strokeWidth="2.5"/><path d="M44,28 Q58,8 72,28 Q65,20 58,22 Q51,20 44,28Z" fill="none" stroke={c} strokeWidth="2.5"/></g>),
    lighthouse: () => (<g transform={t}><path d="M28,80 L32,30 L38,30 L42,80Z" fill="none" stroke={c} strokeWidth="2.2"/><rect x="30" y="22" width="10" height="8" rx="1" fill="none" stroke={c} strokeWidth="2"/><path d="M32,22 L35,16 L38,22" fill="none" stroke={c} strokeWidth="2"/><path d="M18,25 L28,27 M52,25 L42,27" fill="none" stroke={c} strokeWidth="1.8" opacity="0.6"/></g>),
    teamCircle: () => (<g transform={t}>{[0,72,144,216,288].map((a,i)=>{const rd=a*Math.PI/180,cx2=35+22*Math.cos(rd),cy2=42+22*Math.sin(rd);return(<g key={i}><circle cx={cx2} cy={cy2-6} r="4" fill="none" stroke={c} strokeWidth="2"/><line x1={cx2} y1={cy2-2} x2={cx2} y2={cy2+6} stroke={c} strokeWidth="2"/></g>);})}<circle cx="35" cy="42" r="12" fill="none" stroke={c} strokeWidth="1.5" strokeDasharray="4,3"/></g>),
    ladder: () => (<g transform={t}><line x1="22" y1="10" x2="22" y2="78" stroke={c} strokeWidth="2.5"/><line x1="42" y1="10" x2="42" y2="78" stroke={c} strokeWidth="2.5"/>{[18,30,42,54,66].map((py,i)=>(<line key={i} x1="22" y1={py} x2="42" y2={py} stroke={c} strokeWidth="2"/>))}<circle cx="48" cy="38" r="4" fill="none" stroke={c} strokeWidth="2"/><line x1="48" y1="42" x2="48" y2="52" stroke={c} strokeWidth="2"/><line x1="42" y1="46" x2="54" y2="46" stroke={c} strokeWidth="2"/></g>),
    compass: () => (<g transform={t}><circle cx="35" cy="42" r="28" fill="none" stroke={c} strokeWidth="2.5"/><circle cx="35" cy="42" r="3" fill={c}/><path d="M35,42 L35,18" stroke={c} strokeWidth="2.5" fill="none"/><path d="M30,20 L35,14 L40,20" fill={c} opacity="0.7"/><text x="33" y="12" fontFamily="Caveat" fontSize="10" fontWeight="700" fill={c}>N</text></g>),
    figureThinking: () => (<g transform={t}><circle cx="30" cy="20" r="6" fill="none" stroke={c} strokeWidth="2.5"/><line x1="30" y1="26" x2="30" y2="46" stroke={c} strokeWidth="2.5"/><line x1="30" y1="46" x2="24" y2="60" stroke={c} strokeWidth="2.5"/><line x1="30" y1="46" x2="36" y2="60" stroke={c} strokeWidth="2.5"/><path d="M22,34 L18,28 M38,34 L36,26" stroke={c} strokeWidth="2.5" fill="none"/><ellipse cx="46" cy="10" rx="12" ry="8" fill="none" stroke={c} strokeWidth="1.5" strokeDasharray="4,3"/><text x="42" y="14" fontFamily="Caveat" fontSize="11" fill={c}>?</text></g>),
    figureCelebrate: () => (<g transform={t}><circle cx="35" cy="22" r="6" fill="none" stroke={c} strokeWidth="2.5"/><line x1="35" y1="28" x2="35" y2="48" stroke={c} strokeWidth="2.5"/><line x1="35" y1="48" x2="29" y2="62" stroke={c} strokeWidth="2.5"/><line x1="35" y1="48" x2="41" y2="62" stroke={c} strokeWidth="2.5"/><path d="M27,34 L20,18 M43,34 L50,18" stroke={c} strokeWidth="2.5" fill="none"/></g>),
    doorOpen: () => (<g transform={t}><rect x="20" y="15" width="30" height="60" rx="2" fill="none" stroke={c} strokeWidth="2.5"/><path d="M20,15 L10,25 L10,80 L20,75" fill="none" stroke={c} strokeWidth="2" strokeDasharray="3,3"/><circle cx="44" cy="48" r="2" fill={c}/><circle cx="58" cy="48" r="4" fill="none" stroke={c} strokeWidth="2"/><line x1="58" y1="52" x2="58" y2="62" stroke={c} strokeWidth="2"/><line x1="52" y1="56" x2="64" y2="56" stroke={c} strokeWidth="2"/></g>),
    puzzleFit: () => (<g transform={t}><path d="M10,20 L30,20 L30,15 Q35,10 40,15 L40,20 L60,20 L60,40 L55,40 Q50,45 55,50 L60,50 L60,70 L40,70 L40,65 Q35,60 30,65 L30,70 L10,70 L10,50 L15,50 Q20,45 15,40 L10,40Z" fill="none" stroke={c} strokeWidth="2.5"/></g>),
    figureHandshake: () => (<g transform={t}><circle cx="18" cy="18" r="5" fill="none" stroke={c} strokeWidth="2.5"/><line x1="18" y1="23" x2="18" y2="40" stroke={c} strokeWidth="2.5"/><line x1="18" y1="40" x2="13" y2="52" stroke={c} strokeWidth="2.5"/><line x1="18" y1="40" x2="23" y2="52" stroke={c} strokeWidth="2.5"/><circle cx="52" cy="18" r="5" fill="none" stroke={c} strokeWidth="2.5"/><line x1="52" y1="23" x2="52" y2="40" stroke={c} strokeWidth="2.5"/><line x1="52" y1="40" x2="47" y2="52" stroke={c} strokeWidth="2.5"/><line x1="52" y1="40" x2="57" y2="52" stroke={c} strokeWidth="2.5"/><path d="M26,32 L44,32" stroke={c} strokeWidth="3" strokeLinecap="round"/><path d="M30,28 L35,32 L30,36" fill="none" stroke={c} strokeWidth="2"/><path d="M40,28 L35,32 L40,36" fill="none" stroke={c} strokeWidth="2"/></g>),
    figureConversation: () => (<g transform={t}><circle cx="20" cy="35" r="5" fill="none" stroke={c} strokeWidth="2.5"/><line x1="20" y1="40" x2="20" y2="56" stroke={c} strokeWidth="2.5"/><line x1="13" y1="47" x2="27" y2="47" stroke={c} strokeWidth="2.5"/><line x1="20" y1="56" x2="15" y2="66" stroke={c} strokeWidth="2.5"/><line x1="20" y1="56" x2="25" y2="66" stroke={c} strokeWidth="2.5"/><circle cx="50" cy="35" r="5" fill="none" stroke={c} strokeWidth="2.5"/><line x1="50" y1="40" x2="50" y2="56" stroke={c} strokeWidth="2.5"/><line x1="43" y1="47" x2="57" y2="47" stroke={c} strokeWidth="2.5"/><line x1="50" y1="56" x2="45" y2="66" stroke={c} strokeWidth="2.5"/><line x1="50" y1="56" x2="55" y2="66" stroke={c} strokeWidth="2.5"/><ellipse cx="28" cy="22" rx="10" ry="7" fill="none" stroke={c} strokeWidth="1.8"/><path d="M22,28 L20,33" fill="none" stroke={c} strokeWidth="1.5"/><ellipse cx="44" cy="18" rx="10" ry="7" fill="none" stroke={c} strokeWidth="1.8"/><path d="M49,24 L50,33" fill="none" stroke={c} strokeWidth="1.5"/></g>),
    figureListening: () => (<g transform={t}><circle cx="35" cy="28" r="5" fill="none" stroke={c} strokeWidth="2.5"/><line x1="35" y1="33" x2="35" y2="50" stroke={c} strokeWidth="2.5"/><path d="M27,40 L22,36" stroke={c} strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M43,40 L48,36" stroke={c} strokeWidth="2.5" fill="none" strokeLinecap="round"/><line x1="35" y1="50" x2="30" y2="62" stroke={c} strokeWidth="2.5"/><line x1="35" y1="50" x2="40" y2="62" stroke={c} strokeWidth="2.5"/><path d="M50,20 Q62,20 62,32 Q62,44 50,44" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round"/><path d="M54,26 Q58,26 58,32 Q58,38 54,38" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"/></g>),
    figureHug: () => (<g transform={t}><circle cx="28" cy="20" r="5" fill="none" stroke={c} strokeWidth="2.5"/><circle cx="42" cy="20" r="5" fill="none" stroke={c} strokeWidth="2.5"/><line x1="28" y1="25" x2="28" y2="42" stroke={c} strokeWidth="2.5"/><line x1="42" y1="25" x2="42" y2="42" stroke={c} strokeWidth="2.5"/><path d="M28,32 Q35,28 42,32" fill="none" stroke={c} strokeWidth="2.5"/><path d="M28,36 Q35,40 42,36" fill="none" stroke={c} strokeWidth="2.5"/><line x1="28" y1="42" x2="24" y2="54" stroke={c} strokeWidth="2.5"/><line x1="28" y1="42" x2="32" y2="54" stroke={c} strokeWidth="2.5"/><line x1="42" y1="42" x2="38" y2="54" stroke={c} strokeWidth="2.5"/><line x1="42" y1="42" x2="46" y2="54" stroke={c} strokeWidth="2.5"/><path d="M32,12 L35,8 L38,12" fill="none" stroke={c} strokeWidth="1.5" opacity="0.6"/></g>),
    figureFear: () => (<g transform={t}><circle cx="35" cy="35" r="5" fill="none" stroke={c} strokeWidth="2.5"/><line x1="35" y1="40" x2="35" y2="56" stroke={c} strokeWidth="2.5"/><path d="M27,46 L30,50" stroke={c} strokeWidth="2.5" fill="none"/><path d="M43,46 L40,50" stroke={c} strokeWidth="2.5" fill="none"/><line x1="35" y1="56" x2="31" y2="66" stroke={c} strokeWidth="2.5"/><line x1="35" y1="56" x2="39" y2="66" stroke={c} strokeWidth="2.5"/><path d="M20,10 Q35,0 50,10 Q50,22 35,26 Q20,22 20,10Z" fill="none" stroke={c} strokeWidth="2" strokeDasharray="4,3"/><text x="31" y="18" fontFamily="Caveat" fontSize="14" fill={c}>!</text></g>),
    figureDoubt: () => (<g transform={t}><circle cx="35" cy="32" r="5" fill="none" stroke={c} strokeWidth="2.5"/><line x1="35" y1="37" x2="35" y2="54" stroke={c} strokeWidth="2.5"/><path d="M27,44 L22,38" stroke={c} strokeWidth="2.5" fill="none"/><path d="M43,44 L48,38" stroke={c} strokeWidth="2.5" fill="none"/><line x1="35" y1="54" x2="30" y2="66" stroke={c} strokeWidth="2.5"/><line x1="35" y1="54" x2="40" y2="66" stroke={c} strokeWidth="2.5"/><path d="M14,30 L22,36" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round"/><path d="M56,30 L48,36" stroke={c} strokeWidth="2" fill="none" strokeLinecap="round"/><text x="8" y="28" fontFamily="Caveat" fontSize="12" fill={c}>A</text><text x="54" y="28" fontFamily="Caveat" fontSize="12" fill={c}>B</text><text x="31" y="20" fontFamily="Caveat" fontSize="14" fill={c}>?</text></g>),
    figureBalance: () => (<g transform={t}><circle cx="35" cy="18" r="5" fill="none" stroke={c} strokeWidth="2.5"/><line x1="35" y1="23" x2="35" y2="42" stroke={c} strokeWidth="2.5"/><line x1="35" y1="42" x2="30" y2="54" stroke={c} strokeWidth="2.5"/><line x1="35" y1="42" x2="40" y2="54" stroke={c} strokeWidth="2.5"/><line x1="25" y1="30" x2="45" y2="34" stroke={c} strokeWidth="2.5"/><path d="M15,56 Q20,52 25,56 Q25,62 20,64 Q15,62 15,56Z" fill="none" stroke={c} strokeWidth="2"/><path d="M45,52 Q50,48 55,52 Q55,58 50,60 Q45,58 45,52Z" fill="none" stroke={c} strokeWidth="2"/><path d="M10,70 L60,70" stroke={c} strokeWidth="2" strokeDasharray="3,3" opacity="0.4"/></g>),
    figureCourage: () => (<g transform={t}><circle cx="30" cy="28" r="5" fill="none" stroke={c} strokeWidth="2.5"/><line x1="30" y1="33" x2="30" y2="50" stroke={c} strokeWidth="2.5"/><path d="M22,40 L18,34" stroke={c} strokeWidth="2.5" fill="none" strokeLinecap="round"/><path d="M38,40 L42,34" stroke={c} strokeWidth="2.5" fill="none" strokeLinecap="round"/><line x1="30" y1="50" x2="25" y2="62" stroke={c} strokeWidth="2.5"/><line x1="30" y1="50" x2="36" y2="60" stroke={c} strokeWidth="2.5"/><path d="M46,20 L58,20 L58,50 L46,50Z" fill="none" stroke={c} strokeWidth="2.5"/><path d="M52,20 L52,12" stroke={c} strokeWidth="2"/><path d="M48,14 L52,8 L56,14" fill={c} opacity="0.5"/></g>),
    windingRoad: () => (<g transform={t}><path d="M10,75 Q25,65 20,50 Q15,35 30,30 Q45,25 40,15 Q38,8 50,5" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round"/><circle cx="10" cy="75" r="4" fill={c} opacity="0.4"/><circle cx="30" cy="30" r="3" fill={c} opacity="0.3"/><line x1="50" y1="5" x2="50" y2="0" stroke={c} strokeWidth="2"/><path d="M46,3 L50,-3 L54,3" fill={c} opacity="0.5"/></g>),
    mirrorReflect: () => (<g transform={t}><ellipse cx="35" cy="35" rx="22" ry="30" fill="none" stroke={c} strokeWidth="2.5"/><line x1="35" y1="65" x2="35" y2="75" stroke={c} strokeWidth="3"/><line x1="25" y1="75" x2="45" y2="75" stroke={c} strokeWidth="2.5"/><circle cx="35" cy="28" r="4" fill="none" stroke={c} strokeWidth="1.8"/><line x1="35" y1="32" x2="35" y2="44" stroke={c} strokeWidth="1.8"/><line x1="30" y1="37" x2="40" y2="37" stroke={c} strokeWidth="1.5"/></g>),
    scaleBalance: () => (<g transform={t}><line x1="35" y1="10" x2="35" y2="70" stroke={c} strokeWidth="2.5"/><line x1="10" y1="18" x2="60" y2="18" stroke={c} strokeWidth="2.5"/><path d="M5,18 L10,38 L20,38Z" fill="none" stroke={c} strokeWidth="2"/><path d="M50,18 L55,38 L60,38Z" fill="none" stroke={c} strokeWidth="2" transform="translate(0,-4)"/><line x1="25" y1="70" x2="45" y2="70" stroke={c} strokeWidth="2.5"/><circle cx="35" cy="10" r="3" fill={c}/></g>),
    networkNodes: () => (<g transform={t}><circle cx="35" cy="40" r="8" fill="none" stroke={c} strokeWidth="2.5"/><circle cx="12" cy="20" r="5" fill="none" stroke={c} strokeWidth="2"/><circle cx="58" cy="20" r="5" fill="none" stroke={c} strokeWidth="2"/><circle cx="12" cy="62" r="5" fill="none" stroke={c} strokeWidth="2"/><circle cx="58" cy="62" r="5" fill="none" stroke={c} strokeWidth="2"/><line x1="28" y1="35" x2="16" y2="24" stroke={c} strokeWidth="1.8"/><line x1="42" y1="35" x2="54" y2="24" stroke={c} strokeWidth="1.8"/><line x1="28" y1="45" x2="16" y2="58" stroke={c} strokeWidth="1.8"/><line x1="42" y1="45" x2="54" y2="58" stroke={c} strokeWidth="1.8"/><circle cx="35" cy="40" r="3" fill={c} opacity="0.5"/></g>),
    treasure: () => (<g transform={t}><path d="M15,40 L15,65 L55,65 L55,40Z" fill="none" stroke={c} strokeWidth="2.5"/><path d="M15,40 Q35,30 55,40" fill="none" stroke={c} strokeWidth="2.5"/><line x1="35" y1="36" x2="35" y2="50" stroke={c} strokeWidth="2"/><circle cx="35" cy="50" r="3" fill={c}/><path d="M25,28 L30,18 M35,26 L35,14 M45,28 L40,18" stroke={c} strokeWidth="1.5" opacity="0.5"/></g>),
    wallBreak: () => (<g transform={t}><line x1="40" y1="5" x2="40" y2="75" stroke={c} strokeWidth="3"/><line x1="40" y1="5" x2="40" y2="25" stroke={c} strokeWidth="3"/><path d="M36,30 L32,35 L38,40 L34,48 L40,50" fill="none" stroke={c} strokeWidth="2.5"/><path d="M44,28 L48,34 L42,38 L46,46 L40,50" fill="none" stroke={c} strokeWidth="2.5"/><circle cx="22" cy="32" r="5" fill="none" stroke={c} strokeWidth="2.5"/><line x1="22" y1="37" x2="22" y2="52" stroke={c} strokeWidth="2.5"/><path d="M30,44 L36,38" stroke={c} strokeWidth="2.5" fill="none" strokeLinecap="round"/><line x1="22" y1="52" x2="18" y2="62" stroke={c} strokeWidth="2.5"/><line x1="22" y1="52" x2="26" y2="62" stroke={c} strokeWidth="2.5"/></g>),
  };
  try { const fn = m[name]; return fn ? fn() : null; } catch(e) { return null; }
}
const SCENE_NAMES = ['mountainClimb','targetHit','bridge','seedToTree','lighthouse','teamCircle','ladder','compass','figureThinking','figureCelebrate','doorOpen','puzzleFit','figureHandshake','figureConversation','figureListening','figureHug','figureFear','figureDoubt','figureBalance','figureCourage','windingRoad','mirrorReflect','scaleBalance','networkNodes','treasure','wallBreak'];

function Ic(name,x,y,s,c) {
  const sc = s/35;
  const t = `translate(${x},${y}) scale(${sc})`;
  const m = {
    idea: () => (<g transform={t}><ellipse cx="17" cy="14" rx="10" ry="11" fill="none" stroke={c} strokeWidth="2.5"/><line x1="13" y1="25" x2="21" y2="25" stroke={c} strokeWidth="2"/></g>),
    heart: () => (<g transform={t}><path d="M17,30 C0,20 0,5 9,3 C13,1 17,6 17,10 C17,6 21,1 25,3 C34,5 34,20 17,30Z" fill={c} opacity="0.8"/></g>),
    star: () => { const p=[]; for(let i=0;i<10;i++){const a=(i*Math.PI)/5-Math.PI/2,r2=i%2===0?14:6;p.push(`${17+r2*Math.cos(a)},${17+r2*Math.sin(a)}`);}return(<g transform={t}><polygon points={p.join(' ')} fill={c} opacity="0.8"/></g>); },
    checkmark: () => (<g transform={t}><path d="M5,18 L13,26 L29,8" fill="none" stroke={c} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/></g>),
    target: () => (<g transform={t}><circle cx="17" cy="17" r="15" fill="none" stroke={c} strokeWidth="2"/><circle cx="17" cy="17" r="9" fill="none" stroke={c} strokeWidth="2"/><circle cx="17" cy="17" r="3" fill={c}/></g>),
    flag: () => (<g transform={t}><line x1="6" y1="4" x2="6" y2="32" stroke={c} strokeWidth="2.5"/><path d="M6,4 L26,10 L6,17Z" fill={c} opacity="0.7"/></g>),
    rocket: () => (<g transform={t}><path d="M17,2 C12,9 12,20 14,27 L17,24 L20,27 C22,20 22,9 17,2Z" fill="none" stroke={c} strokeWidth="2.5"/><circle cx="17" cy="13" r="3" fill={c}/></g>),
    clock: () => (<g transform={t}><circle cx="17" cy="17" r="14" fill="none" stroke={c} strokeWidth="2.5"/><line x1="17" y1="17" x2="17" y2="8" stroke={c} strokeWidth="2.5"/><line x1="17" y1="17" x2="23" y2="20" stroke={c} strokeWidth="2"/></g>),
    speech: () => (<g transform={t}><ellipse cx="17" cy="13" rx="15" ry="11" fill="none" stroke={c} strokeWidth="2.5"/><path d="M10,22 L7,31 L16,23" fill="none" stroke={c} strokeWidth="2"/></g>),
    growth: () => (<g transform={t}><path d="M4,28 L17,8" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round"/><path d="M12,6 L19,6 L19,13" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></g>),
    person: () => (<g transform={t}><circle cx="17" cy="7" r="6" fill="none" stroke={c} strokeWidth="2.5"/><line x1="17" y1="13" x2="17" y2="26" stroke={c} strokeWidth="2.5"/><line x1="9" y1="19" x2="25" y2="19" stroke={c} strokeWidth="2.5"/><line x1="17" y1="26" x2="11" y2="34" stroke={c} strokeWidth="2.5"/><line x1="17" y1="26" x2="23" y2="34" stroke={c} strokeWidth="2.5"/></g>),
    exclamation: () => (<g transform={t}><text x="10" y="28" fontFamily="Caveat" fontSize="32" fontWeight="700" fill={c}>!</text></g>),
    question: () => (<g transform={t}><text x="7" y="28" fontFamily="Caveat" fontSize="32" fontWeight="700" fill={c}>?</text></g>),
    document: () => (<g transform={t}><path d="M6,2 L20,2 L26,8 L26,32 L6,32Z" fill="none" stroke={c} strokeWidth="2.5"/><line x1="10" y1="14" x2="22" y2="14" stroke={c} strokeWidth="1.5"/><line x1="10" y1="20" x2="22" y2="20" stroke={c} strokeWidth="1.5"/></g>),
    loop: () => (<g transform={t}><path d="M22,10 A11,11 0 1,0 25,19" fill="none" stroke={c} strokeWidth="2.5"/><path d="M21,16 L26,20 L29,14" fill="none" stroke={c} strokeWidth="2"/></g>),
    ear: () => (<g transform={t}><path d="M20,6 Q8,6 8,18 Q8,30 17,30 Q14,24 17,20 Q20,16 18,12 Q16,8 20,6Z" fill="none" stroke={c} strokeWidth="2.5"/></g>),
    handshake2: () => (<g transform={t}><path d="M4,18 L12,12 L18,16 L24,12 L32,18" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12,12 L8,22 M24,12 L28,22" fill="none" stroke={c} strokeWidth="2"/></g>),
    shield: () => (<g transform={t}><path d="M17,4 L4,10 L4,20 Q4,30 17,34 Q30,30 30,20 L30,10Z" fill="none" stroke={c} strokeWidth="2.5"/><path d="M12,18 L16,22 L24,12" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"/></g>),
    key: () => (<g transform={t}><circle cx="10" cy="12" r="8" fill="none" stroke={c} strokeWidth="2.5"/><line x1="18" y1="12" x2="32" y2="12" stroke={c} strokeWidth="2.5"/><line x1="28" y1="12" x2="28" y2="18" stroke={c} strokeWidth="2"/><line x1="32" y1="12" x2="32" y2="18" stroke={c} strokeWidth="2"/></g>),
    brain: () => (<g transform={t}><path d="M17,6 Q8,6 8,14 Q4,14 4,20 Q4,26 10,28 Q10,32 17,32 Q24,32 24,28 Q30,26 30,20 Q30,14 26,14 Q26,6 17,6Z" fill="none" stroke={c} strokeWidth="2.5"/><path d="M17,10 L17,28 M12,16 L22,16 M12,22 L22,22" fill="none" stroke={c} strokeWidth="1.5" opacity="0.5"/></g>),
    eye: () => (<g transform={t}><path d="M2,17 Q17,4 32,17 Q17,30 2,17Z" fill="none" stroke={c} strokeWidth="2.5"/><circle cx="17" cy="17" r="6" fill="none" stroke={c} strokeWidth="2"/><circle cx="17" cy="17" r="2.5" fill={c}/></g>),
    thumbsUp: () => (<g transform={t}><path d="M12,14 L12,30 L24,30 L28,14Z" fill="none" stroke={c} strokeWidth="2.5"/><path d="M16,14 L16,8 Q16,4 20,4 L22,4 L22,14" fill="none" stroke={c} strokeWidth="2"/><line x1="12" y1="20" x2="6" y2="20" stroke={c} strokeWidth="2"/><line x1="12" y1="26" x2="6" y2="26" stroke={c} strokeWidth="2"/></g>),
    warning: () => (<g transform={t}><path d="M17,4 L2,32 L32,32Z" fill="none" stroke={c} strokeWidth="2.5" strokeLinejoin="round"/><line x1="17" y1="14" x2="17" y2="22" stroke={c} strokeWidth="2.5"/><circle cx="17" cy="27" r="2" fill={c}/></g>),
  };
  try { const fn = m[name]; return fn ? fn() : null; } catch(e) { return null; }
}
const ICON_NAMES = ['idea','heart','star','checkmark','target','flag','rocket','clock','speech','growth','person','exclamation','question','document','loop','ear','handshake2','shield','key','brain','eye','thumbsUp','warning'];

const PAL = {
  optimistisch:{p:'#E8584F',s:'#F5A623',a:'#4CAF50',t:'#2D2D2D',bg:'#FFF8F0',sb:'#FFFAF5'},
  neutral:{p:'#3B7DD8',s:'#6B7B8D',a:'#E8584F',t:'#2D2D2D',bg:'#F5F7FA',sb:'#F0F4F8'},
  nachdenklich:{p:'#7B68AE',s:'#5A8F7B',a:'#D4A853',t:'#2D2D2D',bg:'#F8F5FF',sb:'#F3F0FA'},
  energisch:{p:'#E8584F',s:'#FF6B35',a:'#FFD23F',t:'#2D2D2D',bg:'#FFF5F0',sb:'#FFF0EB'},
  empathisch:{p:'#E07BAB',s:'#7DAFCB',a:'#95C77E',t:'#2D2D2D',bg:'#FFF5F9',sb:'#FFF0F5'},
};
function gc(pal,key){ return key==='secondary'?pal.s:key==='accent'?pal.a:pal.p; }

function vd(d){
  if(!d||typeof d!=='object')throw new Error('Ungültig');
  return{title:String(d.title||'Sketchnote'),subtitle:d.subtitle?String(d.subtitle):'',orientation:d.orientation==='portrait'?'portrait':'landscape',mood:d.mood||'neutral',cm:d.centralMessage?String(d.centralMessage):'',
    layout:{columns:Number(d.layout?.columns)||3},
    sections:Array.isArray(d.sections)?d.sections.map((s,i)=>({n:s.number||i+1,title:String(s.title||''),scene:SCENE_NAMES.includes(s.scene)?s.scene:null,sym:ICON_NAMES.includes(s.symbol)?s.symbol:'star',color:s.color||'primary',items:Array.isArray(s.items)?s.items.map(String).slice(0,5):[]})):[],
    footer:{title:String(d.footer?.title||''),items:Array.isArray(d.footer?.items)?d.footer.items.map(String).slice(0,4):[]},
  };
}

/* ═══ STRUCTURED ═══ */
function BoxSec({sec,x,y,w,h,pal,seed}){
  const rng=mkR(seed+(sec.n||1)*137),col=gc(pal,sec.color),tY=y+28;
  const hs=!!sec.scene,sw=hs?Math.min(w*0.38,80):0;
  return(<g>
    <path d={rr(x+2,y+2,w-4,h-4,14,rng,2.5)} fill={pal.sb} stroke={pal.t} strokeWidth="1.8" opacity="0.95"/>
    <circle cx={x+20} cy={y+18} r="13" fill={col} opacity="0.9"/>
    <text x={x+20} y={y+23.5} textAnchor="middle" fontFamily="Caveat" fontSize="16" fontWeight="700" fill="#fff">{sec.n}</text>
    <text x={x+38} y={tY+3} fontFamily="Caveat" fontSize="17" fontWeight="700" fill={pal.t}>{(sec.title||'').toUpperCase()}</text>
    <path d={ln(x+10,tY+8,x+w-10,tY+8,rng)} fill="none" stroke={col} strokeWidth="1.5" opacity="0.35"/>
    {hs && Sc(sec.scene,x+w-sw-6,tY+12,Math.min(sw,75)/75,col)}
    {!hs && Ic(sec.sym,x+w-40,y+6,28,col)}
    {(sec.items||[]).slice(0,3).map((item,i)=>{const iy=tY+26+i*18;const txt=item.length>32?item.slice(0,30)+'…':item;return(<g key={i}><circle cx={x+16} cy={iy-3} r="2.5" fill={col} opacity="0.7"/><text x={x+24} y={iy} fontFamily="Patrick Hand" fontSize="12.5" fill={pal.t}>{txt}</text></g>);})}
  </g>);
}

function StructSVG({data,pal}){
  const la=data.orientation!=='portrait',W=la?1100:750,H=la?750:1050;
  const cols=data.layout?.columns||(la?3:2),seed=(data.title||'').length*7+42,rng=mkR(seed);
  const M=20,TH=88,fH=data.footer?.items?.length?66:0,cH2=data.cm?44:0;
  const ch=H-TH-fH-cH2-M*2,cw=W-M*2,secs=data.sections,rows=Math.ceil(secs.length/cols),cW=cw/cols,cHh=ch/Math.max(rows,1);
  return(<svg id="sketchnote-svg" viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',background:pal.bg,borderRadius:12}}>
    <defs><style>{FC}</style></defs><rect width={W} height={H} fill={pal.bg} rx="10"/>
    <path d={rr(8,8,W-16,H-16,16,rng,3)} fill="none" stroke={pal.t} strokeWidth="2" opacity="0.12"/>
    <path d={rr(M+30,12,cw-60,50,10,rng,3)} fill={pal.p} stroke={pal.t} strokeWidth="1.5" opacity="0.9"/>
    <text x={W/2} y={46} textAnchor="middle" fontFamily="Caveat" fontSize="27" fontWeight="700" fill="#fff">{data.title.toUpperCase()}</text>
    {data.subtitle&&<text x={W/2} y={78} textAnchor="middle" fontFamily="Patrick Hand" fontSize="15" fill={pal.t} opacity="0.65">{data.subtitle}</text>}
    {secs.map((s,i)=>(<BoxSec key={i} sec={s} x={M+(i%cols)*cW+5} y={TH+Math.floor(i/cols)*cHh+5} w={cW-10} h={cHh-10} pal={pal} seed={seed}/>))}
    {secs.length>1&&secs.slice(0,-1).map((_,i)=>{const fc=i%cols,fr=Math.floor(i/cols),tc=(i+1)%cols,tr=Math.floor((i+1)/cols),ar=mkR(seed+i*31);let x1,y1,x2,y2;if(tr===fr){x1=M+fc*cW+cW-6;y1=TH+fr*cHh+cHh/2;x2=M+tc*cW+12;y2=y1;}else{x1=M+fc*cW+cW/2;y1=TH+fr*cHh+cHh-2;x2=M+tc*cW+cW/2;y2=TH+tr*cHh+8;}return(<g key={`a${i}`} opacity="0.35">{arr(x1,y1,x2,y2,ar,8).map((p,j)=>(<path key={j} d={p} fill="none" stroke={pal.p} strokeWidth="2" strokeLinecap="round"/>))}</g>);})}
    {data.cm&&<g><path d={rr(W/2-180,H-fH-M-cH2-2,360,34,18,rng,2)} fill="#fff" stroke={pal.p} strokeWidth="1.5"/>{Ic('star',W/2-172,H-fH-M-cH2+2,18,pal.p)}<text x={W/2} y={H-fH-M-cH2+22} textAnchor="middle" fontFamily="Caveat" fontSize="15" fontWeight="600" fill={pal.p}>{data.cm}</text></g>}
    {fH>0&&<g><path d={rr(M,H-fH-M+4,cw,54,10,mkR(seed+999),2)} fill={pal.bg} stroke={pal.p} strokeWidth="1.5" strokeDasharray="6,4"/>{data.footer.title&&<text x={M+16} y={H-fH-M+21} fontFamily="Caveat" fontSize="14" fontWeight="700" fill={pal.p}>{data.footer.title.toUpperCase()}</text>}{data.footer.items.map((it,i)=>{const ix=M+16+i*(cw/Math.max(data.footer.items.length,1));return(<g key={i}>{Ic('heart',ix,H-fH-M+24,13,pal.p)}<text x={ix+16} y={H-fH-M+42} fontFamily="Patrick Hand" fontSize="12" fill={pal.t}>{it}</text></g>);})}</g>}
  </svg>);
}

/* ═══ FREE SKETCH ═══ */

function FreeSVG({data,pal}){
  const la=data.orientation!=='portrait',W=la?1120:760,H=la?660:1100;
  const seed=(data.title||'').length*7+42,rng=mkR(seed);
  const allSecs=data.sections.slice(0,9);
  // Split: first 4-5 = main story, rest = toolbox
  const mainCount=Math.min(allSecs.length,la?5:4);
  const mainSecs=allSecs.slice(0,mainCount);
  const toolSecs=allSecs.slice(mainCount);
  const hasTools=toolSecs.length>0;
  const toolH=hasTools?150:0;
  const storyH=H-90-toolH-30;
  const colW=la?(W-40)/mainCount:(W-40)/Math.min(mainCount,3);

  return(<svg id="sketchnote-svg" viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',background:pal.bg,borderRadius:12}}>
    <defs><style>{FC}</style></defs>
    <rect width={W} height={H} fill={pal.bg} rx="10"/>
    <path d={rr(6,6,W-12,H-12,18,rng,4)} fill="none" stroke={pal.p} strokeWidth="2" opacity="0.12"/>

    {/* Title banner */}
    <path d={rr(W/2-220,10,440,50,8,rng,3)} fill={pal.p} stroke={pal.t} strokeWidth="1.5" opacity="0.9"/>
    <text x={W/2} y={44} textAnchor="middle" fontFamily="Caveat" fontSize="28" fontWeight="700" fill="#fff" letterSpacing="2">{data.title.toUpperCase()}</text>
    {data.subtitle&&<text x={W/2} y={76} textAnchor="middle" fontFamily="Patrick Hand" fontSize="14" fill={pal.t} opacity="0.6">{data.subtitle}</text>}

    {/* Main story sections - horizontal flow */}
    {mainSecs.map((sec,i)=>{
      const col=gc(pal,sec.color);
      const cx=20+i*colW+colW/2; // center x of this column
      const sy=95; // story y start
      const hs=!!sec.scene;
      const items=(sec.items||[]).slice(0,4).map(t=>t.length>28?t.slice(0,26)+'…':t);
      const sceneY=sy+50;
      const bullY=sceneY+(hs?110:50);
      return(<g key={i}>
        {/* Title */}
        <text x={cx} y={sy+12} textAnchor="middle" fontFamily="Caveat" fontSize="16" fontWeight="700" fill={pal.t}>{(sec.title||'').slice(0,22).toUpperCase()}</text>
        <path d={ln(cx-50,sy+18,cx+50,sy+18,mkR(seed+i*77))} fill="none" stroke={col} strokeWidth="1.5" opacity="0.3"/>

        {/* Large scene illustration */}
        {hs && Sc(sec.scene,cx-45,sceneY,1.2,col)}
        {!hs && Ic(sec.sym,cx-22,sceneY+10,50,col)}

        {/* Bullet items below scene */}
        {items.map((item,j)=>{
          const by=bullY+j*18;
          return(<g key={j}>
            {Ic(sec.sym,cx-colW/2+12,by-8,14,col)}
            <text x={cx-colW/2+30} y={by} fontFamily="Patrick Hand" fontSize="13" fill={pal.t}>{item}</text>
          </g>);
        })}

        {/* Arrow to next section */}
        {i<mainSecs.length-1&&(<g opacity="0.4">
          {arr(cx+colW/2-15,sceneY+45,cx+colW/2+15,sceneY+45,mkR(seed+i*53),10).map((p,j)=>(<path key={j} d={p} fill="none" stroke={pal.p} strokeWidth="2.5" strokeLinecap="round"/>))}
        </g>)}
      </g>);
    })}

    {/* Central message */}
    {data.cm&&(<g>
      <path d={rr(W/2-200,H-toolH-55,400,30,15,rng,2)} fill="#fff" stroke={pal.p} strokeWidth="1.5"/>
      {Ic('star',W/2-192,H-toolH-52,16,pal.p)}
      <text x={W/2} y={H-toolH-35} textAnchor="middle" fontFamily="Caveat" fontSize="14" fontWeight="600" fill={pal.p} fontStyle="italic">{data.cm}</text>
    </g>)}

    {/* Toolbox / Footer area */}
    {hasTools&&(<g>
      <path d={rr(20,H-toolH-10,W-40,toolH,12,rng,3)} fill="none" stroke={pal.p} strokeWidth="2"/>
      {/* Toolbox title */}
      <path d={rr(W/2-110,H-toolH-22,220,26,6,rng,2)} fill={pal.bg} stroke={pal.p} strokeWidth="1.5"/>
      <text x={W/2} y={H-toolH-4} textAnchor="middle" fontFamily="Caveat" fontSize="16" fontWeight="700" fill={pal.p}>{data.footer?.title||'MEIN WERKZEUGKASTEN'}</text>

      {/* Tool items in a row */}
      {toolSecs.map((sec,i)=>{
        const col2=gc(pal,sec.color);
        const tw=(W-80)/Math.max(toolSecs.length,1);
        const tx=40+i*tw+tw/2;
        const ty=H-toolH+30;
        const hs2=!!sec.scene;
        return(<g key={`t${i}`}>
          {hs2?Sc(sec.scene,tx-25,ty-10,0.55,col2):Ic(sec.sym,tx-14,ty-4,32,col2)}
          <text x={tx} y={ty+45} textAnchor="middle" fontFamily="Caveat" fontSize="13" fontWeight="700" fill={col2}>{(sec.title||'').slice(0,20).toUpperCase()}</text>
          {(sec.items||[]).slice(0,2).map((item,j)=>(<text key={j} x={tx} y={ty+60+j*14} textAnchor="middle" fontFamily="Patrick Hand" fontSize="11" fill={pal.t}>{item.length>24?item.slice(0,22)+'…':item}</text>))}
        </g>);
      })}
    </g>)}

    {/* Footer items if no toolbox */}
    {!hasTools&&data.footer?.items?.length>0&&(<g>
      <path d={rr(20,H-60,W-40,50,10,rng,2)} fill="none" stroke={pal.p} strokeWidth="1.5" strokeDasharray="6,4"/>
      {data.footer.items.map((it,i)=>{const ix=40+i*((W-80)/Math.max(data.footer.items.length,1));return(<g key={i}>{Ic('heart',ix,H-48,14,pal.p)}<text x={ix+18} y={H-34} fontFamily="Patrick Hand" fontSize="12" fill={pal.t}>{it}</text></g>);})}
    </g>)}
  </svg>);
}

/* ═══ WIZARD ═══ */
const STEPS=[
  {id:'style',l:'Stil',q:'Darstellungsstil?',t:'select',o:['📦 Strukturiert','🎨 Freie Skizze']},
  {id:'topic',l:'Thema',q:'Beschreibe das Thema.',ph:'z.B. Selbstständigkeit...',t:'textarea'},
  {id:'context',l:'Kontext',q:'Wofür?',t:'select',o:['Selbstreflexion','Coaching','Beratung','Workshop','Präsentation']},
  {id:'goal',l:'Ziel',q:'Was soll verstanden werden?',ph:'z.B. Mut + nächste Schritte',t:'textarea'},
  {id:'structure',l:'Struktur',q:'Welche Struktur?',t:'select',o:['Prozess','Übersicht','Problem-Lösung','Vergleich','Zeitstrahl','Zyklus']},
  {id:'mood',l:'Stimmung',q:'Welche Stimmung?',t:'select',o:['Optimistisch','Neutral','Nachdenklich','Energisch','Empathisch']},
  {id:'orientation',l:'Format',q:'Format?',t:'select',o:['Querformat','Hochformat','Automatisch']},
  {id:'extras',l:'Extras',q:'Weitere Elemente? (optional)',ph:'Begriffe...',t:'textarea',opt:true},
];
const MO={Optimistisch:'optimistisch',Neutral:'neutral',Nachdenklich:'nachdenklich',Energisch:'energisch',Empathisch:'empathisch'};
const OR={Querformat:'landscape',Hochformat:'portrait',Automatisch:'auto'};

async function callAPI(answers,mode,attempt=0){
  const scL=SCENE_NAMES.join(','),syL=ICON_NAMES.join(',');
  const base=`Sketchnote-Designer, Bikablo-Stil. NUR reines JSON antworten. Keine Backticks, kein Text.
Szenen:${scL}
Szenen-Guide: mountainClimb=Herausforderung,targetHit=Ziel,bridge=Verbindung,seedToTree=Wachstum,lighthouse=Orientierung,teamCircle=Teamwork,ladder=Aufstieg,compass=Richtung,figureThinking=Reflexion,figureCelebrate=Erfolg,doorOpen=Neuanfang,puzzleFit=Zusammenhang,figureHandshake=Vereinbarung/Kennenlernen,figureConversation=Dialog/Austausch,figureListening=Zuhören/Empathie,figureHug=Nähe/Trost,figureFear=Angst/Hemmung,figureDoubt=Zweifel/Entscheidung,figureBalance=Balance/Gleichgewicht,figureCourage=Mut/Durchbruch,windingRoad=Lebensweg/Prozess,mirrorReflect=Selbstreflexion,scaleBalance=Abwägen,networkNodes=Netzwerk/Vernetzung,treasure=Schatz/Potenzial,wallBreak=Durchbruch/Überwindung
Symbole:${syL}
JSON:{"title":"..","subtitle":"..","orientation":"landscape","mood":"optimistisch","centralMessage":"..","layout":{"columns":3},"sections":[{"number":1,"title":"..","scene":"name|null","symbol":"name","color":"primary","items":["..max28Z"]}],"footer":{"title":"FAZIT","items":[".."]}}
Erste 4-5 Sektionen=Hauptstory,Rest=Werkzeugkasten. 7-9 Sektionen,2-3 kurze Stichpunkte(max 28Z!),Titel max 22Z,mind.5 mit scene,Deutsch,Nutze vielfältige Szenen!`;
  let sys,usr;
  if(mode==='guided'){const mk=MO[answers.mood]||'neutral',or=OR[answers.orientation]||'landscape';
    sys=base+` Stimmung:${mk} Struktur:${answers.structure} Kontext:${answers.context} Orient:${or==='auto'?'wähle':or}`;
    usr=`THEMA:${answers.topic} ZIEL:${answers.goal||'Überblick'} EXTRA:${answers.extras||'Keine'} JSON:`;
  }else{sys=base+' Freie Beschreibung.Leite alles ab.';usr=`BESCHREIBUNG:${answers.freetext} JSON:`;}
  const apiUrl = import.meta.env.VITE_API_URL || '/api/generate';
  const res=await fetch(apiUrl,{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:2000,system:sys,messages:[{role:"user",content:usr}]})});
  if(res.status===429&&attempt<2){await new Promise(r=>setTimeout(r,(attempt+1)*15000));return callAPI(answers,mode,attempt+1);}
  if(!res.ok)throw new Error(res.status===429?'Rate-Limit erreicht. Bitte 30s warten und erneut versuchen.':`API-Fehler ${res.status}`);
  const data=await res.json();if(data.error)throw new Error(data.error.message);
  const text=(data.content||[]).map(b=>b.text||'').join('');if(!text.trim())throw new Error('Leer');
  const cl=text.replace(/```json\s*/g,'').replace(/```\s*/g,'').trim();
  let p;try{p=JSON.parse(cl);}catch(e){const mt=cl.match(/\{[\s\S]*\}/);if(mt)p=JSON.parse(mt[0]);else throw new Error('JSON-Fehler');}
  return vd(p);
}

function dlB(b,n){const u=URL.createObjectURL(b),a=Object.assign(document.createElement('a'),{href:u,download:n});document.body.appendChild(a);a.click();document.body.removeChild(a);setTimeout(()=>URL.revokeObjectURL(u),1000);}
function sl(t){return(t||'x').toLowerCase().replace(/[^a-z0-9]+/g,'-').slice(0,30);}
function dlS(t){const el=document.getElementById('sketchnote-svg');if(!el)return;const c=el.cloneNode(true);c.setAttribute('xmlns','http://www.w3.org/2000/svg');dlB(new Blob([new XMLSerializer().serializeToString(c)],{type:'image/svg+xml'}),`sn-${sl(t)}.svg`);}
function dlP(t,p){const el=document.getElementById('sketchnote-svg');if(!el)return;const c=el.cloneNode(true);c.setAttribute('xmlns','http://www.w3.org/2000/svg');const s=new XMLSerializer().serializeToString(c),vb=el.getAttribute('viewBox').split(' ').map(Number);const cv=Object.assign(document.createElement('canvas'),{width:vb[2]*2,height:vb[3]*2}),ctx=cv.getContext('2d'),img=new Image();img.onload=()=>{ctx.fillStyle=p.bg;ctx.fillRect(0,0,cv.width,cv.height);ctx.drawImage(img,0,0,cv.width,cv.height);cv.toBlob(b=>{if(b)dlB(b,`sn-${sl(t)}.png`);},'image/png');};img.onerror=()=>alert('PNG fehler');img.src='data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(s)));}
function dlJ(a,d,m,r){dlB(new Blob([JSON.stringify({v:7,mode:m,rs:r,answers:a,data:d,at:new Date().toISOString()},null,2)],{type:'application/json'}),`sn-${sl(d?.title)}.json`);}

const bt=(c,f)=>({padding:'9px 16px',borderRadius:10,border:f?'none':`2px solid ${c}`,background:f?c:'#fff',color:f?'#fff':c,fontFamily:'Caveat,cursive',fontSize:16,fontWeight:600,cursor:'pointer',whiteSpace:'nowrap'});

export default function App(){
  const[ph,setPh]=useState('mode');
  const[mode,setMode]=useState(null);
  const[ans,setAns]=useState({});
  const[sn,setSn]=useState(null);
  const[pal,setPal]=useState(PAL.neutral);
  const[err,setErr]=useState(null);
  const[rs,setRs]=useState('structured');
  const[step,setStep]=useState(0);
  const[ft,setFt]=useState('');
  const[frs,setFrs]=useState('free');
  const fr=useRef(null);

  const gen=useCallback(async(a,m)=>{setAns(a);setPh('loading');setErr(null);
    try{const d=await callAPI(a,m);const mk=m==='guided'?(MO[a.mood]||'neutral'):(d.mood&&PAL[d.mood]?d.mood:'empathisch');setPal(PAL[mk]||PAL.neutral);setSn(d);setPh('result');}
    catch(e){console.error(e);setErr(e.message);setPh(m==='guided'?'guided':'free');}
  },[]);

  // MODE SELECT
  if(ph==='mode') return(<div style={{minHeight:'100vh',background:'linear-gradient(145deg,#FEFCFB,#F5F0EB)'}}>
    <style>{FC}</style>
    <div style={{textAlign:'center',padding:'16px 16px 3px'}}><h1 style={{fontFamily:'Caveat,cursive',fontSize:30,fontWeight:700,color:'#2D2D2D',margin:0}}>✏️ Sketchnote Visualizer</h1><p style={{fontFamily:'Patrick Hand,cursive',fontSize:13,color:'#aaa',marginTop:2}}>Strukturiert oder Frei · Bikablo-Stil</p></div>
    <div style={{maxWidth:500,margin:'0 auto',padding:20}}>
      <h2 style={{fontFamily:'Caveat,cursive',fontSize:25,color:'#2D2D2D',textAlign:'center',marginBottom:18}}>Wie möchtest du starten?</h2>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        {[['guided','📋 Geführt','Schritt für Schritt','#E8584F'],['free','✍️ Frei','KI leitet alles ab','#3B7DD8']].map(([k,ti,desc,col])=>(<div key={k} onClick={()=>{setMode(k);setPh(k);setStep(0);}} style={{padding:'16px 18px',borderRadius:14,border:`2px solid ${col}`,background:'#FEFCFB',cursor:'pointer'}}><div style={{fontFamily:'Caveat,cursive',fontSize:20,fontWeight:700,color:col}}>{ti}</div><div style={{fontFamily:'Patrick Hand,cursive',fontSize:14,color:'#666'}}>{desc}</div></div>))}
        <div onClick={()=>fr.current?.click()} style={{padding:'16px 18px',borderRadius:14,border:'2px solid #aaa',background:'#FEFCFB',cursor:'pointer'}}><div style={{fontFamily:'Caveat,cursive',fontSize:20,fontWeight:700,color:'#777'}}>📂 Projekt laden</div></div>
      </div>
      <input ref={fr} type="file" accept=".json" style={{display:'none'}} onChange={e=>{const f=e.target.files?.[0];if(!f)return;const r2=new FileReader();r2.onload=ev=>{try{const p=JSON.parse(ev.target.result);if(!p?.answers){alert('Ungültig');return;}setAns(p.answers);setMode(p.mode||'guided');setRs(p.rs||'structured');if(p.data){setSn(vd(p.data));const mk=p.mode==='guided'?(MO[p.answers?.mood]||'neutral'):(p.data.mood||'empathisch');setPal(PAL[mk]||PAL.neutral);setPh('result');}else setPh(p.mode||'guided');}catch(err2){alert('Datei ungültig');}};r2.readAsText(f);}}/>
    </div>
  </div>);

  // GUIDED WIZARD
  if(ph==='guided'){const c=STEPS[step],ok=c.opt||(ans[c.id]&&ans[c.id].trim());
    return(<div style={{minHeight:'100vh',background:'linear-gradient(145deg,#FEFCFB,#F5F0EB)'}}>
      <style>{FC}</style>
      <div style={{textAlign:'center',padding:'16px 16px 3px'}}><h1 style={{fontFamily:'Caveat,cursive',fontSize:30,fontWeight:700,color:'#2D2D2D',margin:0}}>✏️ Sketchnote Visualizer</h1></div>
      {err&&<div style={{maxWidth:500,margin:'0 auto 8px',padding:'10px 16px',background:'#FFF0F0',border:'2px solid #E8584F',borderRadius:10,textAlign:'center',fontFamily:'Patrick Hand,cursive',fontSize:14,color:'#E8584F'}}>{err}</div>}
      <div style={{maxWidth:540,margin:'0 auto',padding:20}}>
        <div style={{display:'flex',gap:5,marginBottom:22}}>{STEPS.map((_,i)=>(<div key={i} style={{flex:1,height:5,borderRadius:3,background:i<=step?'#E8584F':'#e0e0e0'}}/>))}</div>
        <div style={{fontFamily:'Caveat,cursive',fontSize:13,color:'#E8584F',fontWeight:600}}>SCHRITT {step+1}/{STEPS.length}</div>
        <h2 style={{fontFamily:'Caveat,cursive',fontSize:24,fontWeight:700,color:'#2D2D2D',marginBottom:14}}>{c.q}</h2>
        {c.t==='textarea'?(<textarea value={ans[c.id]||''} onChange={e=>setAns(a=>({...a,[c.id]:e.target.value}))} placeholder={c.ph} style={{width:'100%',minHeight:95,padding:13,borderRadius:12,border:'2px solid #e0e0e0',fontFamily:'Patrick Hand,cursive',fontSize:15,resize:'vertical',outline:'none',background:'#FAFAFA',boxSizing:'border-box'}}/>)
        :(<div style={{display:'flex',flexDirection:'column',gap:7}}>{c.o.map(o=>(<button key={o} onClick={()=>setAns(a=>({...a,[c.id]:o}))} style={{padding:'10px 15px',borderRadius:12,textAlign:'left',fontFamily:'Patrick Hand,cursive',fontSize:15,cursor:'pointer',border:ans[c.id]===o?'2px solid #E8584F':'2px solid #e0e0e0',background:ans[c.id]===o?'#FFF5F0':'#FAFAFA',color:'#2D2D2D'}}>{o}</button>))}</div>)}
        <div style={{display:'flex',justifyContent:'space-between',marginTop:20}}>
          <button onClick={()=>step>0?setStep(s=>s-1):setPh('mode')} style={bt('#888',false)}>{step>0?'← Zurück':'← Modus'}</button>
          <button onClick={()=>{if(step<STEPS.length-1)setStep(s=>s+1);else{setRs((ans.style||'').includes('Frei')?'free':'structured');gen(ans,'guided');}}} disabled={!ok} style={{...bt(ok?'#E8584F':'#ccc',true),fontSize:18}}>{step<STEPS.length-1?'Weiter →':'✨ Erstellen'}</button>
        </div>
      </div>
    </div>);
  }

  // FREE MODE
  if(ph==='free') return(<div style={{minHeight:'100vh',background:'linear-gradient(145deg,#FEFCFB,#F5F0EB)'}}>
    <style>{FC}</style>
    <div style={{textAlign:'center',padding:'16px 16px 3px'}}><h1 style={{fontFamily:'Caveat,cursive',fontSize:30,fontWeight:700,color:'#2D2D2D',margin:0}}>✏️ Sketchnote Visualizer</h1></div>
    {err&&<div style={{maxWidth:500,margin:'0 auto 8px',padding:'10px 16px',background:'#FFF0F0',border:'2px solid #E8584F',borderRadius:10,textAlign:'center',fontFamily:'Patrick Hand,cursive',fontSize:14,color:'#E8584F'}}>{err}</div>}
    <div style={{maxWidth:560,margin:'0 auto',padding:20}}>
      <h2 style={{fontFamily:'Caveat,cursive',fontSize:24,fontWeight:700,color:'#2D2D2D',marginBottom:5}}>Beschreibe dein Thema frei</h2>
      <textarea value={ft} onChange={e=>setFt(e.target.value)} placeholder='Coaching: Selbstständigkeit. Angst, Netzwerk, Kunden, Mindset. Ermutigend.'
        style={{width:'100%',minHeight:160,padding:15,borderRadius:14,border:'2px solid #e0e0e0',fontFamily:'Patrick Hand,cursive',fontSize:15,resize:'vertical',outline:'none',background:'#FAFAFA',boxSizing:'border-box',lineHeight:1.6}}/>
      <div style={{display:'flex',gap:8,marginTop:12}}>
        {[['structured','📦 Strukturiert'],['free','🎨 Freie Skizze']].map(([k,la])=>(<button key={k} onClick={()=>setFrs(k)} style={{flex:1,padding:10,borderRadius:10,border:frs===k?'2px solid #3B7DD8':'2px solid #e0e0e0',background:frs===k?'#F0F4FF':'#FAFAFA',fontFamily:'Caveat,cursive',fontSize:15,cursor:'pointer',color:'#2D2D2D'}}>{la}</button>))}
      </div>
      <div style={{display:'flex',justifyContent:'space-between',marginTop:16}}>
        <button onClick={()=>setPh('mode')} style={bt('#888',false)}>← Modus</button>
        <button onClick={()=>{if(!ft.trim())return;setRs(frs);gen({freetext:ft},'free');}} disabled={!ft.trim()} style={{...bt(ft.trim()?'#3B7DD8':'#ccc',true),fontSize:18}}>✨ Erstellen</button>
      </div>
    </div>
  </div>);

  // LOADING
  if(ph==='loading') return(<div style={{minHeight:'100vh',background:'linear-gradient(145deg,#FEFCFB,#F5F0EB)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:14}}>
    <style>{FC}</style>
    <div style={{width:46,height:46,border:'4px solid #f0e0e0',borderTop:'4px solid #E8584F',borderRadius:'50%',animation:'spin 1s linear infinite'}}/>
    <div style={{fontFamily:'Caveat,cursive',fontSize:20,color:'#E8584F',fontWeight:600}}>Sketchnote wird erstellt...</div>
    <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
  </div>);

  // RESULT
  if(ph==='result'&&sn){
    let svg;
    try{svg=rs==='free'?<FreeSVG data={sn} pal={pal}/>:<StructSVG data={sn} pal={pal}/>;}
    catch(e){svg=<div style={{padding:20,color:'#E8584F'}}>Fehler: {e.message}</div>;}
    return(<div style={{minHeight:'100vh',background:'linear-gradient(145deg,#FEFCFB,#F5F0EB)'}}>
      <style>{FC}</style>
      <div style={{textAlign:'center',padding:'16px 16px 3px'}}><h1 style={{fontFamily:'Caveat,cursive',fontSize:30,fontWeight:700,color:'#2D2D2D',margin:0}}>✏️ Sketchnote Visualizer</h1></div>
      <div style={{padding:14}}>
        <div style={{display:'flex',gap:8,marginBottom:12,flexWrap:'wrap',justifyContent:'center'}}>
          <button onClick={()=>{setPh('mode');setMode(null);setAns({});setSn(null);setErr(null);}} style={bt('#888',false)}>← Neu</button>
          <button onClick={()=>setPh(mode==='free'?'free':'guided')} style={bt('#7B68AE',false)}>✏️ Bearbeiten</button>
          <button onClick={()=>setRs(r=>r==='free'?'structured':'free')} style={bt('#3B7DD8',false)}>{rs==='free'?'📦 Kästchen':'🎨 Frei'}</button>
          <button onClick={()=>dlS(sn?.title)} style={bt('#2E86AB',false)}>⬇ SVG</button>
          <button onClick={()=>dlP(sn?.title,pal)} style={bt('#4CAF50',false)}>⬇ PNG</button>
          <button onClick={()=>dlJ(ans,sn,mode,rs)} style={bt('#F5A623',false)}>💾 Speichern</button>
        </div>
        <div style={{maxWidth:1100,margin:'0 auto',boxShadow:'0 6px 28px rgba(0,0,0,.1)',borderRadius:12,overflow:'hidden'}}>{svg}</div>
      </div>
    </div>);
  }

  return(<div style={{minHeight:'100vh',background:'#FEFCFB',display:'flex',alignItems:'center',justifyContent:'center'}}>
    <style>{FC}</style>
    <button onClick={()=>setPh('mode')} style={bt('#E8584F',true)}>Starten</button>
  </div>);
}
