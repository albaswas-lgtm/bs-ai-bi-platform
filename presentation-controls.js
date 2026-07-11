(() => {
  const style = document.createElement('style');
  style.textContent = `
    .presentation-toolbar{display:none;position:fixed;top:12px;left:50%;transform:translateX(-50%);z-index:9999;gap:8px;align-items:center;padding:8px 10px;border:1px solid #3a4259;border-radius:16px;background:rgba(10,13,21,.94);backdrop-filter:blur(14px);box-shadow:0 16px 45px rgba(0,0,0,.55)}
    body.presentation .presentation-toolbar{display:flex}
    .presentation-toolbar button{border:0;border-radius:11px;padding:9px 13px;font:700 .82rem Cairo,Arial,sans-serif;cursor:pointer;background:#24283a;color:#fff}
    .presentation-toolbar button.primary{background:linear-gradient(145deg,#f3d577,#c99a32);color:#08090e}
    .presentation-toolbar button.danger{background:#8f2525}
    body.presentation{padding-top:70px}
    @media(max-width:700px){.presentation-toolbar{top:8px;width:calc(100% - 16px);justify-content:center;flex-wrap:wrap}.presentation-toolbar button{flex:1;min-width:120px}body.presentation{padding-top:118px}}
  `;
  document.head.appendChild(style);

  const bar = document.createElement('div');
  bar.className = 'presentation-toolbar no-print';
  bar.innerHTML = `
    <button id="ptApp">🏠 التطبيق</button>
    <button id="ptDashboard">📊 Dashboard</button>
    <button id="ptSave" class="primary">💾 حفظ المشروع</button>
    <button id="ptExit" class="danger">✕ إنهاء العرض</button>
  `;
  document.body.appendChild(bar);

  function exitPresentation(targetPage) {
    document.body.classList.remove('presentation');
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    if (targetPage && typeof window.openPage === 'function') {
      window.openPage(targetPage);
    }
  }

  document.getElementById('ptApp').addEventListener('click', () => exitPresentation('homePage'));
  document.getElementById('ptDashboard').addEventListener('click', () => {
    if (typeof window.openPage === 'function') window.openPage('homePage');
  });
  document.getElementById('ptSave').addEventListener('click', () => {
    if (typeof window.saveProject === 'function') window.saveProject();
  });
  document.getElementById('ptExit').addEventListener('click', () => exitPresentation());

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && document.body.classList.contains('presentation')) {
      exitPresentation();
    }
  });

  const originalToggle = window.togglePresentation;
  window.togglePresentation = function () {
    if (document.body.classList.contains('presentation')) {
      exitPresentation();
      return;
    }
    if (typeof originalToggle === 'function') originalToggle();
    else document.body.classList.add('presentation');
  };
})();
