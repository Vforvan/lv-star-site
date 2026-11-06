// 主题切换 + 滚动入场 + 年份
(function () {
  'use strict';

  var root = document.documentElement;
  document.documentElement.classList.add('js');

  /* ---- 主题 ---- */
  var toggle = document.getElementById('theme-toggle');
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function apply(theme, persist) {
    root.dataset.theme = theme;
    if (persist) {
      try { localStorage.setItem('theme', theme); } catch (e) {}
    }
    if (toggle) {
      toggle.setAttribute('aria-label', theme === 'dark' ? '切换到浅色主题' : '切换到深色主题');
    }
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      apply(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
    });
  }

  // 用户没手动选过时，跟随系统变化
  media.addEventListener('change', function (e) {
    try {
      if (!localStorage.getItem('theme')) apply(e.matches ? 'dark' : 'light', false);
    } catch (err) {}
  });

  /* ---- 滚动入场 ---- */
  var items = document.querySelectorAll('.reveal');
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
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---- 年份 ---- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
