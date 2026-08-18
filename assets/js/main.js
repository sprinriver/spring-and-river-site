/* Spring & River — site behaviour: mobile nav, scroll reveal, form handling */
(function () {
  'use strict';

  /* ---- mobile navigation ---- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ---- theme toggle ---- */
  var themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    var setLabel = function () {
      var light = document.documentElement.getAttribute('data-theme') === 'light';
      themeBtn.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    };
    setLabel();
    themeBtn.addEventListener('click', function () {
      var root = document.documentElement;
      var toLight = root.getAttribute('data-theme') !== 'light';
      if (toLight) { root.setAttribute('data-theme', 'light'); }
      else { root.removeAttribute('data-theme'); }
      try { localStorage.setItem('theme', toLight ? 'light' : 'dark'); } catch (e) {}
      setLabel();
    });
  }

  /* ---- reveal on scroll ---- */
  var items = document.querySelectorAll('.reveal');
  if (items.length) {
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0, rootMargin: '0px 0px 250px 0px' });
      items.forEach(function (el) { io.observe(el); });

      /* Safety sweep: IntersectionObserver callbacks can lag behind very
         fast scrolling (scrollbar drags, keyboard End). Sweep any unrevealed
         element that is already on screen, at most every 300ms. */
      var sweeping = false;
      var sweep = function () {
        if (sweeping) { return; }
        sweeping = true;
        setTimeout(function () {
          sweeping = false;
          document.querySelectorAll('.reveal:not(.is-visible)').forEach(function (el) {
            var r = el.getBoundingClientRect();
            if (r.top < window.innerHeight + 250 && r.bottom > 0) { el.classList.add('is-visible'); }
          });
        }, 300);
      };
      window.addEventListener('scroll', sweep, { passive: true });
      window.addEventListener('load', sweep);
    }
  }

  /* ---- count-up stats ----
     Numerals like "6" or "30+" tick up when they scroll into view. The final
     text is set from the markup itself, so a failure anywhere leaves the
     correct value in place. */
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var stats = document.querySelectorAll('.hero__stat b, .stat-strip b');
  if (stats.length && !reduced && 'IntersectionObserver' in window) {
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        sio.unobserve(entry.target);
        var final = entry.target.textContent;
        var m = final.match(/^(\d+)(.*)$/);
        if (!m) { return; }
        var n = parseInt(m[1], 10), suffix = m[2], t0 = null;
        var dur = 900;
        var tick = function (t) {
          if (!t0) { t0 = t; }
          var k = Math.min((t - t0) / dur, 1);
          k = 1 - Math.pow(1 - k, 3); /* ease-out cubic */
          entry.target.textContent = Math.round(n * k) + suffix;
          if (k < 1) { requestAnimationFrame(tick); } else { entry.target.textContent = final; }
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    stats.forEach(function (el) { sio.observe(el); });
  }

  /* ---- current year in footer ---- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---- contact form: hand off to the user's mail client ----
     The site is served as static files on GitHub Pages, so there is no
     backend to post to. Composing a mailto: keeps the form useful without
     introducing a third-party form service. */
  var form = document.querySelector('[data-mailto-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var get = function (n) {
        var f = form.elements[n];
        return f ? String(f.value).trim() : '';
      };
      var subject = 'Website enquiry — ' + (get('interest') || 'General') +
                    (get('company') ? ' — ' + get('company') : '');
      var body = [
        'Name: ' + get('name'),
        'Company: ' + get('company'),
        'Email: ' + get('email'),
        'Area of interest: ' + get('interest'),
        '',
        get('message')
      ].join('\n');
      window.location.href = 'mailto:info@springandriver.com' +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
    });
  }
})();
