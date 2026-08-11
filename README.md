# DIV-O Attendance – Google Drive

Upload these files to GitHub and deploy the repository to Netlify.

Before deploying, replace `PASTE_YOUR_GOOGLE_OAUTH_CLIENT_ID_HERE.apps.googleusercontent.com` in `index.html` with your Google OAuth Web Client ID.

Authorized JavaScript origin in Google Cloud must exactly match the deployed site origin, e.g. `https://your-site.netlify.app`.

The app uses Google Identity Services and requests only `https://www.googleapis.com/auth/drive.appdata`.
