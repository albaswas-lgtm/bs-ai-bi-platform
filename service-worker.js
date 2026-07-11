const CACHE_NAME = 'bs-bi-platform-v2-3-install-guide-fix';
const CORE_ASSETS = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

function injectEnhancements(html) {
  try {
    if (html.includes('id="bsPresentationToolbar"')) return html;

    const addition = `
<style>
#bsSaveModal,#bsInstallModal{position:fixed;inset:0;z-index:9999;display:none;place-items:center;padding:18px;background:rgba(3,5,10,.78);backdrop-filter:blur(10px)}
#bsSaveModal.open,#bsInstallModal.open{display:grid}.bs-save-card,.bs-install-card{width:min(520px,94vw);background:linear-gradient(180deg,#1a1f2e,#0f121c);border:1px solid #3b4358;border-radius:22px;padding:22px;box-shadow:0 30px 90px #000c;color:#f7f2e8}.bs-save-card h3,.bs-install-card h3{margin:0 0 6px;color:#e7c15f;font-size:1.3rem}.bs-save-card p,.bs-install-card p{margin:0 0 16px;color:#b8b4ad;font-size:.87rem;line-height:1.8}.bs-save-options{display:grid;gap:10px}.bs-save-option{width:100%;display:flex;align-items:center;gap:12px;text-align:right;padding:14px;border-radius:15px;border:1px solid #343b50;background:#121724;color:#fff;cursor:pointer;transition:.2s}.bs-save-option:hover{transform:translateY(-1px);border-color:#e7c15f;background:#181e2d}.bs-save-option strong{display:block}.bs-save-option span{display:block;color:#aaa7a1;font-size:.77rem;margin-top:2px}.bs-save-icon{font-size:1.5rem}.bs-save-cancel,.bs-install-close{margin-top:12px;width:100%;padding:11px;border:0;border-radius:12px;background:#272b3d;color:#fff;font-weight:800;cursor:pointer}
.bs-install-steps{display:grid;gap:10px;margin-top:12px}.bs-install-step{display:flex;align-items:flex-start;gap:12px;padding:12px;border-radius:14px;background:#111725;border:1px solid #30394e}.bs-install-step b{display:grid;place-items:center;flex:0 0 30px;height:30px;border-radius:50%;background:linear-gradient(145deg,#f3d577,#c99a32);color:#08090e}.bs-install-step span{line-height:1.7;color:#f4f0e7;font-size:.86rem}.bs-install-note{margin-top:12px;padding:10px 12px;border-radius:12px;background:#0c1220;border:1px solid #243453;color:#b9c9ec;font-size:.78rem;line-height:1.7}
#bsToast{position:fixed;z-index:10000;left:50%;bottom:24px;transform:translate(-50%,20px);opacity:0;pointer-events:none;background:#111725;border:1px solid #3a445b;color:#fff;padding:11px 16px;border-radius:13px;box-shadow:0 14px 35px #0009;transition:.25s;font:700 13px Cairo,Arial,sans-serif}#bsToast.show{opacity:1;transform:translate(-50%,0)}
#bsPresentationToolbar{display:none;position:fixed;top:12px;left:50%;transform:translateX(-50%);z-index:9998;gap:8px;align-items:center;padding:8px 10px;border:1px solid #3a4259;border-radius:16px;background:rgba(10,13,21,.95);backdrop-filter:blur(14px);box-shadow:0 16px 45px rgba(0,0,0,.55)}
body.presentation #bsPresentationToolbar{display:flex}#bsPresentationToolbar button{border:0;border-radius:11px;padding:9px 13px;font:700 .82rem Cairo,Arial,sans-serif;cursor:pointer;background:#24283a;color:#fff}#bsPresentationToolbar button.primary{background:linear-gradient(145deg,#f3d577,#c99a32);color:#08090e}#bsPresentationToolbar button.danger{background:#8f2c2c;color:#fff}@media(max-width:650px){#bsPresentationToolbar{top:auto;bottom:12px;width:calc(100% - 20px);justify-content:center;flex-wrap:wrap}#bsPresentationToolbar button{flex:1;min-width:120px}.bs-install-card{padding:18px}}
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
<div id="bsInstallModal" role="dialog" aria-modal="true" aria-labelledby="bsInstallTitle">
  <div class="bs-install-card">
    <h3 id="bsInstallTitle">تثبيت التطبيق</h3>
    <p id="bsInstallIntro">اتّبعي الخطوات التالية لتثبيت المنصة.</p>
    <div class="bs-install-steps" id="bsInstallSteps"></div>
    <div class="bs-install-note" id="bsInstallNote"></div>
    <button class="bs-install-close" id="bsInstallClose">فهمت</button>
  </div>
</div>
<div id="bsToast"></div>
<script>
(function(){
  var deferredInstallPrompt=null;
  function currentLang(){return window.lang||'ar'}
  function showToast(message){var toast=document.getElementById('bsToast');if(!toast)return;toast.textContent=message;toast.classList.add('show');clearTimeout(window.__bsToastTimer);window.__bsToastTimer=setTimeout(function(){toast.classList.remove('show')},2600)}
  function closeSaveModal(){var modal=document.getElementById('bsSaveModal');if(modal)modal.classList.remove('open')}
  function openSaveModal(){var modal=document.getElementById('bsSaveModal');if(modal)modal.classList.add('open')}
  function closeInstallModal(){var modal=document.getElementById('bsInstallModal');if(modal)modal.classList.remove('open')}
  function isIOS(){return /iphone|ipad|ipod/i.test(navigator.userAgent)}
  function isStandalone(){return window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true}
  function isInAppBrowser(){return /FBAN|FBAV|Instagram|Line|WhatsApp/i.test(navigator.userAgent)}
  function renderInstallGuide(){
    var steps=document.getElementById('bsInstallSteps'),note=document.getElementById('bsInstallNote'),title=document.getElementById('bsInstallTitle'),intro=document.getElementById('bsInstallIntro');
    if(!steps||!note||!title||!intro)return;
    if(isStandalone()){closeInstallModal();showToast(currentLang()==='ar'?'التطبيق مثبت بالفعل':'The app is already installed');return}
    if(isIOS()){
      title.textContent=currentLang()==='ar'?'تثبيت التطبيق على iPhone':'Install on iPhone';
      intro.textContent=currentLang()==='ar'?'اتّبعي الخطوات التالية لإضافة المنصة إلى الشاشة الرئيسية.':'Follow these steps to add the platform to your Home Screen.';
      var list=currentLang()==='ar'?['افتحي الرابط في Safari مباشرة.','اضغطي زر المشاركة ⬆️ في أسفل الشاشة.','اختاري «إضافة إلى الشاشة الرئيسية».','اضغطي «إضافة» لإتمام التثبيت.']:['Open the link directly in Safari.','Tap the Share button ⬆️ at the bottom.','Choose “Add to Home Screen”.','Tap “Add” to finish.'];
      steps.innerHTML=list.map(function(s,i){return '<div class="bs-install-step"><b>'+(i+1)+'</b><span>'+s+'</span></div>'}).join('');
      note.textContent=currentLang()==='ar'?'على iPhone لا يستطيع الموقع فتح نافذة التثبيت تلقائيًا؛ هذه قيود من نظام iOS وليست مشكلة في التطبيق.':'On iPhone, websites cannot open the install prompt automatically. This is an iOS limitation, not an app error.';
    }else{
      title.textContent=currentLang()==='ar'?'تثبيت التطبيق':'Install the app';
      intro.textContent=currentLang()==='ar'?'افتحي قائمة المتصفح ثم اختاري تثبيت التطبيق أو إضافته إلى الشاشة الرئيسية.':'Open the browser menu and choose Install app or Add to Home Screen.';
      steps.innerHTML='<div class="bs-install-step"><b>1</b><span>'+(currentLang()==='ar'?'افتحي قائمة المتصفح ⋮ أو زر المشاركة.':'Open the browser menu ⋮ or Share button.')+'</span></div><div class="bs-install-step"><b>2</b><span>'+(currentLang()==='ar'?'اختاري «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».':'Choose “Install app” or “Add to Home Screen”.')+'</span></div>';
      note.textContent=isInAppBrowser()?(currentLang()==='ar'?'يفضل فتح الرابط في Safari أو Chrome بدل المتصفح الداخلي في تطبيقات المحادثة.':'Open the link in Safari or Chrome instead of an in-app browser.'):(currentLang()==='ar'?'قد يختلف اسم الخيار قليلًا حسب المتصفح.':'The option name may vary slightly by browser.');
    }
    document.getElementById('bsInstallModal').classList.add('open');
  }
  function projectPayload(){return {app:'BS AI Business Intelligence Platform',version:'2.3',savedAt:new Date().toISOString(),project:window.project||project,rows:window.rows||rows}}
  async function saveBackupFile(){var data=JSON.stringify(projectPayload(),null,2);var name=((window.project||project).name||'bs-project').replace(/[^a-zA-Z0-9\u0600-\u06FF_-]+/g,'-');var filename=name+'-backup.json';try{if(window.showSaveFilePicker){var handle=await window.showSaveFilePicker({suggestedName:filename,types:[{description:'BS Project Backup',accept:{'application/json':['.json']}}]});var writable=await handle.createWritable();await writable.write(data);await writable.close()}else{var blob=new Blob([data],{type:'application/json'});var url=URL.createObjectURL(blob);var a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url)},1000)}closeSaveModal();showToast(currentLang()==='ar'?'تم حفظ النسخة الاحتياطية بنجاح':'Backup saved successfully')}catch(error){if(error&&error.name!=='AbortError')showToast(currentLang()==='ar'?'تعذر حفظ الملف. حاولي مرة أخرى.':'Could not save the file. Please try again.')}}
  window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();deferredInstallPrompt=e});
  window.addEventListener('DOMContentLoaded',function(){
    window.saveProject=function(){openSaveModal()};
    window.installApp=async function(){
      if(isStandalone()){showToast(currentLang()==='ar'?'التطبيق مثبت بالفعل':'The app is already installed');return}
      if(deferredInstallPrompt){deferredInstallPrompt.prompt();await deferredInstallPrompt.userChoice;deferredInstallPrompt=null;return}
      renderInstallGuide();
    };
    var saveDevice=document.getElementById('bsSaveDevice');if(saveDevice)saveDevice.addEventListener('click',function(){localStorage.setItem('bs_bi_project',JSON.stringify(window.project||project));localStorage.setItem('bs_bi_rows',JSON.stringify(window.rows||rows));closeSaveModal();showToast(currentLang()==='ar'?'تم حفظ المشروع على هذا الجهاز':'Project saved on this device')});
    var saveFile=document.getElementById('bsSaveFile');if(saveFile)saveFile.addEventListener('click',saveBackupFile);
    var cancel=document.getElementById('bsSaveCancel');if(cancel)cancel.addEventListener('click',closeSaveModal);
    var modal=document.getElementById('bsSaveModal');if(modal)modal.addEventListener('click',function(e){if(e.target===this)closeSaveModal()});
    var installClose=document.getElementById('bsInstallClose');if(installClose)installClose.addEventListener('click',closeInstallModal);
    var installModal=document.getElementById('bsInstallModal');if(installModal)installModal.addEventListener('click',function(e){if(e.target===this)closeInstallModal()});
    var savePresentation=document.getElementById('bsSaveFromPresentation');if(savePresentation)savePresentation.addEventListener('click',openSaveModal);
    var back=document.getElementById('bsBackToApp');if(back)back.addEventListener('click',function(){document.body.classList.remove('presentation');if(window.openPage)openPage('dataPage')});
    var dashboard=document.getElementById('bsGoDashboard');if(dashboard)dashboard.addEventListener('click',function(){if(window.openPage)openPage('homePage')});
    var exit=document.getElementById('bsExitPresentation');if(exit)exit.addEventListener('click',function(){document.body.classList.remove('presentation');if(window.openPage)openPage('homePage')});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeSaveModal();closeInstallModal();if(document.body.classList.contains('presentation')){document.body.classList.remove('presentation');if(window.openPage)openPage('homePage')}}});
  });
})();
<\/script>`;

    return html.includes('</body>') ? html.replace('</body>', addition + '\n</body>') : html;
  } catch (error) {
    return html;
  }
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const isNavigation = event.request.mode === 'navigate' || url.pathname === '/' || url.pathname.endsWith('/index.html');

  if (isNavigation) {
    event.respondWith(
      fetch(event.request, {cache: 'no-store'})
        .then(async response => {
          if (!response || !response.ok) return response;
          const html = await response.text();
          const enhanced = injectEnhancements(html);
          return new Response(enhanced, {
            status: response.status,
            statusText: response.statusText,
            headers: {
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'no-store, must-revalidate'
            }
          });
        })
        .catch(async () => {
          const cached = await caches.match('/index.html');
          if (!cached) return new Response('<!doctype html><html><body style="background:#08090e;color:white;font-family:Arial;padding:30px"><h2>BS AI Platform</h2><p>Please reconnect and refresh the page.</p></body></html>', {status:503,headers:{'Content-Type':'text/html; charset=utf-8'}});
          const html = await cached.text();
          return new Response(injectEnhancements(html), {headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}});
        })
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
