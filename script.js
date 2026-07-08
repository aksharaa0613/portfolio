/**
 * Aksharaa L Portfolio - Main JavaScript
 * Handles animations, interactions, and UI behavior
 */

'use strict';

/* ============================================
   DOM Ready
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavigation();
  initTypingEffect();
  initParticles();
  initScrollReveal();
  initCounterAnimation();
  initScrollProgress();
  initBackToTop();
  initRippleEffect();
  initContactForm();
  initDemoPlaceholders();
  initParallax();
});

/* ============================================
   Loading Screen
   ============================================ */
function initLoader() {
  const loader = document.getElementById('loader');
  const progress = document.getElementById('loader-progress');
  if (!loader || !progress) return;

  document.body.classList.add('loading');
  let width = 0;

  const interval = setInterval(() => {
    width += Math.random() * 15 + 5;
    if (width >= 100) {
      width = 100;
      clearInterval(interval);
      progress.style.width = '100%';

      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
        loader.setAttribute('aria-hidden', 'true');
      }, 400);
    } else {
      progress.style.width = width + '%';
    }
  }, 100);
}

/* ============================================
   Navigation
   ============================================ */
function initNavigation() {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Sticky header on scroll
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // Smooth scroll & close mobile menu
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }

      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  });

  // Active section highlighting
  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));
}

/* ============================================
   Typing Effect
   ============================================ */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const words = [
    'Cybersecurity Student',
    'Java Backend Developer',
    'SOC Analyst Aspirant'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ============================================
   Particle Background
   ============================================ */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  let mouse = { x: null, y: null };

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    createParticles();
  }

  function createParticles() {
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 80);
    particles = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 229, 255, ${p.opacity})`;
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 229, 255, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Mouse interaction
      if (mouse.x !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.x += dx * force * 0.02;
          p.y += dy * force * 0.02;
        }
      }
    });

    animationId = requestAnimationFrame(drawParticles);
  }

  resize();
  drawParticles();

  window.addEventListener('resize', debounce(resize, 200));

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Pause animation when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      drawParticles();
    }
  });
}

/* ============================================
   Scroll Reveal
   ============================================ */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));
}

/* ============================================
   Counter Animation
   ============================================ */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element) {
  const target = parseFloat(element.dataset.target);
  const isDecimal = element.dataset.decimal === 'true';
  const suffix = element.dataset.suffix || '';
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;

    if (isDecimal) {
      element.textContent = current.toFixed(2);
    } else {
      element.textContent = Math.floor(current) + suffix;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      if (isDecimal) {
        element.textContent = target.toFixed(2);
      } else {
        element.textContent = Math.floor(target) + suffix;
      }
    }
  }

  requestAnimationFrame(update);
}

/* ============================================
   Scroll Progress Bar
   ============================================ */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
        progressBar.setAttribute('aria-valuenow', Math.round(progress));
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ============================================
   Back to Top Button
   ============================================ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
      btn.hidden = false;
    } else {
      btn.classList.remove('visible');
      btn.hidden = true;
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================
   Ripple Effect on Buttons
   ============================================ */
function initRippleEffect() {
  document.querySelectorAll('.ripple').forEach(button => {
    button.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);

      ripple.classList.add('ripple-effect');
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}

/* ============================================
   Contact Form
   ============================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    name: { el: document.getElementById('name'), error: document.getElementById('name-error') },
    email: { el: document.getElementById('email'), error: document.getElementById('email-error') },
    subject: { el: document.getElementById('subject'), error: document.getElementById('subject-error') },
    message: { el: document.getElementById('message'), error: document.getElementById('message-error') }
  };

  const successMsg = document.getElementById('form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Clear previous errors
    Object.values(fields).forEach(({ el, error }) => {
      el.classList.remove('error');
      error.textContent = '';
    });
    if (successMsg) successMsg.hidden = true;

    // Validate name
    if (!fields.name.el.value.trim()) {
      showError(fields.name, 'Name is required');
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fields.email.el.value.trim()) {
      showError(fields.email, 'Email is required');
      isValid = false;
    } else if (!emailRegex.test(fields.email.el.value.trim())) {
      showError(fields.email, 'Please enter a valid email');
      isValid = false;
    }

    // Validate subject
    if (!fields.subject.el.value.trim()) {
      showError(fields.subject, 'Subject is required');
      isValid = false;
    }

    // Validate message
    if (!fields.message.el.value.trim()) {
      showError(fields.message, 'Message is required');
      isValid = false;
    } else if (fields.message.el.value.trim().length < 10) {
      showError(fields.message, 'Message must be at least 10 characters');
      isValid = false;
    }

    if (!isValid) return;

    // Open mailto with form data
    const mailtoLink = `mailto:aksharaa.l2024csecs@sece.ac.in?subject=${encodeURIComponent(fields.subject.el.value)}&body=${encodeURIComponent(
      `Name: ${fields.name.el.value}\nEmail: ${fields.email.el.value}\n\n${fields.message.el.value}`
    )}`;

    window.location.href = mailtoLink;

    if (successMsg) {
      successMsg.hidden = false;
      form.reset();
    }
  });

  function showError(field, message) {
    field.el.classList.add('error');
    field.error.textContent = message;
  }
}

/* ============================================
   Demo Placeholder Handler
   ============================================ */
function initDemoPlaceholders() {
  const demoLinks = document.querySelectorAll('.demo-placeholder');
  if (!demoLinks.length) return;

  let toast = document.querySelector('.demo-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'demo-toast';
    toast.textContent = 'Live demo coming soon!';
    document.body.appendChild(toast);
  }

  demoLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    });
  });
}

/* ============================================
   Parallax Scrolling
   ============================================ */
function initParallax() {
  const heroContent = document.querySelector('.hero-content');
  const floatingIcons = document.querySelectorAll('.float-icon');
  if (!heroContent) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
          heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
          heroContent.style.opacity = 1 - scrolled / (window.innerHeight * 0.8);

          floatingIcons.forEach((icon, i) => {
            const speed = 0.1 + i * 0.05;
            icon.style.transform = `translateY(${scrolled * speed}px)`;
          });
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ============================================
   Utility: Debounce
   ============================================ */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
