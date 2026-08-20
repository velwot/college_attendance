// PWA helper: handles beforeinstallprompt, install button, iOS instructions, and service worker registration
(function(){
  let deferredPrompt = null;
  const installBtnIds = ['installBtn'];
  function $(id){return document.getElementById(id)}

  function showInstallButton(){
    installBtnIds.forEach(id=>{const b=$(id); if(b) b.style.display='inline-flex';});
  }
  function hideInstallButton(){
    installBtnIds.forEach(id=>{const b=$(id); if(b) b.style.display='none';});
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallButton();
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    hideInstallButton();
  });

  document.addEventListener('click', (ev) => {
    const t = ev.target.closest && ev.target.closest('#installBtn');
    if(!t) return;
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') hideInstallButton();
        deferredPrompt = null;
      });
    }
  });

  // iOS detection and instruction show
  function isIos() {
    return /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase());
  }
  function isInStandaloneMode() {
    return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
  }
  function showIosInstallHint(){
    // append small note near header actions if present
    const header = document.querySelector('.header-actions');
    if(!header) return;
    const el = document.createElement('div');
    el.id = 'iosInstallHint';
    el.style.cssText = 'font-size:12px;color:#40506a;padding:8px;border-radius:8px;background:#f4f8ff;border:1px solid #e2ecff;margin-left:8px;max-width:220px';
    el.textContent = 'Tap Share → Add to Home Screen';
    header.appendChild(el);
  }

  if (isIos() && !isInStandaloneMode()) showIosInstallHint();

  // Register service worker at root
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(reg => {
        console.log('Service worker registered.', reg);
      }).catch(err => console.warn('Service worker registration failed:', err));
    });
  }
})();
