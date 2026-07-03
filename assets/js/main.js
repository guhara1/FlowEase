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
    var telHref = "tel:" + cfg.phone.replace(/[^0-9]/g, "");
    document.querySelectorAll('[data-phone]').forEach(function (a) {
      a.href = telHref;
      if (!a.textContent.trim()) a.textContent = cfg.phone;
    });

    // 모바일 플로팅 전화 버튼 (전 페이지 자동 노출) — 탭 시 전화 연결
    if (!document.querySelector('.call-fab')) {
      var fab = document.createElement('a');
      fab.className = 'call-fab';
      fab.href = telHref;
      fab.setAttribute('aria-label', '전화 예약 ' + cfg.phone);
      fab.innerHTML =
        '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
        '<path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.07 21 3 13.93 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>' +
        '</svg><span class="call-fab__ring" aria-hidden="true"></span>';
      document.body.appendChild(fab);
    }
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
