/* ═══════════════════════════════════════════════
   PRINTAARA LANDING PAGE – SCRIPT.JS
   Micro-interactions, scroll animations, navbar
═══════════════════════════════════════════════ */

// ─── NAVBAR SCROLL EFFECT ───────────────────────
const navbar = document.getElementById('navbar');

const handleNavScroll = () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll(); // run once on load

// ─── HAMBURGER MENU ─────────────────────────────
const hamburger  = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const isOpen = mobileMenu.classList.contains('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ─── INTERSECTION OBSERVER (FADE-UP ANIMATION) ──
const fadeUpElements = document.querySelectorAll('.fade-up, .product-card, .step-card, .feature-card, .testimonial-card, .trust-badge');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on sibling index
        const siblings = Array.from(entry.target.parentElement?.children || []);
        const index = siblings.indexOf(entry.target);
        const delay = index * 80;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

fadeUpElements.forEach(el => {
  // Add base styles for animation
  if (!el.classList.contains('fade-up')) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  }
  observer.observe(el);
});

// Observe non-fade-up elements too
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const siblings = Array.from(el.parentElement?.children || []);
        const idx = siblings.indexOf(el);
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, idx * 80);
        revealObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
);

document.querySelectorAll('.product-card, .step-card, .feature-card, .testimonial-card, .trust-badge').forEach(el => {
  if (!el.classList.contains('fade-up')) {
    revealObserver.observe(el);
  }
});

// ─── SMOOTH ACTIVE NAV LINK ──────────────────────
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--white)' : '';
        });
      }
    });
  },
  { threshold: 0.5 }
);
sections.forEach(s => sectionObserver.observe(s));

// ─── PRODUCT CARD GLOW ON MOUSE MOVE ─────────────
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  });
});

// ─── CTA BUTTON RIPPLE EFFECT ────────────────────
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect   = this.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    const x      = e.clientX - rect.left - size / 2;
    const y      = e.clientY - rect.top  - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255,255,255,0.15);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.5s linear;
      pointer-events: none;
    `;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple keyframe dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to { transform: scale(4); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ─── COUNTER ANIMATION FOR HERO STATS ────────────
const animateCounter = (el, target, suffix = '') => {
  let start = 0;
  const duration = 1800;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(ease * target);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const statsSection = document.getElementById('hero-stats');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !statsAnimated) {
    statsAnimated = true;
    const statNums = document.querySelectorAll('.stat-num');
    // 5K+, 98%, 72hr
    animateCounter(statNums[0], 5, 'K+');
    animateCounter(statNums[1], 98, '%');
    animateCounter(statNums[2], 72, 'hr');
  }
}, { threshold: 0.5 });

if (statsSection) statsObserver.observe(statsSection);

// ─── PARALLAX ON HERO IMAGE ──────────────────────
const heroImg = document.querySelector('.hero-img');
window.addEventListener('scroll', () => {
  if (!heroImg) return;
  const scrollY = window.scrollY;
  heroImg.style.transform = `scale(1.05) translateY(${scrollY * 0.15}px)`;
}, { passive: true });

// ─── TYPING EFFECT FOR HERO BADGE ────────────────
const heroHeadline = document.getElementById('hero-badge');
if (heroHeadline) {
  setTimeout(() => {
    heroHeadline.style.opacity = '1';
    heroHeadline.style.transform = 'translateY(0)';
  }, 200);
}

// ─── MAGNETIC BUTTONS EFFECT ─────────────────────
document.querySelectorAll('.btn-primary.btn-xl, .btn-primary.btn-lg').forEach(btn => {
  btn.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width  / 2) * 0.2;
    const y = (e.clientY - rect.top  - rect.height / 2) * 0.2;
    this.style.transform = `translate(${x}px, ${y}px) translateY(-2px)`;
  });
  btn.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// ─── NAVBAR ACTIVE STATE ─────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

console.log('%c Printaara Landing Page Loaded 🚀', 'color: #7B2EFF; font-size: 16px; font-weight: bold;');
