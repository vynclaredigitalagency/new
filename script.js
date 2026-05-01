// ── Fade on scroll ──
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), parseInt(e.target.dataset.delay) || 0);
      obs.unobserve(e.target);
    }
  });
}, { threshold: .1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.hero .fade').forEach((el, i) => { el.dataset.delay = i * 160 + 100; });
document.querySelectorAll('.fade').forEach(el => {
  if (!el.dataset.delay) el.dataset.delay = 0;
  obs.observe(el);
});

// ── Nav scroll ──
const nav = document.getElementById('nav');
if (nav) window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50));

// ── Active nav ──
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
})();

// ── Mobile menu ──
const ham = document.getElementById('ham');
const mob = document.getElementById('mob');
const mobClose = document.getElementById('mobClose');
if (ham && mob) ham.addEventListener('click', () => mob.classList.add('open'));
if (mobClose && mob) mobClose.addEventListener('click', () => mob.classList.remove('open'));
function closeMob() { if (mob) mob.classList.remove('open'); }

// ── Portfolio filter ──
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(c => {
      c.classList.toggle('hidden', f !== 'all' && c.dataset.category !== f);
    });
  });
});

// ── FAQ Accordion ──
document.querySelectorAll('.pw-faq-item').forEach(item => {
  const q = item.querySelector('.pw-faq-q');
  if (q) q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.pw-faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── Contact form — Web3Forms ──
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const originalText = btn.textContent;

    btn.textContent = 'Sending…';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();

      if (result.success) {
        btn.textContent = 'Message Sent ✓';
        btn.style.background = '#3ecf8e';
        btn.style.opacity = '1';
        form.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 5000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      btn.textContent = 'Something went wrong — try again';
      btn.style.background = '#c0392b';
      btn.style.opacity = '1';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    }
  });
}


