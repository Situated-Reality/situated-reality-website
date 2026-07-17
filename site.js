const toggle=document.querySelector('.nav-toggle');
const nav=document.querySelector('.site-nav');
const head=document.querySelector('.site-head');
if(head){
  const themeButton=document.createElement('button');
  themeButton.className='theme-toggle';
  themeButton.type='button';
  let savedTheme=null;try{savedTheme=localStorage.getItem('sir-theme')}catch(error){}
  const setTheme=theme=>{document.documentElement.dataset.theme=theme;themeButton.setAttribute('aria-pressed',String(theme==='dark'));themeButton.setAttribute('aria-label',theme==='dark'?'Switch to light mode':'Switch to dark mode');themeButton.title=theme==='dark'?'Light mode':'Dark mode';themeButton.innerHTML=`<span aria-hidden="true">${theme==='dark'?'☀':'◐'}</span>`};
  setTheme(savedTheme==='dark'?'dark':'light');
  themeButton.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';setTheme(next);try{localStorage.setItem('sir-theme',next)}catch(error){}});
  head.insertBefore(themeButton,toggle||nav);
}
if(toggle&&nav)toggle.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open))});
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('is-visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const breaks=[...document.querySelectorAll('.campus-break')];
  const move=()=>{for(const el of breaks){const r=el.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){const p=(innerHeight-r.top)/(innerHeight+r.height)-.5;el.style.setProperty('--parallax',`${p*70}px`)}}};
  addEventListener('scroll',move,{passive:true});move();
}
const search=document.querySelector('[data-publication-search]');
if(search)search.addEventListener('input',()=>{const q=search.value.toLowerCase().trim();document.querySelectorAll('.pub-list li').forEach(li=>li.hidden=q&&!li.textContent.toLowerCase().includes(q));document.querySelectorAll('.pub-year').forEach(y=>y.hidden=![...y.querySelectorAll('li')].some(li=>!li.hidden))});

const cinematic=document.querySelector('[data-research-cinematic]');
if(cinematic){
  const chapter=document.querySelector('[data-cinematic-progress]');
  const cinematicSections=[...cinematic.querySelectorAll('.research-scroll__section')];
  let ticking=false;
  const clamp=(n,min=0,max=1)=>Math.min(max,Math.max(min,n));
  const updateCinematic=()=>{
    const rect=cinematic.getBoundingClientRect();
    const travel=Math.max(1,cinematic.offsetHeight-innerHeight);
    const p=clamp(-rect.top/travel);
    const local=[clamp(p*3),clamp((p-1/3)*3),clamp((p-2/3)*3)];
    const fades=[clamp(1-local[0]*1.25),clamp(Math.min(local[0]*1.35,1-local[1]*1.25)),clamp(local[1]*1.35)];
    cinematic.style.setProperty('--cinematic-progress',p.toFixed(4));
    cinematic.style.setProperty('--scene-1',fades[0].toFixed(3));
    cinematic.style.setProperty('--scene-2',fades[1].toFixed(3));
    cinematic.style.setProperty('--scene-3',fades[2].toFixed(3));
    local.forEach((value,index)=>cinematic.style.setProperty(`--scene-${index+1}-progress`,value.toFixed(3)));
    if(chapter){
      const active=cinematicSections.reduce((best,section,index)=>{
        const card=section.querySelector('.research-scroll__copy'),r=(card||section).getBoundingClientRect();
        const visible=Math.max(0,Math.min(r.bottom,innerHeight)-Math.max(r.top,74));
        return visible>best.visible?{index,visible}:best;
      },{index:0,visible:-1});
      chapter.textContent=String(active.index+1).padStart(2,'0');
    }
    ticking=false;
  };
  const requestCinematic=()=>{if(!ticking){ticking=true;requestAnimationFrame(updateCinematic)}};
  addEventListener('scroll',requestCinematic,{passive:true});
  addEventListener('resize',requestCinematic,{passive:true});
  updateCinematic();
}
