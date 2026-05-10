/* ── LOADER ─────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('done'), 1700);
});

/* ── CURSOR ─────────────────────────────── */
const cursor = document.getElementById('cursor');
const curDot  = cursor.querySelector('.cur-dot');
const curRing = cursor.querySelector('.cur-ring');
let mx = -100, my = -100;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  curDot.style.left = mx + 'px';
  curDot.style.top  = my + 'px';
});

document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));

(function animCursor() {
  let rx = parseFloat(curRing.style.left) || mx;
  let ry = parseFloat(curRing.style.top)  || my;
  rx += (mx - rx) * .12;
  ry += (my - ry) * .12;
  curRing.style.left = rx + 'px';
  curRing.style.top  = ry + 'px';
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a, button, .skill-tag, .project-card, .exp-card, .skill-cat-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ── PARTICLES ──────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * 1920, y: Math.random() * 4000,
    r: Math.random() * 1.1 + .25,
    vx: (Math.random() - .5) * .16, vy: (Math.random() - .5) * .1,
    a: Math.random() * .4 + .1,
  }));

  (function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x % W, p.y % H, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${p.a * .6})`;
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
    });
    requestAnimationFrame(draw);
  })();
})();

/* ── NAV SCROLL ─────────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', scrollY > 60);
}, { passive: true });

/* ── MOBILE NAV ─────────────────────────── */
function toggleMobileNav() {
  document.getElementById('mobileNav').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}
function closeMobileNav() {
  document.getElementById('mobileNav').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

/* ── TYPED EFFECT ───────────────────────── */
const words = ['experiences.', 'solutions.', 'the future.', 'with purpose.', 'that inspire.'];
let wi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const word = words[wi];
  if (!deleting) {
    typedEl.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
  }
  setTimeout(type, deleting ? 60 : 95);
}
setTimeout(type, 800);

/* ── SCROLL REVEAL ──────────────────────── */
const revealEls = document.querySelectorAll('.reveal, .reveal-l, .reveal-r');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  });
}, { threshold: .12 });
revealEls.forEach(el => revealObs.observe(el));

/* ── SKILL BARS ─────────────────────────── */
const barsObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const w = bar.getAttribute('data-width');
        setTimeout(() => { bar.style.width = w + '%'; }, 300);
      });
      barsObs.disconnect();
    }
  });
}, { threshold: .2 });
const barsSection = document.getElementById('skillBars');
if (barsSection) barsObs.observe(barsSection);

/* ── FORM ───────────────────────────────── */
function handleFormSubmit(e) {
  e.preventDefault();
  showToast('✦', "Message sent! I'll get back to you soon.");
  e.target.reset();
}

function showToast(icon, msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  toast.querySelector('.toast-icon').textContent = icon;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ── SMOOTH SCROLL ──────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── PARALLAX ambient on mouse ──────────── */
document.addEventListener('mousemove', e => {
  const xf = (e.clientX / innerWidth  - .5) * 15;
  const yf = (e.clientY / innerHeight - .5) * 15;
  const bg = document.querySelector('.hero-bg');
  if (bg) bg.style.transform = `translate(${xf * .3}px, ${yf * .3}px)`;
});