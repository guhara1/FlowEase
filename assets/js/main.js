/* 간다GO · 인터랙션 + 설정 적용 */
(function () {
  var cfg = window.GANDAGO_CONFIG || {};

  // 텔레그램 링크 주입 (config에서 한 번에 관리)
  if (cfg.telegram) {
    document.querySelectorAll('[data-tg="build"]').forEach(function (a) {
      a.href = cfg.telegram.build; a.target = "_blank"; a.rel = "noopener";
    });
    document.querySelectorAll('[data-tg="partner"]').forEach(function (a) {
      a.href = cfg.telegram.partner; a.target = "_blank"; a.rel = "noopener";
    });
  }
  // 전화 링크
  if (cfg.phone) {
    document.querySelectorAll('[data-phone]').forEach(function (a) {
      a.href = "tel:" + cfg.phone.replace(/[^0-9]/g, "");
      if (!a.textContent.trim()) a.textContent = cfg.phone;
    });
  }

  // 모바일 내비 토글
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // 현재 연도
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
