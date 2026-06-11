/* script.js - Vanilla JS for interactions & hero animation */

/* --------------------------------------------------- */
/* Loading overlay – hide when page is ready */
window.addEventListener('load', () => {
  const loading = document.getElementById('loading');
  loading.classList.add('hidden');
});

/* --------------------------------------------------- */
/* Mobile navigation toggle */
const navToggle = document.querySelector('.nav-toggle');
const navMenu   = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

/* --------------------------------------------------- */
/* Scroll‑spy – highlight active menu item */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3, // 30% of section visible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      if (link) link.classList.add('active');
    }
  });
}, observerOptions);

sections.forEach(sec => observer.observe(sec));

/* --------------------------------------------------- */
/* Hero background particle animation (lightweight) */
const canvas = document.getElementById('hero-bg');
if (canvas && canvas.getContext) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  const numParticles = 80;
  const maxSpeed = 0.5;
  const radius = 2;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * maxSpeed,
        vy: (Math.random() - 0.5) * maxSpeed,
        size: radius + Math.random(),
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0,255,255,0.6)'; // neon cyan

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      // move
      p.x += p.vx;
      p.y += p.vy;

      // bounce off edges
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

  // init
  resizeCanvas();
  initParticles();
  draw();
}

/* --------------------------------------------------- */
/* Optional: smooth scroll for older browsers (fallback) */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      // close mobile menu after click
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
      }
    }
  });
});
