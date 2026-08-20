# DIV-O Attendance — Google Drive backed attendance tracker

DIV-O Attendance is a lightweight, static web app for marking and tracking college attendance. It stores marks in the browser and offers optional automatic backups to Google Drive (appdata). The site is PWA-enabled so it can be installed to phones and desktops.

**Quick links**
- **Dashboard:** `index.html`
- **Insights:** `insights.html`
- **Save & Backup:** `save.html`
- **Manifest:** [manifest.json](manifest.json)
- **Service worker:** [service-worker.js](service-worker.js)

**Features**
- Lightweight static site (no build system). Deploy the repository root to any static host (Netlify recommended).
- Local persistence via `localStorage` for offline-first usage.
- Optional Google Drive backup using Google Identity Services and the `drive.appdata` scope.
- Progressive Web App (PWA) support: `manifest.json`, installable, offline app shell caching.
- Monthly insights view and per-subject breakdowns.

**Local testing**
1. Serve the project locally (required for service worker). From the project root run:

```bash
python3 -m http.server 8000
```

2. Open `http://localhost:8000` in Chrome/Edge/Firefox.
3. Use DevTools → Application to inspect the Manifest and Service Worker registrations.
4. Mark some attendance in the Dashboard and open `insights.html` to verify monthly summaries and the breakdown table.

**Netlify deployment**
- The project is ready to publish as a static site. Netlify will serve files from the repository root (see `netlify.toml`).
- Once deployed on HTTPS, the service worker and PWA install flow work on supported browsers.

**Google Drive backup configuration**
- Open `index.html` and confirm the value of `GOOGLE_CLIENT_ID` near the top. Replace the placeholder with your OAuth Web Client ID if necessary.
- In Google Cloud Console: create an OAuth Web Client, then add your deployed origin (example: `https://your-site.netlify.app`) as an Authorized JavaScript origin.
- The app requests only `https://www.googleapis.com/auth/drive.appdata`, which stores data in your app-specific Drive space.

**Files I added or changed for PWA support**
- Added: [manifest.json](manifest.json)
- Added: [assets/icon-192.svg](assets/icon-192.svg) and [assets/icon-512.svg](assets/icon-512.svg)
- Added: [service-worker.js](service-worker.js)
- Added: [pwa.js](pwa.js)
- Updated: [index.html](index.html), [insights.html](insights.html), [save.html](save.html)

**Notes & troubleshooting**
- The service worker intentionally ignores cross-origin requests (like accounts.google.com) so Google Identity flows are not interfered with.
- If the `Install App` button does not appear on desktop/mobile, the browser may not have fired `beforeinstallprompt` — check DevTools Console for messages and confirm HTTPS origin.
- iOS Safari does not support the JavaScript install prompt. Follow the on-screen hint: "Tap Share → Add to Home Screen".

**Next steps (optional)**
- Add PNG fallback icons (recommended for Android installers). I can generate `icon-192.png` and `icon-512.png` and update `manifest.json` if you want.
- Add a cache-clear control in the UI for power users.

If you'd like the PNG icons added now, reply `PNG` and I'll add them.

