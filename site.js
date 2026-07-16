const toggle=document.querySelector('.nav-toggle');
const nav=document.querySelector('.site-nav');
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
