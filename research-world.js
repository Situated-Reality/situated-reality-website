import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.min.js';

const canvas=document.querySelector('[data-research-world]');
const world=document.querySelector('[data-research-cinematic]');
if(canvas&&world&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
try{
  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
  const scene=new THREE.Scene();scene.background=new THREE.Color(0x020a12);scene.fog=new THREE.FogExp2(0x020a12,.026);
  const camera=new THREE.PerspectiveCamera(32,1,.1,100);camera.position.set(-1.4,.6,18);
  scene.add(new THREE.HemisphereLight(0xbfefff,0x030812,2.4));
  const key=new THREE.DirectionalLight(0xffffff,5.5);key.position.set(-4,8,9);scene.add(key);
  const cyanLight=new THREE.PointLight(0x37e1d5,65,22);cyanLight.position.set(-5,1,5);scene.add(cyanLight);
  const amberLight=new THREE.PointLight(0xffa927,48,18);amberLight.position.set(1,-2,5);scene.add(amberLight);
  const root=new THREE.Group();root.position.x=innerWidth<=900?0:-3;scene.add(root);

  const mats={
    cyan:new THREE.MeshPhysicalMaterial({color:0x53d2d0,metalness:.22,roughness:.24,clearcoat:.8,clearcoatRoughness:.16}),
    navy:new THREE.MeshPhysicalMaterial({color:0x123b5a,metalness:.55,roughness:.2,clearcoat:.72}),
    glass:new THREE.MeshPhysicalMaterial({color:0x5cc778,metalness:.04,roughness:.08,transmission:.64,thickness:.7,transparent:true,opacity:.86,side:THREE.DoubleSide}),
    amber:new THREE.MeshPhysicalMaterial({color:0xff9b16,emissive:0xd85200,emissiveIntensity:1.2,metalness:.12,roughness:.2,clearcoat:1}),
    white:new THREE.MeshPhysicalMaterial({color:0xf6ffff,emissive:0xa8ffff,emissiveIntensity:1.6,roughness:.1}),
    line:new THREE.MeshPhysicalMaterial({color:0x73bfc7,metalness:.5,roughness:.25,transparent:true,opacity:.72})
  };
  const S=(x,y,z,rx=0,ry=0,rz=0,sx=1,sy=1,sz=1)=>({p:new THREE.Vector3(x,y,z),r:new THREE.Euler(rx,ry,rz),s:new THREE.Vector3(sx,sy,sz)});
  const parts=[];
  const add=(geometry,material,states)=>{const mesh=new THREE.Mesh(geometry,material);mesh.castShadow=true;mesh.receiveShadow=true;root.add(mesh);parts.push({mesh,states,phase:(parts.length%9)/9});return mesh};
  const box=new THREE.BoxGeometry(1,1,1),orb=new THREE.IcosahedronGeometry(.34,2);

  // Two transparent lenses remain the perceptual centre at every scale.
  add(new THREE.CylinderGeometry(1,1,.16,64),mats.glass,[S(-1.55,0,0,Math.PI/2,0,0,1.45,1,1),S(-1.8,.65,-.4,Math.PI/2,.25,-.08,1.35,1,1),S(-1.2,.35,.2,Math.PI/2,.2,0,1.15,1,1),S(0,0,0,Math.PI/2,0,0,1.5,1,1)]);
  add(new THREE.CylinderGeometry(1,1,.16,64),mats.glass,[S(1.55,0,0,Math.PI/2,0,0,1.45,1,1),S(.2,-.5,.1,Math.PI/2,-.18,.06,1.05,.78,1),S(.95,-.2,-.3,Math.PI/2,-.28,.08,.72,.72,1),S(0,0,.06,Math.PI/2,0,0,.78,.78,1)]);
  add(new THREE.PlaneGeometry(1,1),mats.glass,[S(-1.55,0,-.08,0,0,0,.02,.02,.02),S(-1.35,.35,-.55,0,.28,-.05,3.45,2.35,1),S(-1.1,.2,-.3,0,.2,0,2.2,1.35,1),S(0,0,-.08,0,0,0,.02,.02,.02)]);
  add(new THREE.PlaneGeometry(1,1),mats.glass,[S(1.55,0,-.08,0,0,0,.02,.02,.02),S(1.25,.65,-1.25,0,-.34,.08,2.5,1.65,1),S(.85,.4,-.65,0,-.3,.04,1.65,1.05,1),S(0,0,-.08,0,0,0,.02,.02,.02)]);
  add(new THREE.PlaneGeometry(1,1),mats.glass,[S(0,0,-.15,0,0,0,.02,.02,.02),S(-.25,-.85,.25,0,.08,-.04,2.15,1.15,1),S(1.5,-.55,.1,0,.18,-.08,1.5,.9,1),S(0,0,-.08,0,0,0,.02,.02,.02)]);
  // Lens rims and the cyan shell use continuous curves, not pixel blocks.
  add(new THREE.TorusGeometry(1.48,.105,12,72),mats.navy,[S(-1.55,0,.04,0,0,0,1, .78,1),S(-1.8,.65,-.32,.1,.22,-.08,1,.78,1),S(-1.2,.35,.28,.12,.2,0,.82,.68,1),S(0,0,.1,0,0,0,1.05,.66,1)]);
  add(new THREE.TorusGeometry(1.48,.105,12,72),mats.navy,[S(1.55,0,.04,0,0,0,1,.78,1),S(.2,-.5,.18,-.08,-.18,.06,.78,.6,1),S(.95,-.2,-.2,-.12,-.24,.08,.55,.5,1),S(0,0,.11,0,0,0,.56,.56,1)]);
  add(new THREE.TorusGeometry(3.45,.19,14,96,Math.PI),mats.cyan,[S(0,.12,.1,0,0,0,1,.72,1),S(-.55,1.72,-.25,.18,.12,.06,.76,.64,1),S(0,-1.1,.15,Math.PI/2,0,0,.78,.82,1),S(0,.38,.08,0,0,.04,1,.62,1)]);
  add(new THREE.TorusGeometry(3.45,.12,12,96,Math.PI),mats.navy,[S(0,-.12,.05,0,Math.PI,0,1,.58,1),S(.55,-1.62,-.1,-.18,-.12,-.06,.76,.64,1),S(0,1.1,-.12,Math.PI/2,0,0,.78,.82,1),S(0,-.38,.06,0,Math.PI,.04,1,.62,1)]);

  // Bridge and temples unfold into window rails, then system infrastructure.
  const railStates=[
    [S(0,0,.12,0,0,0,1.15,.12,.12),S(-.8,.05,-.2,0,.25,0,2.2,.08,.08),S(-.2,-1.35,0,0,0,0,3.4,.1,.12),S(-1.8,.45,.02,0,0,-.12,1.7,.12,.12)],
    [S(-3.45,.15,-.4,0,-.35,.08,2.7,.13,.15),S(-2.1,.75,.2,0,.1,Math.PI/2,1.45,.1,.1),S(-2.8,-.55,.1,0,0,Math.PI/2,1.3,.1,.1),S(-1.6,-.55,.02,0,0,-.2,1.4,.1,.1)],
    [S(3.45,.15,-.4,0,.35,-.08,2.7,.13,.15),S(1.6,.85,-.1,0,-.12,Math.PI/2,1.35,.1,.1),S(2.7,-.7,.15,0,0,Math.PI/2,1.2,.1,.1),S(1.65,-.5,.02,0,0,.2,1.4,.1,.1)],
    [S(-4.15,-.2,-.8,0,-.45,.02,2.5,.12,.14),S(1.3,1.5,-.6,0,.18,0,1.6,.08,.08),S(-2.2,.1,-.45,0,.35,.1,1.7,.1,.1),S(1.9,.5,.03,0,0,.15,1.45,.1,.1)],
    [S(4.15,-.2,-.8,0,.45,-.02,2.5,.12,.14),S(1.55,.65,-.3,0,-.16,Math.PI/2,1.4,.08,.08),S(2.15,.25,-.5,0,-.38,-.1,1.7,.1,.1),S(-1.8,.55,.03,0,0,-.15,1.45,.1,.1)]
  ];
  railStates.forEach(states=>add(box,mats.line,states));

  // Four branded compute tiles travel through every transformation.
  const tileAug=[[-.56,-.42,.3],[-.16,-.42,.32],[-.56,-.82,.28],[-.16,-.82,.3]];
  const tileWin=[[-2.85,1.25,.15],[1.4,1.25,-.1],[-.15,-1.3,.3],[2.05,-.95,-.2]];
  const tileSys=[[-2.4,-1.05,.28],[-.75,-1.25,.2],[.9,-1.05,.1],[2.35,-.72,-.18]];
  const tileLogo=[[.75,-.15,.2],[1.18,-.12,.2],[.75,-.55,.2],[1.18,-.52,.2]];
  for(let i=0;i<4;i++)add(box,mats.amber,[S(...tileAug[i],0,0,0,.28,.28,.18),S(...tileWin[i],0,.2,i*.08,.42,.26,.12),S(...tileSys[i],0,i*.25,0,.36,.28,.18),S(...tileLogo[i],0,0,.08,.3,.26,.15)]);

  // Perception nodes become spatial anchors and deployment endpoints.
  for(let i=0;i<7;i++){
    const a=i/7*Math.PI*2;
    add(orb,i===0?mats.white:mats.cyan,[S(Math.cos(a)*2.7,Math.sin(a)*.75,.42),S(-2.3+Math.cos(a)*2.8,.15+Math.sin(a)*1.6,-.2+Math.sin(a)*.35),S(Math.cos(a)*3.15,-.2+Math.sin(a)*1.35,.15+Math.cos(a)*.5),S(i===0?-.45:Math.cos(a)*1.15,i===0?.35:Math.sin(a)*.85,.28,0,0,0,i===0?.65:.2,i===0?.65:.2,i===0?.65:.2)]);
  }

  // The final 3D identity adopts the flat mark's left-cyan / right-amber grammar.
  add(box,mats.cyan,[S(-2.6,-.3,.1,0,0,0,.05,.05,.05),S(-2.2,.75,-.1,0,.2,-.08,.8,.24,.12),S(-2.4,-.55,.1,0,.15,.06,.72,.25,.16),S(-1.55,-.12,.34,0,0,-.08,.82,.22,.15)]);
  add(box,mats.cyan,[S(-2.3,-.7,.1,0,0,0,.05,.05,.05),S(-1.75,-.85,.05,0,-.16,.06,.68,.3,.12),S(-1.8,-1.05,.2,0,.12,-.04,.64,.28,.15),S(-1.42,-.5,.32,0,0,.08,.68,.25,.15)]);
  add(new THREE.CylinderGeometry(1,1,.18,64),mats.navy,[S(0,0,.2,Math.PI/2,0,0,.02,.02,.02),S(0,0,.2,Math.PI/2,0,0,.02,.02,.02),S(0,0,.2,Math.PI/2,0,0,.02,.02,.02),S(0,0,.33,Math.PI/2,0,0,.52,.52,1)]);

  const mix=(a,b,t)=>a+(b-a)*t,smooth=t=>t*t*(3-2*t),smoother=t=>t*t*t*(t*(t*6-15)+10),clamp=t=>Math.max(0,Math.min(1,t));
  let progress=0,active=true;
  const updateScroll=()=>{const r=world.getBoundingClientRect(),travel=Math.max(1,world.offsetHeight-innerHeight);progress=clamp(-r.top/travel);active=r.bottom>0&&r.top<innerHeight};
  const resize=()=>{const w=canvas.clientWidth,h=canvas.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()};
  addEventListener('scroll',updateScroll,{passive:true});addEventListener('resize',resize,{passive:true});updateScroll();resize();
  const clock=new THREE.Clock();
  const render=()=>{
    requestAnimationFrame(render);if(!active)return;resize();const time=clock.getElapsedTime();
    let from=0,to=0,t=0;
    if(progress<.22){from=0;to=0}else if(progress<.38){from=0;to=1;t=(progress-.22)/.16}else if(progress<.5){from=1;to=1}else if(progress<.67){from=1;to=2;t=(progress-.5)/.17}else if(progress<.82){from=2;to=2}else{from=2;to=3;t=(progress-.82)/.18}
    const q=smooth(clamp(t));
    for(const {mesh,states,phase} of parts){const A=states[from],B=states[to],u=from===2&&to===3?smoother(clamp((t-phase*.11)/(1-phase*.11))):q;mesh.position.set(mix(A.p.x,B.p.x,u),mix(A.p.y,B.p.y,u),mix(A.p.z,B.p.z,u));mesh.rotation.set(mix(A.r.x,B.r.x,u),mix(A.r.y,B.r.y,u)+Math.sin(u*Math.PI)*.42,mix(A.r.z,B.r.z,u));mesh.scale.set(mix(A.s.x,B.s.x,u),mix(A.s.y,B.s.y,u),mix(A.s.z,B.s.z,u))}
    const mobile=innerWidth<=900;root.position.x=mobile?0:-3;root.rotation.y=Math.sin(time*.18)*.035+(progress-.5)*.07;root.position.y=Math.sin(time*.32)*.055;
    camera.position.x=(mobile?0:-1.3)+Math.sin(progress*Math.PI)*.65;camera.position.y=.45+Math.sin(progress*Math.PI*2)*.25;camera.position.z=18-Math.sin(progress*Math.PI)*1.2;camera.lookAt(mobile?0:-2.05,0,0);
    cyanLight.position.x=-5+progress*5;amberLight.position.x=2-progress*2;renderer.render(scene,camera);
  };render();
}catch(error){canvas.classList.add('is-unavailable');console.warn('Research world fallback active.',error)}
}
