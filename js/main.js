// Advisor details — edit here if anything changes
const WHATSAPP_NUMBER = '919487764817';

// Mobile nav
const burger = document.querySelector('.burger');
const menu = document.querySelector('.nav ul');
if (burger && menu) {
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open'); burger.classList.remove('open');
  }));
}
// Highlight current page in the menu
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav ul a').forEach(a => {
  const href = (a.getAttribute('href') || '').split('#')[0].split('/').pop() || 'index.html';
  if (href === currentPage) a.classList.add('active');
});
// Scroll reveal
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: .12 }) : null;
document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

// Plan filter
const chips = document.querySelectorAll('.chip');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('on'));
  chip.classList.add('on');
  const f = chip.dataset.filter;
  document.querySelectorAll('.plan').forEach(p => {
    const cats = (p.dataset.cat || '').split(' ');
    p.classList.toggle('hide', f !== 'all' && !cats.includes(f));
  });
}));

// Lightbox
const lb = document.querySelector('.lightbox');
if (lb) {
  document.querySelectorAll('.gallery img').forEach(img => img.addEventListener('click', () => {
    lb.querySelector('img').src = img.src; lb.querySelector('img').alt = img.alt; lb.classList.add('open');
  }));
  lb.addEventListener('click', () => lb.classList.remove('open'));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('open'); });
}

// Pause the other video when one plays
const vids = document.querySelectorAll('.vcard video');
vids.forEach(v => v.addEventListener('play', () => vids.forEach(o => { if (o !== v) o.pause(); })));

// Enquiry form -> WhatsApp
const form = document.getElementById('enquiry');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form);
    const msg = `Hello Meera Madam / Krishnan Sir,%0A%0AName: ${encodeURIComponent(d.get('name'))}%0APhone: ${encodeURIComponent(d.get('phone'))}%0AInterested in: ${encodeURIComponent(d.get('plan'))}%0AMessage: ${encodeURIComponent(d.get('message') || '-')}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener');
  });
}

// Testimonial filter
document.querySelectorAll('[data-tfilter]').forEach(chip => chip.addEventListener('click', () => {
  document.querySelectorAll('[data-tfilter]').forEach(c => c.classList.remove('on'));
  chip.classList.add('on');
  const f = chip.dataset.tfilter;
  document.querySelectorAll('.tcard').forEach(c => c.classList.toggle('hide', f !== 'all' && c.dataset.region !== f));
}));

// Floating WhatsApp button: choose between two numbers
const waBtn = document.querySelector('.float .wa');
if (waBtn) {
  const numbers = [['94877 64817', '919487764817'], ['94431 64817', '919443164817']];
  const text = encodeURIComponent('Hello, I would like to know about LIC plans.');
  const menu = document.createElement('div');
  menu.className = 'wa-menu';
  menu.innerHTML = '<p>Chat on WhatsApp</p>' + numbers.map(([label, num]) =>
    `<a href="https://wa.me/${num}?text=${text}" target="_blank" rel="noopener">💬 ${label}</a>`).join('');
  waBtn.parentElement.appendChild(menu);
  waBtn.addEventListener('click', e => { e.preventDefault(); menu.classList.toggle('open'); });
  document.addEventListener('click', e => { if (!e.target.closest('.float')) menu.classList.remove('open'); });
}

