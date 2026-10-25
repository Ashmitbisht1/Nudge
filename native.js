(function(){
 const C=window.Capacitor,LN=C&&C.Plugins&&C.Plugins.LocalNotifications;
 if(!C||!C.isNativePlatform||!C.isNativePlatform()||!LN)return;
 window.NATIVE=true;
 const e=t=>t.emoji||'🔔',tod=m=>((m%1440)+1440)%1440;
 const allT=()=>S.profiles.flatMap(p=>p.tasks);
 function content(ts){
  if(S.emojiOnly)return{title:ts.map(e).join(' '),body:' '};
  if(ts.length>1)return{title:ts.length+' reminders',body:ts.map(t=>e(t)+' '+t.title).join('\n')};
  return{title:(ts[0].emoji?ts[0].emoji+' ':'')+ts[0].title,body:'Time for a quick check-in'}}
 /* Time-window reminders: one repeating-daily alarm per time of day, so no refilling is needed */
 function daily(){const by={};
  live().filter(t=>t.on&&t.mode==='window').forEach(t=>{
   const st=hm(t.start),len=winLen(t)/6e4,seen=new Set();
   for(let k=0;k*t.iv<=len;k++){const m=tod(st+k*t.iv);if(seen.has(m))continue;seen.add(m);(by[m]=by[m]||[]).push(t)}});
  return by}
 /* "When I'm awake" reminders: one-off alarms for up to 16 hours after you tap I'm awake */
 function wake(){const now=Date.now(),by={};
  if(!S.awake)return by;
  live().filter(t=>t.on&&t.mode==='wake').forEach(t=>{const iv=t.iv*6e4,end=S.awake+16*36e5;
   for(let x=S.awake+iv;x<=end;x+=iv)if(x>now){const k=Math.round(x/6e4)*6e4;(by[k]=by[k]||[]).push(t)}});
  return by}
 function plan(){const out=[],dy=daily(),wk=wake();
  Object.keys(dy).map(Number).forEach(m=>{const g=dy[m],h=Math.floor(m/60),mi=m%60;
   if(g.length>=4)out.push({ts:g,on:{hour:h,minute:mi,second:0},tod:m*6e4});
   else g.forEach((t,i)=>out.push({ts:[t],on:{hour:h,minute:mi,second:i*5},tod:m*6e4+i*5000}))});
  Object.keys(wk).map(Number).sort((a,b)=>a-b).forEach(k=>{
   const g=wk[k],d=new Date(k),w=(dy[d.getHours()*60+d.getMinutes()]||[]).length,off=w>=4?5000:w*5000;
   if(g.length>=4)out.push({ts:g,at:k+off,occ:k});
   else g.forEach((t,i)=>out.push({ts:[t],at:k+off+i*5000,occ:k}))});
  return out.slice(0,400)}
 async function run(){
  const pm=await LN.checkPermissions();
  if(pm.display!=='granted'){const r=await LN.requestPermissions();if(r.display!=='granted')return}
  try{await LN.createChannel({id:'nudge',name:'Reminders',importance:4,vibration:true})}catch(x){}
  try{await LN.registerActionTypes({types:[{id:'NUDGE',actions:[{id:'done',title:'✓ Done'}]}]})}catch(x){}
  const p=await LN.getPending();
  if(p.notifications.length)await LN.cancel({notifications:p.notifications.map(n=>({id:n.id}))});
  const items=plan();
  if(items.length)await LN.schedule({notifications:items.map((it,i)=>{const c=content(it.ts);
   return{id:i+1,title:c.title,body:c.body,largeBody:c.body,channelId:'nudge',actionTypeId:'NUDGE',
    schedule:it.on?{on:it.on,allowWhileIdle:true}:{at:new Date(it.at),allowWhileIdle:true},
    extra:{ids:it.ts.map(t=>t.id),tod:it.tod,at:it.occ,zen:!!S.zen}}})})}
 let busy=false,again=false;
 async function sync(){
  if(busy){again=true;return}
  busy=true;try{await run()}catch(x){console.error(x)}busy=false;
  if(again){again=false;sync()}}
 /* which scheduled moment does a tapped notification belong to? */
 const occ=ex=>{if(ex.at)return ex.at;const n=Date.now();let x=mid(n)+ex.tod;if(x>n+6e4)x=mid(mid(n)-1)+ex.tod;return x};
 LN.addListener('localNotificationActionPerformed',a=>{
  const ex=a.notification.extra||{},ids=ex.ids||[],x=occ(ex);
  const ts=ids.map(i=>allT().find(t=>t.id===i)).filter(Boolean);
  if(!ts.length)return;
  if(a.actionId==='done')markDone(ts,x);
  else if(S.zen)zen(ts,x);
  else if(ts.length===1)openTask(ts[0].id);else show(ts)});
 let tm;window.onSave=()=>{clearTimeout(tm);tm=setTimeout(sync,500)};
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)sync()});
 sync();
})();
