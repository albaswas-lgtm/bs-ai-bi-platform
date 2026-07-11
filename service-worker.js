const CACHE_NAME='bs-bi-platform-v3-data-import-center';
const CORE_ASSETS=['/','/index.html','/manifest.json','/import-center.js'];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});

function injectEnhancements(html){
  try{
    if(html.includes('id="bsPresentationToolbar"')) return html;
    const addition=`
<style>
#bsSaveModal,#bsInstallModal{position:fixed;inset:0;z-index:9999;display:none;place-items:center;padding:18px;background:rgba(3,5,10,.78);backdrop-filter:blur(10px)}
#bsSaveModal.open,#bsInstallModal.open{display:grid}.bs-save-card,.bs-install-card{width:min(520px,94vw);background:linear-gradient(180deg,#1a1f2e,#0f121c);border:1px solid #3b4358;border-radius:22px;padding:22px;box-shadow:0 30px 90px #000c;color:#f7f2e8}.bs-save-card h3,.bs-install-card h3{margin:0 0 6px;color:#e7c15f;font-size:1.3rem}.bs-save-card p,.bs-install-card p{margin:0 0 16px;color:#b8b4ad;font-size:.87rem;line-height:1.8}.bs-save-options{display:grid;gap:10px}.bs-save-option{width:100%;display:flex;align-items:center;gap:12px;text-align:right;padding:14px;border-radius:15px;border:1px solid #343b50;background:#121724;color:#fff;cursor:pointer}.bs-save-option strong{display:block}.bs-save-option span{display:block;color:#aaa7a1;font-size:.77rem;margin-top:2px}.bs-save-icon{font-size:1.5rem}.bs-save-cancel,.bs-install-close{margin-top:12px;width:100%;padding:11px;border:0;border-radius:12px;background:#272b3d;color:#fff;font-weight:800;cursor:pointer}.bs-install-steps{display:grid;gap:10px;margin-top:12px}.bs-install-step{display:flex;align-items:flex-start;gap:12px;padding:12px;border-radius:14px;background:#111725;border:1px solid #30394e}.bs-install-step b{display:grid;place-items:center;flex:0 0 30px;height:30px;border-radius:50%;background:linear-gradient(145deg,#f3d577,#c99a32);color:#08090e}.bs-install-step span{line-height:1.7;color:#f4f0e7;font-size:.86rem}.bs-install-note{margin-top:12px;padding:10px 12px;border-radius:12px;background:#0c1220;border:1px solid #243453;color:#b9c9ec;font-size:.78rem;line-height:1.7}
#bsToast{position:fixed;z-index:10000;left:50%;bottom:24px;transform:translate(-50%,20px);opacity:0;pointer-events:none;background:#111725;border:1px solid #3a445b;color:#fff;padding:11px 16px;border-radius:13px;box-shadow:0 14px 35px #0009;transition:.25s;font:700 13px Cairo,Arial,sans-serif}#bsToast.show{opacity:1;transform:translate(-50%,0)}
#bsPresentationToolbar{display:none;position:fixed;top:12px;left:50%;transform:translateX(-50%);z-index:9998;gap:8px;align-items:center;padding:8px 10px;border:1px solid #3a4259;border-radius:16px;background:rgba(10,13,21,.95);backdrop-filter:blur(14px);box-shadow:0 16px 45px rgba(0,0,0,.55)}body.presentation #bsPresentationToolbar{display:flex}#bsPresentationToolbar button{border:0;border-radius:11px;padding:9px 13px;font:700 .82rem Cairo,Arial,sans-serif;cursor:pointer;background:#24283a;color:#fff}#bsPresentationToolbar button.primary{background:linear-gradient(145deg,#f3d577,#c99a32);color:#08090e}#bsPresentationToolbar button.danger{background:#8f2c2c;color:#fff}@media(max-width:650px){#bsPresentationToolbar{top:auto;bottom:12px;width:calc(100% - 20px);justify-content:center;flex-wrap:wrap}#bsPresentationToolbar button{flex:1;min-width:120px}}
</style>
<div id="bsPresentationToolbar"><button class="primary" id="bsBackToApp">🏠 التطبيق</button><button id="bsGoDashboard">📊 Dashboard</button><button id="bsSaveFromPresentation">💾 حفظ المشروع</button><button class="danger" id="bsExitPresentation">❌ إنهاء العرض</button></div>
<div id="bsSaveModal"><div class="bs-save-card"><h3>كيف تريد حفظ المشروع؟</h3><p>اختر مكان الحفظ المناسب. لن يتم حفظ أو تنزيل أي شيء قبل اختيارك.</p><div class="bs-save-options"><button class="bs-save-option" id="bsSaveDevice"><span class="bs-save-icon">💾</span><span><strong>حفظ داخل التطبيق على هذا الجهاز</strong><span>يبقى المشروع محفوظًا في هذا المتصفح ويمكن فتحه لاحقًا.</span></span></button><button class="bs-save-option" id="bsSaveFile"><span class="bs-save-icon">📁</span><span><strong>اختيار مكان وحفظ نسخة احتياطية</strong><span>تنزيل ملف المشروع إلى المكان الذي تختاره على الجهاز.</span></span></button></div><button class="bs-save-cancel" id="bsSaveCancel">إلغاء</button></div></div>
<div id="bsInstallModal"><div class="bs-install-card"><h3 id="bsInstallTitle">تثبيت التطبيق</h3><p id="bsInstallIntro">اتبع الخطوات التالية لتثبيت المنصة.</p><div class="bs-install-steps" id="bsInstallSteps"></div><div class="bs-install-note" id="bsInstallNote"></div><button class="bs-install-close" id="bsInstallClose">استمرار</button></div></div>
<div id="bsToast"></div>
<script src="https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js"><\/script>
<script src="/import-center.js"><\/script>
<script>
(function(){
var deferredInstallPrompt=null;
function L(){return window.lang||'ar'}
function toast(m){var t=document.getElementById('bsToast');if(!t)return;t.textContent=m;t.classList.add('show');clearTimeout(window.__bsToast);window.__bsToast=setTimeout(()=>t.classList.remove('show'),2600)}
function open(id){var x=document.getElementById(id);if(x)x.classList.add('open')}
function close(id){var x=document.getElementById(id);if(x)x.classList.remove('open')}
function ios(){return /iphone|ipad|ipod/i.test(navigator.userAgent)}
function standalone(){return matchMedia('(display-mode: standalone)').matches||navigator.standalone===true}
function guide(){var s=document.getElementById('bsInstallSteps'),n=document.getElementById('bsInstallNote'),i=document.getElementById('bsInstallIntro'),b=document.getElementById('bsInstallClose');if(!s||!n||!i||!b)return;b.textContent=L()==='ar'?'استمرار':'Continue';if(standalone()){toast(L()==='ar'?'التطبيق مثبت بالفعل':'The app is already installed');return}if(ios()){i.textContent=L()==='ar'?'اتبع الخطوات التالية لإضافة المنصة إلى الشاشة الرئيسية.':'Follow these steps to add the platform to your Home Screen.';var a=L()==='ar'?['افتح الرابط في Safari مباشرة.','اضغط زر المشاركة ⬆️ في أسفل الشاشة.','اختر «إضافة إلى الشاشة الرئيسية».','اضغط «إضافة» لإتمام التثبيت.']:['Open the link in Safari.','Tap Share ⬆️.','Choose Add to Home Screen.','Tap Add.'];s.innerHTML=a.map((x,j)=>'<div class="bs-install-step"><b>'+(j+1)+'</b><span>'+x+'</span></div>').join('');n.textContent=L()==='ar'?'هذا إجراء خاص بنظام iOS وليس مشكلة في التطبيق.':'This is an iOS requirement, not an app error.'}else{s.innerHTML='<div class="bs-install-step"><b>1</b><span>'+(L()==='ar'?'افتح قائمة المتصفح أو زر المشاركة.':'Open the browser menu or Share button.')+'</span></div><div class="bs-install-step"><b>2</b><span>'+(L()==='ar'?'اختر تثبيت التطبيق أو إضافته إلى الشاشة الرئيسية.':'Choose Install app or Add to Home Screen.')+'</span></div>';n.textContent=L()==='ar'?'قد يختلف اسم الخيار حسب المتصفح.':'The option name may vary by browser.'}open('bsInstallModal')}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstallPrompt=e});
window.addEventListener('DOMContentLoaded',()=>{
window.saveProject=()=>open('bsSaveModal');
window.installApp=async()=>{if(standalone()){toast(L()==='ar'?'التطبيق مثبت بالفعل':'The app is already installed');return}if(deferredInstallPrompt){deferredInstallPrompt.prompt();await deferredInstallPrompt.userChoice;deferredInstallPrompt=null;return}guide()};
var sd=document.getElementById('bsSaveDevice');if(sd)sd.onclick=()=>{localStorage.setItem('bs_bi_project',JSON.stringify(window.project||{}));localStorage.setItem('bs_bi_rows',JSON.stringify(window.rows||[]));close('bsSaveModal');toast(L()==='ar'?'تم حفظ المشروع على هذا الجهاز':'Project saved on this device')};
var sf=document.getElementById('bsSaveFile');if(sf)sf.onclick=()=>{var payload={app:'BS AI Business Intelligence Platform',savedAt:new Date().toISOString(),project:window.project||{},rows:window.rows||[]};var blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='bs-project-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);close('bsSaveModal');toast(L()==='ar'?'تم حفظ النسخة الاحتياطية بنجاح':'Backup saved successfully')};
var c=document.getElementById('bsSaveCancel');if(c)c.onclick=()=>close('bsSaveModal');var ic=document.getElementById('bsInstallClose');if(ic)ic.onclick=()=>close('bsInstallModal');var sp=document.getElementById('bsSaveFromPresentation');if(sp)sp.onclick=()=>open('bsSaveModal');var ba=document.getElementById('bsBackToApp');if(ba)ba.onclick=()=>{document.body.classList.remove('presentation');if(window.openPage)openPage('dataPage')};var gd=document.getElementById('bsGoDashboard');if(gd)gd.onclick=()=>window.openPage&&openPage('homePage');var ex=document.getElementById('bsExitPresentation');if(ex)ex.onclick=()=>{document.body.classList.remove('presentation');if(window.openPage)openPage('homePage')};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){close('bsSaveModal');close('bsInstallModal')}});
});
})();
<\/script>`;
    return html.includes('</body>')?html.replace('</body>',addition+'\n</body>'):html;
  }catch(e){return html}
}

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  const nav=event.request.mode==='navigate'||url.pathname==='/'||url.pathname.endsWith('/index.html');
  if(nav){event.respondWith(fetch(event.request,{cache:'no-store'}).then(async r=>{if(!r||!r.ok)return r;const html=await r.text();return new Response(injectEnhancements(html),{status:r.status,statusText:r.statusText,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store, must-revalidate'}})}).catch(async()=>{const c=await caches.match('/index.html');if(!c)return new Response('Offline',{status:503});return new Response(injectEnhancements(await c.text()),{headers:{'Content-Type':'text/html; charset=utf-8'}})}));return}
  event.respondWith(fetch(event.request).then(r=>{if(r&&r.ok)caches.open(CACHE_NAME).then(c=>c.put(event.request,r.clone()));return r}).catch(()=>caches.match(event.request)));
});