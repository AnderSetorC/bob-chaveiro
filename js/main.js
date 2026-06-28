/* ============================================
   ANDER LEADS IA — Chaveiros
   Main JS · Animações + interações
   ============================================ */

(function () {
  'use strict';

  // ============================================
  // 1. TICKER DINÂMICO (faixa rolante)
  // ============================================
  function initTicker() {
    const track = document.getElementById('tickerTrack');
    if (!track) return;

    const messages = [
      { icon: '🔔', text: '<strong>Carlos</strong> ligou de Marília · há 2 min', type: 'success' },
      { icon: '💬', text: 'WhatsApp · "Vocês atendem agora?" · há 1 min', type: 'success' },
      { icon: '📞', text: '<strong>Antônio</strong> travou a porta · há 4 min', type: 'danger' },
      { icon: '⭐', text: '<strong>Roberto</strong> deixou avaliação 5★ · há 7 min', type: 'accent' },
      { icon: '🔑', text: '<strong>Dona Maria</strong> · cópia de chave · há 9 min', type: 'success' },
      { icon: '💬', text: 'WhatsApp · "Quanto fica abrir porta?" · há 12 min', type: 'success' },
      { icon: '🔔', text: '<strong>Pedro</strong> ligou de Bauru · há 15 min', type: 'success' },
      { icon: '📞', text: '<strong>José</strong> · troca de fechadura · há 18 min', type: 'danger' },
      { icon: '⭐', text: '<strong>Marcos</strong> avaliou com 5★ · há 22 min', type: 'accent' },
      { icon: '💬', text: 'WhatsApp · "Vocês atendem 24h?" · há 25 min', type: 'success' },
      { icon: '🔑', text: '<strong>Lucas</strong> · chave codificada · há 28 min', type: 'success' },
      { icon: '📞', text: '<strong>Sr. Fernando</strong> · emergência residencial · há 32 min', type: 'danger' }
    ];

    const buildItem = (msg) => {
      const span = document.createElement('span');
      span.className = `ticker__item ticker__item--${msg.type}`;
      span.innerHTML = `<span>${msg.icon}</span> ${msg.text}`;
      return span;
    };

    // Renderiza 3 cópias para loop contínuo sem gap
    for (let i = 0; i < 3; i++) {
      messages.forEach((msg) => track.appendChild(buildItem(msg)));
    }
  }

  // ============================================
  // 2. CONTADORES ANIMADOS
  // ============================================
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10) || 0;
    if (el.dataset.counted === 'true') return;
    el.dataset.counted = 'true';

    const duration = 1500;
    const startTime = performance.now();
    const isCurrency = el.closest('.pain-card') !== null;

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(target * eased);
      el.textContent = isCurrency
        ? `R$ ${value.toLocaleString('pt-BR')}`
        : value.toLocaleString('pt-BR');
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = isCurrency
        ? `R$ ${target.toLocaleString('pt-BR')}`
        : target.toLocaleString('pt-BR');
    };
    requestAnimationFrame(tick);
  }

  function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length || !('IntersectionObserver' in window)) {
      counters.forEach(animateCounter);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    counters.forEach((c) => io.observe(c));
  }

  // ============================================
  // 3. REVEAL ON SCROLL
  // ============================================
  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach((i) => i.classList.add('revealed'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    items.forEach((i) => io.observe(i));
  }

  // ============================================
  // 4. CHAT WHATSAPP ANIMADO (loop)
  // ============================================
  function initChatDemo() {
    const chat = document.querySelector('.wa-chat');
    if (!chat) return;

    const msgsIn = chat.querySelectorAll('.wa-chat__msg--in');
    const msgsOut = chat.querySelectorAll('.wa-chat__msg--out');
    const conversion = chat.querySelector('.wa-chat__conversion');
    const allMsgs = [...msgsIn, ...msgsOut];

    const reset = () => {
      allMsgs.forEach((m) => m.classList.remove('visible'));
      if (conversion) conversion.classList.remove('visible');
    };

    const show = (el) => el && el.classList.add('visible');

    const sequence = () => {
      reset();
      // Mensagem 1 (in) em 0.6s
      setTimeout(() => show(msgsIn[0]), 600);
      // Mensagem 2 (in) em 2s
      setTimeout(() => show(msgsIn[1]), 2000);
      // Resposta (out) em 3.6s
      setTimeout(() => show(msgsOut[0]), 3600);
      // Conversão em 5s
      setTimeout(() => show(conversion), 5000);
    };

    sequence();
    // Loop a cada 9s
    setInterval(sequence, 9000);
  }

  // ============================================
  // 5. PINS DO MAPA (delay randômico)
  // ============================================
  function initMapPins() {
    const pins = document.querySelectorAll('.map-mock__pin');
    pins.forEach((pin) => {
      const delay = (Math.random() * 2).toFixed(2);
      pin.style.setProperty('--delay', `${delay}s`);
    });
  }

  // ============================================
  // 6. TELEFONE TOCANDO (loop)
  // ============================================
  function initPhoneRing() {
    const phone = document.querySelector('.ringing-phone');
    if (!phone) return;

    const ring = () => {
      phone.classList.add('ringing');
      // Para de tocar após 3s
      setTimeout(() => phone.classList.remove('ringing'), 3000);
    };

    // Começa tocando após 1s
    setTimeout(ring, 1000);
    // Loop: toca 3s, pausa 5s
    setInterval(() => {
      ring();
    }, 8000);
  }

  // ============================================
  // 7. NAV MOBILE TOGGLE
  // ============================================
  function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const header = document.querySelector('.header__inner');
    if (!toggle || !header) return;

    toggle.addEventListener('click', () => {
      header.classList.toggle('nav-open');
    });

    // Fecha ao clicar em link
    document.querySelectorAll('.nav a').forEach((link) => {
      link.addEventListener('click', () => {
        header.classList.remove('nav-open');
      });
    });
  }

  // ============================================
  // 8. SMOOTH SCROLL COM OFFSET
  // ============================================
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#' || href.length < 2) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 76;
        const urgencyH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--urgency-h')) || 40;
        const top = target.getBoundingClientRect().top + window.pageYOffset - (headerH + urgencyH + 16);
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  // ============================================
  // 9. HEADER STICKY SHADOW
  // ============================================
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    // Cria sentinel antes do header
    const sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none;';
    document.body.prepend(sentinel);

    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            header.classList.remove('header--scrolled');
          } else {
            header.classList.add('header--scrolled');
          }
        });
      },
      { threshold: 0 }
    );
    io.observe(sentinel);
  }

  // ============================================
  // 10. LIVE NOTIFICATIONS (toast)
  // ============================================
  function initLiveToasts() {
    // Cria container
    const toast = document.createElement('div');
    toast.className = 'live-toast';
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);

    const notifications = [
      { icon: '🔔', title: 'Nova ligação!', sub: 'São Paulo · há 1 min' },
      { icon: '💬', title: 'WhatsApp', sub: '"Atendem agora?" · Marília' },
      { icon: '📞', title: 'Lead no Google', sub: 'Bauru · busca "chaveiro 24h"' },
      { icon: '⭐', title: 'Nova avaliação 5★', sub: 'Rogério · Presidente Prudente' },
      { icon: '🔑', title: 'Lead no Meta Ads', sub: 'Campanha "chaveiro perto" · 1 lead' },
      { icon: '💬', title: 'WhatsApp', sub: '"Quanto fica abrir porta?" · SP' }
    ];

    const showToast = (notif) => {
      toast.innerHTML = `
        <div class="live-toast__icon">${notif.icon}</div>
        <div>
          <strong>${notif.title}</strong>
          <span>${notif.sub}</span>
        </div>
      `;
      toast.classList.add('visible');
      setTimeout(() => toast.classList.remove('visible'), 5000);
    };

    // Primeira notificação após 8s
    let idx = 0;
    setTimeout(() => showToast(notifications[0]), 8000);
    // Loop a cada 20-30s
    const loop = () => {
      idx = (idx + 1) % notifications.length;
      showToast(notifications[idx]);
      setTimeout(loop, 20000 + Math.random() * 10000);
    };
    setTimeout(loop, 28000);
  }

  // ============================================
  // 11. META PIXEL — TRACKING DE LEAD NO WHATSAPP
  // ============================================
  function initMetaPixelTracking() {
    // Dispara evento Lead em todos os CTAs que abrem WhatsApp (wa.me)
    const waLinks = document.querySelectorAll('a[href*="wa.me/5514991291256"]');
    waLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (typeof fbq === 'function') {
          fbq('track', 'Lead', {
            content_name: document.title,
            content_category: 'chaveiro'
          });
        }
      });
    });
  }

  // ============================================
  // INIT
  // ============================================
  function init() {
    initTicker();
    initCounters();
    initReveal();
    initChatDemo();
    initMapPins();
    initPhoneRing();
    initMobileNav();
    initSmoothScroll();
    initHeaderScroll();
    initLiveToasts();
    initMetaPixelTracking();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
