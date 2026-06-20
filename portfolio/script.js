/* ===== TYPING ANIMATION ===== */
const typedEl = document.getElementById('typed');
if (typedEl) {
  const roles = ['Full Stack Developer', 'Python Developer', 'Open Source Contributor'];
  let ri = 0, ci = 0, deleting = false;
  function type() {
    const word = roles[ri];
    typedEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
    if (!deleting && ci > word.length) { deleting = true; setTimeout(type, 1400); return; }
    if (deleting && ci < 0) { deleting = false; ri = (ri + 1) % roles.length; }
    setTimeout(type, deleting ? 55 : 95);
  }
  type();
}

/* ===== MOBILE MENU ===== */
const menuBtn = document.getElementById('menu-btn');
if (menuBtn) {
  const dropdown = document.createElement('div');
  dropdown.className = 'nav-dropdown';
  dropdown.id = 'nav-dropdown';
  ['Home','About','Projects','Skills','Contact'].forEach((label, i) => {
    const hrefs = ['#hero','#about','#projects','#skills','#contact'];
    const a = document.createElement('a');
    a.href = hrefs[i]; a.textContent = label;
    dropdown.appendChild(a);
  });
  document.getElementById('header').appendChild(dropdown);
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    dropdown.classList.toggle('open');
  });
  dropdown.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menuBtn.classList.remove('open');
      dropdown.classList.remove('open');
    });
  });
}

/* ===== ACTIVE NAV ON SCROLL ===== */
const allNavLinks = document.querySelectorAll('.nav-link');
const sections    = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting)
      allNavLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  });
}, { threshold: 0.35 });

sections.forEach(s => navObserver.observe(s));

/* ===== BACK TO TOP ===== */
const topBtn = document.getElementById('top-btn');
if (topBtn) {
  window.addEventListener('scroll', () => topBtn.classList.toggle('show', window.scrollY > 380));
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ===== FADE UP ON SCROLL ===== */
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); fadeObserver.unobserve(e.target); } });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

/* ===== ANIMATED COUNTERS ===== */
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.count').forEach(el => {
      const target = +el.dataset.target, step = Math.ceil(target / 40);
      let n = 0;
      const t = setInterval(() => {
        n = Math.min(n + step, target);
        el.textContent = n + '+';
        if (n >= target) clearInterval(t);
      }, 40);
    });
    countObserver.unobserve(e.target);
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.stats-grid');
if (statsEl) countObserver.observe(statsEl);


/* ===== FORM VALIDATION ===== */
const form = document.getElementById('contact-form');
if (form) {
  function validate(id, msg) {
    const el  = document.getElementById(id);
    const err = document.getElementById(id + '-err');
    const ok  = el.value.trim() !== '' && (id !== 'femail' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value));
    err.textContent      = ok ? '' : msg;
    el.style.borderColor = ok ? '' : '#f87171';
    return ok;
  }
  form.addEventListener('submit', e => {
    e.preventDefault();
    const ok = [
      validate('fname',  'Please enter your name.'),
      validate('femail', 'Please enter a valid email.'),
      validate('fmsg',   'Please enter a message.')
    ].every(Boolean);
    if (ok) {
      form.reset();
      const s = document.getElementById('form-success');
      s.classList.add('show');
      setTimeout(() => s.classList.remove('show'), 4000);
    }
  });
  ['fname','femail','fmsg'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => {
      document.getElementById(id + '-err').textContent = '';
      document.getElementById(id).style.borderColor   = '';
    });
  });
}

/* ===== FOOTER YEAR ===== */
document.getElementById('yr').textContent = new Date().getFullYear();
