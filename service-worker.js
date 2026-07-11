const CACHE_NAME = 'bs-bi-platform-v2-3-presentation-toolbar-fix';
const CORE_ASSETS = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

function injectEnhancements(html) {
  if (html.includes('id="bsPresentationToolbar"')) return html;

  const addition = `
<style>
#bsSaveModal{position:fixed;inset:0;z-index:9999;display:none;place-items:center;padding:18px;background:rgba(3,5,10,.78);backdrop-filter:blur(10px)}
#bsSaveModal.open{display:grid}.bs-save-card{width:min(520px,94vw);background:linear-gradient(180deg,#1a1f2e,#0f121c);border:1px solid #3b4358;border-radius:22px;padding:22px;box-shadow:0 30px 90px #000c;color:#f7f2e8}.bs-save-card h3{margin:0 0 6px;color:#e7c15f;font-size:1.3rem}.bs-save-card p{margin:0 0 16px;color:#b8b4ad;font-size:.87rem;line-height:1.8}.bs-save-options{display:grid;gap:10px}.bs-save-option{width:100%;display:flex;align-items:center;gap:12px;text-align:right;padding:14px;border-radius:15px;border:1px solid #343b50;background:#121724;color:#fff;cursor:pointer;transition:.2s}.bs-save-option:hover{transform:translateY(-1px);border-color:#e7c15f;background:#181e2d}.bs-save-option strong{display:block}.bs-save-option span{display:block;color:#aaa7a1;font-size:.77rem;margin-top:2px}.bs-save-icon{font-size:1.5rem}.bs-save-cancel{margin-top:12px;width:100%;padding:10px;border:0;border-radius:12px;background:#272b3d;color:#fff;font-weight:800;cursor:pointer}
#bsToast{position:fixed;z-index:10000;left:50%;bottom:24px;transform:translate(-50%,20px);opacity:0;pointer-events:none;background:#111725;border:1px solid #3a445b;color:#fff;padding:11px 16px;border-radius:13px;box-shadow:0 14px 35px #0009;transition:.25s;font:700 13px Cairo,Arial,sans-serif}#bsToast.show{opacity:1;transform:translate(-50%,0)}
#bsPresentationToolbar{display:none;position:fixed;top:12px;left:50%;transform:translateX(-50%);z-index:9998;gap:8px;align-items:center;padding:8px 10px;border:1px solid #3a4259;border-radius:16px;background:rgba(10,13,21,.95);backdrop-filter:blur(14px);box-shadow:0 16px 45px rgba(0,0,0,.55)}
body.presentation #bsPresentationToolbar{display:flex}#bsPresentationToolbar button{border:0;border-radius:11px;padding:9px 13px;font:700 .82rem Cairo,Arial,sans-serif;cursor:pointer;background:#24283a;color:#fff}#bsPresentationToolbar button.primary{background:linear-gradient(145deg,#f3d577,#c99a32);color:#08090e}#bsPresentationToolbar button.danger{background:#8f2c2c;color:#fff}@media(max-width:650px){#bsPresentationToolbar{top:auto;bottom:12px;width:calc(100% - 20px);justify-content:center;flex-wrap:wrap}#bsPresentationToolbar button{flex:1;min-width:120px}}
</style>
<div id="bsPresentationToolbar" aria-label="Presentation controls">
  <button class="primary" id="bsBackToApp">🏠 التطبيق</button>
  <button id="bsGoDashboard">📊 Dashboard</button>
  <button id="bsSaveFromPresentation">💾 حفظ المشروع</button>
  <button class="danger" id="bsExitPresentation">❌ إنهاء العرض</button>
</div>
<div id="bsSaveModal" role="dialog" aria-modal="true" aria-labelledby="bsSaveTitle">
  <div class="bs-save-card">
    <h3 id="bsSaveTitle">كيف تريد حفظ المشروع؟</h3>
    <p>اختَر مكان الحفظ المناسب. لن يتم حفظ أو تنزيل أي شيء قبل اختيارك.</p>
    <div class="bs-save-options">
      <button class="bs-save-option" id="bsSaveDevice"><span class="bs-save-icon">💾</span><span><strong>حفظ داخل التطبيق على هذا الجهاز</strong><span>يبقى المشروع محفوظًا في هذا المتصفح ويمكن فتحه لاحقًا.</span></span></button>
      <button class="bs-save-option" id="bsSaveFile"><span class="bs-save-icon">📁</span><span><strong>اختيار مكان وحفظ نسخة احتياطية</strong><span>تنزيل ملف المشروع إلى المكان الذي تختاره على الجهاز.</span></span></button>
    </div>
    <button class="bs-save-cancel" id="bsSaveCancel">إلغاء</button>
  </div>
</div>
<div id="bsToast"></div>
<script>
(function(){
  function showToast(message){var toast=document.getElementById('bsToast');toast.textContent=message;toast.classList.add('show');clearTimeout(window.__bsToastTimer);window.__bsToastTimer=setTimeout(function(){toast.classList.remove('show')},2600)}
  function closeSaveModal(){document.getElementById('bsSaveModal').classList.remove('open')}
  function openSaveModal(){document.getElementById('bsSaveModal').classList.add('open')}
  function projectPayload(){return {app:'BS AI Business Intelligence Platform',version:'2.3',savedAt:new Date().toISOString(),project:project,rows:rows}}
  async function saveBackupFile(){var data=JSON.stringify(projectPayload(),null,2);var safeName=(project.name||'bs-project').replace(/[^a-zA-Z0-9\u0600-\u06FF_-]+/g,'-');var filename=safeName+'-backup.json';try{if(window.showSaveFilePicker){var handle=await window.showSaveFilePicker({suggestedName:filename,types:[{description:'BS Project Backup',accept:{'application/json':['.json']}}]});var writable=await handle.createWritable();await writable.write(data);await writable.close()}else{var blob=new Blob([data],{type:'application/json'});var url=URL.createObjectURL(blob);var a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(function(){URL.revokeObjectURL(url)},1000)}closeSaveModal();showToast(lang==='ar'?'تم حفظ النسخة الاحتياطية بنجاح':'Backup saved successfully')}catch(error){if(error&&error.name!=='AbortError')showToast(lang==='ar'?'تعذر حفظ الملف. حاولي مرة أخرى.':'Could not save the file. Please try again.')}}
  window.addEventListener('DOMContentLoaded',function(){
    saveProject=function(){openSaveModal()};
    document.getElementById('bsSaveDevice').addEventListener('click',function(){localStorage.setItem('bs_bi_project',JSON.stringify(project));localStorage.setItem('bs_bi_rows',JSON.stringify(rows));closeSaveModal();showToast(lang==='ar'?'تم حفظ المشروع على هذا الجهاز':'Project saved on this device')});
    document.getElementById('bsSaveFile').addEventListener('click',saveBackupFile);
    document.getElementById('bsSaveCancel').addEventListener('click',closeSaveModal);
    document.getElementById('bsSaveModal').addEventListener('click',function(e){if(e.target===this)closeSaveModal()});
    document.getElementById('bsSaveFromPresentation').addEventListener('click',openSaveModal);
    document.getElementById('bsBackToApp').addEventListener('click',function(){document.body.classList.remove('presentation');openPage('dataPage')});
    document.getElementById('bsGoDashboard').addEventListener('click',function(){openPage('homePage')});
    document.getElementById('bsExitPresentation').addEventListener('click',function(){document.body.classList.remove('presentation');openPage('homePage')});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeSaveModal();if(document.body.classList.contains('presentation')){document.body.classList.remove('presentation');openPage('homePage')}}});
  });
})();
<\/script>`;

  return html.replace('</body>', addition + '\n</body>');
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const isHtmlNavigation = event.request.mode === 'navigate' || url.pathname === '/' || url.pathname.endsWith('/index.html');

  if (isHtmlNavigation) {
    event.respondWith(
      fetch(event.request, {cache: 'no-store'})
        .then(async response => {
          const html = await response.text();
          return new Response(injectEnhancements(html), {status: response.status,statusText: response.statusText,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}});
        })
        .catch(async () => {
          const cached = await caches.match('/index.html');
          if (!cached) return new Response('Offline', {status: 503});
          return new Response(injectEnhancements(await cached.text()), {headers:{'Content-Type':'text/html; charset=utf-8'}});
        })
    );
    return;
  }

  event.respondWith(fetch(event.request).then(response => {const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match(event.request)));
});