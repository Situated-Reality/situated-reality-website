const canvas=document.querySelector('[data-research-world]');
const world=document.querySelector('[data-research-cinematic]');

if(canvas&&world&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  try{
    const ctx=canvas.getContext('2d',{alpha:false});
    if(!ctx)throw new Error('Canvas 2D is unavailable');

    const C={navy:'#17345c',cyan:'#52cdd0',cyan2:'#78dedc',green:'#55b84f',amber:'#f39a12',white:'#f8ffff',glass:'rgba(99,199,117,.72)',line:'rgba(110,205,207,.48)'};
    const clamp=n=>Math.max(0,Math.min(1,n));
    const mix=(a,b,t)=>a+(b-a)*t;
    const smooth=t=>{t=clamp(t);return t*t*(3-2*t)};
    const ease=(a,b,t)=>smooth((t-a)/(b-a));

    const glasses=[
      // Horizontal oblique view from the corrected sketch: parallel temples sit behind two lenses.
      {shape:'pill',x:-8,y:-92,w:260,h:14,fill:C.navy,rot:-.56},
      {shape:'pill',x:232,y:-82,w:250,h:14,fill:C.navy,rot:-.52},
      {shape:'pill',x:0,y:4,w:80,h:14,fill:C.navy},
      {shape:'ellipse',x:-122,y:6,w:214,h:142,fill:C.glass,stroke:C.navy,sw:13,rot:.02},
      {shape:'ellipse',x:112,y:10,w:206,h:146,fill:'rgba(84,184,79,.62)',stroke:C.navy,sw:13,rot:.03},
      // Two cyan interface windows orbit the first lens.
      {shape:'tile',x:-244,y:-92,w:98,h:62,fill:C.cyan},
      {shape:'tile',x:-58,y:116,w:82,h:64,fill:C.cyan2},
      // Four amber compute modules orbit the second lens.
      {shape:'tile',x:18,y:-38,w:54,h:52,fill:C.amber},
      {shape:'tile',x:132,y:-92,w:88,h:62,fill:C.amber},
      {shape:'tile',x:74,y:116,w:76,h:62,fill:C.amber},
      {shape:'tile',x:206,y:110,w:92,h:64,fill:C.amber}
    ];

    const headset=[
      {shape:'arc',x:0,y:-14,w:380,h:260,fill:C.cyan,sw:30},
      {shape:'pill',x:0,y:2,w:450,h:202,fill:C.navy},
      {shape:'pill',x:0,y:4,w:408,h:150,fill:C.glass,stroke:C.cyan2,sw:5},
      {shape:'pill',x:-242,y:4,w:82,h:58,fill:C.navy},
      {shape:'pill',x:242,y:4,w:82,h:58,fill:C.navy},
      {shape:'tile',x:-138,y:-34,w:98,h:62,fill:C.cyan},
      {shape:'tile',x:-116,y:38,w:82,h:64,fill:C.cyan2},
      {shape:'tile',x:145,y:-34,w:40,h:34,fill:C.amber},
      {shape:'tile',x:191,y:-34,w:40,h:34,fill:C.amber},
      {shape:'tile',x:145,y:14,w:40,h:34,fill:C.amber},
      {shape:'tile',x:191,y:14,w:40,h:34,fill:C.amber},
      {shape:'line',x:0,y:58,w:320,h:0,fill:C.line,sw:4}
    ];

    const logo=[
      {shape:'dome',x:0,y:-45,w:430,h:190,fill:C.cyan},
      {shape:'eyeFill',x:0,y:20,w:430,h:154,fill:'#e8f4ef'},
      {shape:'circle',x:0,y:18,w:142,h:142,fill:C.green},
      {shape:'circle',x:-10,y:18,w:62,h:62,fill:C.navy},
      {shape:'circle',x:-32,y:-8,w:24,h:24,fill:C.white},
      {shape:'eye',x:0,y:20,w:430,h:154,fill:C.navy,sw:15},
      {shape:'tile',x:-187,y:0,w:98,h:62,fill:C.cyan},
      {shape:'tile',x:-174,y:68,w:82,h:64,fill:C.cyan2},
      {shape:'tile',x:170,y:-24,w:38,h:34,fill:C.amber},
      {shape:'tile',x:216,y:-24,w:38,h:34,fill:C.amber},
      {shape:'tile',x:170,y:24,w:38,h:34,fill:C.amber},
      {shape:'tile',x:216,y:24,w:38,h:34,fill:C.amber}
    ];

    const prepare=(items,offset)=>items.map((item,index)=>{
      const angle=(index*2.399+offset)%6.283;
      const radius=250+(index%4)*46;
      return {...item,sx:Math.cos(angle)*radius,sy:Math.sin(angle)*radius*.72,srot:(index%2?1:-1)*(.35+(index%3)*.18),delay:(index%6)/6};
    });
    const groups=[prepare(glasses,.3),prepare(headset,2.2),prepare(logo,4.1)];

    const rounded=(x,y,w,h,r)=>{
      r=Math.min(r,w/2,h/2);ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();
    };
    const drawShape=item=>{
      const w=item.w,h=item.h,sw=item.sw||0;
      ctx.lineCap='round';ctx.lineJoin='round';ctx.fillStyle=item.fill||C.white;ctx.strokeStyle=item.stroke||item.fill||C.white;ctx.lineWidth=sw;
      if(item.shape==='pill'||item.shape==='tile'){
        rounded(-w/2,-h/2,w,h,item.shape==='pill'?h/2:Math.min(10,h*.24));ctx.fill();if(item.shape==='tile'){ctx.strokeStyle='rgba(23,52,92,.2)';ctx.lineWidth=2;ctx.stroke();ctx.beginPath();ctx.moveTo(-w*.28,0);ctx.lineTo(w*.28,0);ctx.stroke()}
      }else if(item.shape==='ellipse'||item.shape==='circle'){
        ctx.beginPath();ctx.ellipse(0,0,w/2,h/2,0,0,Math.PI*2);ctx.fill();if(sw)ctx.stroke();
      }else if(item.shape==='line'){
        ctx.beginPath();ctx.moveTo(-w/2,0);ctx.lineTo(w/2,0);ctx.strokeStyle=item.fill;ctx.lineWidth=sw;ctx.stroke();
      }else if(item.shape==='arc'){
        ctx.beginPath();ctx.moveTo(-w/2,h*.2);ctx.bezierCurveTo(-w*.4,-h*.48,w*.4,-h*.48,w/2,h*.2);ctx.strokeStyle=item.fill;ctx.lineWidth=sw;ctx.stroke();
      }else if(item.shape==='dome'){
        ctx.beginPath();ctx.moveTo(-w/2,h*.28);ctx.bezierCurveTo(-w*.38,-h*.52,w*.38,-h*.52,w/2,h*.28);ctx.lineTo(-w/2,h*.28);ctx.closePath();ctx.fill();
      }else if(item.shape==='eyeFill'){
        ctx.beginPath();ctx.moveTo(-w/2,0);ctx.bezierCurveTo(-w*.28,-h*.55,w*.28,-h*.55,w/2,0);ctx.bezierCurveTo(w*.28,h*.55,-w*.28,h*.55,-w/2,0);ctx.closePath();ctx.fill();
      }else if(item.shape==='eye'){
        ctx.beginPath();ctx.moveTo(-w/2,0);ctx.bezierCurveTo(-w*.28,-h*.55,w*.28,-h*.55,w/2,0);ctx.bezierCurveTo(w*.28,h*.55,-w*.28,h*.55,-w/2,0);ctx.strokeStyle=item.fill;ctx.lineWidth=sw;ctx.stroke();
      }
    };

    const drawGroup=(items,weight,cx,cy,scale)=>{
      items.forEach(item=>{
        const local=smooth(clamp((weight-item.delay*.1)/(1-item.delay*.1)));
        if(local<=.005)return;
        const x=mix(item.sx,item.x,local),y=mix(item.sy,item.y,local),rot=mix(item.srot,item.rot||0,local),size=.58+.42*local;
        ctx.save();ctx.globalAlpha=smooth(local);ctx.translate(cx+x*scale,cy+y*scale);ctx.rotate(rot);ctx.scale(scale*size,scale*size);drawShape(item);ctx.restore();
      });
    };

    let width=0,height=0,dpr=1,progress=0,active=true;
    const resize=()=>{
      const rect=canvas.getBoundingClientRect();width=Math.max(1,Math.round(rect.width));height=Math.max(1,Math.round(rect.height));dpr=Math.min(devicePixelRatio||1,1.8);
      const rw=Math.round(width*dpr),rh=Math.round(height*dpr);if(canvas.width!==rw||canvas.height!==rh){canvas.width=rw;canvas.height=rh}
    };
    const updateScroll=()=>{const r=world.getBoundingClientRect(),travel=Math.max(1,world.offsetHeight-innerHeight);progress=clamp(-r.top/travel);active=r.bottom>0&&r.top<innerHeight};
    const render=()=>{
      requestAnimationFrame(render);if(!active)return;resize();ctx.setTransform(dpr,0,0,dpr,0,0);
      const gradient=ctx.createRadialGradient(width*.28,height*.46,10,width*.28,height*.46,Math.max(width,height)*.7);gradient.addColorStop(0,'#123244');gradient.addColorStop(.46,'#071824');gradient.addColorStop(1,'#020911');ctx.fillStyle=gradient;ctx.fillRect(0,0,width,height);
      ctx.save();ctx.globalAlpha=.12;ctx.strokeStyle=C.line;ctx.lineWidth=1;for(let x=0;x<width;x+=72){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,height);ctx.stroke()}for(let y=0;y<height;y+=72){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(width,y);ctx.stroke()}ctx.restore();
      const mobile=width<=900,cx=width*(mobile?.5:.31),cy=height*.48,scale=Math.min(width*(mobile?.0014:.00082),height*.00155);
      const w0=1-ease(.17,.37,progress),w1=ease(.14,.35,progress)*(1-ease(.53,.73,progress)),w2=ease(.5,.74,progress);
      drawGroup(groups[0],w0,cx,cy,scale);drawGroup(groups[1],w1,cx,cy,scale);drawGroup(groups[2],w2,cx,cy,scale);
    };
    addEventListener('scroll',updateScroll,{passive:true});addEventListener('resize',resize,{passive:true});updateScroll();resize();render();
  }catch(error){canvas.classList.add('is-unavailable');console.warn('Research world fallback active.',error)}
}
