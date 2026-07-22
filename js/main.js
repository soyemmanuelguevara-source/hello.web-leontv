(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const html = document.documentElement;
  const body = document.body;

  /* ══════════════════════════════════════════════
     LOADER
  ══════════════════════════════════════════════ */
  const loader = document.getElementById('loader');
  const loaderFill = document.querySelector('.loader-bar-fill');

  function startLoader() {
    body.classList.add('no-scroll-load');
    const minTime = reducedMotion ? 300 : 2200;
    let progress = 0;
    let done = false;
    let fakeTimer = null;

    if (loaderFill) {
      fakeTimer = setInterval(() => {
        progress += Math.random() * 12;
        if (progress > 92) progress = 92;
        loaderFill.style.width = progress + '%';
      }, 120);
    }

    function finish() {
      if (done) return;
      done = true;
      clearInterval(fakeTimer);
      if (loaderFill) loaderFill.style.width = '100%';
      setTimeout(() => {
        if (loader) loader.classList.add('loader-exit');
        body.classList.remove('no-scroll-load');
        body.classList.add('loaded');
        setTimeout(() => {
          if (loader) loader.style.display = 'none';
        }, reducedMotion ? 50 : 1200);
      }, 220);
    }

    // Reveal as soon as the DOM is ready + a minimum on-brand display time —
    // never wait on window "load" (fonts/background photos can stall on slow
    // networks and would otherwise leave the loader stuck indefinitely).
    function armMinTime() {
      setTimeout(finish, minTime);
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', armMinTime, { once: true });
    } else {
      armMinTime();
    }

    // Hard safety net in case something above never fires.
    setTimeout(finish, 6000);
  }
  startLoader();

  /* ══════════════════════════════════════════════
     NAVBAR — scrolled state + active link
  ══════════════════════════════════════════════ */
  const navbar = document.getElementById('navbar');
  function onScrollNav() {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
  onScrollNav();
  document.addEventListener('scroll', onScrollNav, { passive: true });

  /* ══════════════════════════════════════════════
     MOBILE MENU
  ══════════════════════════════════════════════ */
  const hamburger = document.getElementById('hamburger');
  const mobMenu = document.getElementById('mob-menu');
  function closeMobMenu() {
    mobMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    body.classList.remove('lock-scroll');
  }
  if (hamburger && mobMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      body.classList.toggle('lock-scroll', isOpen);
    });
    mobMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobMenu));
  }

  /* ══════════════════════════════════════════════
     SMOOTH ANCHOR OFFSET (respect fixed navbar)
  ══════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = window.innerWidth < 860 ? 78 : 96;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
      closeMobMenu();
    });
  });

  /* ══════════════════════════════════════════════
     ACTIVE LINK ON SCROLL
  ══════════════════════════════════════════════ */
  const navLinkEls = document.querySelectorAll('.nav-links a, #mob-menu a');
  const sections = [...navLinkEls]
    .map(a => a.getAttribute('href'))
    .filter(href => href && href.startsWith('#') && href.length > 1)
    .map(href => document.querySelector(href))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = '#' + entry.target.id;
          navLinkEls.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    sections.forEach(s => navObserver.observe(s));
  }

  /* ══════════════════════════════════════════════
     REVEAL ON SCROLL
  ══════════════════════════════════════════════ */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ══════════════════════════════════════════════
     STATS COUNTER
  ══════════════════════════════════════════════ */
  const statNums = document.querySelectorAll('.stat-num');
  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const startTime = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    if (reducedMotion) el.textContent = target + suffix;
    else requestAnimationFrame(tick);
  }
  if ('IntersectionObserver' in window && statNums.length) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    statNums.forEach(el => statObserver.observe(el));
  }

  /* ══════════════════════════════════════════════
     HERO TITLE — one-shot typewriter reveal
  ══════════════════════════════════════════════ */
  const typeEl = document.getElementById('hero-type');
  if (typeEl && !reducedMotion) {
    const full = typeEl.dataset.full || typeEl.textContent;
    let i = 0;
    function typeOnce() {
      typeEl.textContent = full.slice(0, i);
      i++;
      if (i <= full.length) setTimeout(typeOnce, 85);
    }
    setTimeout(() => { typeEl.textContent = ''; typeOnce(); }, 1250);
  }

  /* ══════════════════════════════════════════════
     MARQUEE — populate with real catalog
  ══════════════════════════════════════════════ */
  const marquee = document.getElementById('marquee');
  if (marquee) {
    const items = [
      'Netflix', 'HBO Max', 'Disney+', 'Prime Video', 'Paramount+', 'Apple TV+',
      'ViX+', 'Star+', 'YouTube Premium', 'Spotify', 'Crunchyroll', 'Claro Video',
      'Xbox Game Pass', 'NBA League Pass', 'Viki Rakuten', 'Canva Pro', 'Gaia', 'Bixi', 'ChatGPT Plus',
      'LegazyTV', 'RQTV', 'LAM-TV', 'BudTV Ultra', 'MiTV', 'SoloTV', 'Sky Soccer Plus MX',
      'SuperTV', 'Flix', '1Prime', 'M327', 'PopTV'
    ];
    const buildRow = () => items.map(i => `<span>${i}</span>`).join('');
    marquee.innerHTML = buildRow() + buildRow();
  }

  /* ══════════════════════════════════════════════
     CONTACT FORM → WHATSAPP
  ══════════════════════════════════════════════ */
  const waForm = document.getElementById('wa-form');
  if (waForm) {
    waForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('f-name').value.trim();
      const interest = document.getElementById('f-interest').value;
      const msg = document.getElementById('f-msg').value.trim();

      let text = `Hola, soy ${name || 'un cliente interesado'}.`;
      text += ` Me interesa: ${interest}.`;
      if (msg) text += ` Detalle: ${msg}.`;

      const url = `https://wa.me/528119109538?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  /* ══════════════════════════════════════════════
     FOOTER YEAR
  ══════════════════════════════════════════════ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ══════════════════════════════════════════════
     PARTICLE CANVASES (hero + section accents)
  ══════════════════════════════════════════════ */
  function initParticles(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const count = parseInt(canvas.dataset.particles, 10) || 30;
    let w = 0, h = 0, particles = [], visible = false, raf = null;

    function resize() {
      w = canvas.width = canvas.clientWidth;
      h = canvas.height = canvas.clientHeight;
    }

    function spawn() {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.8 + 0.6,
        speed: Math.random() * 0.35 + 0.08,
        drift: Math.random() * 0.6 - 0.3,
        alpha: Math.random() * 0.5 + 0.15,
        twinkle: Math.random() * Math.PI * 2
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.y -= p.speed;
        p.x += Math.sin(p.twinkle) * 0.15 + p.drift * 0.02;
        p.twinkle += 0.01;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;
        const flicker = (Math.sin(p.twinkle) + 1) / 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${(p.alpha * (0.5 + flicker * 0.5)).toFixed(2)})`;
        ctx.fill();
      });
      if (visible) raf = requestAnimationFrame(draw);
    }

    resize();
    spawn();
    window.addEventListener('resize', () => { resize(); spawn(); });

    if (reducedMotion) {
      draw();
      return;
    }

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          visible = entry.isIntersecting && !document.hidden;
          if (visible && !raf) raf = requestAnimationFrame(draw);
        });
      }, { threshold: 0 });
      obs.observe(canvas);
    } else {
      visible = true;
      raf = requestAnimationFrame(draw);
    }

    document.addEventListener('visibilitychange', () => {
      visible = !document.hidden && visible;
      if (visible && !raf) raf = requestAnimationFrame(draw);
    });
  }

  document.querySelectorAll('#hero-canvas, .section-particles').forEach(initParticles);

})();
