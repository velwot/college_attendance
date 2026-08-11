# DIV-O Attendance — Google Drive version

A static, mobile-friendly attendance tracker for the supplied Sem 1 ICT DIV-O timetable.

## What this version does

- Tracks each class occurrence independently.
- Tuesday's two BEE sessions are separate attendance records.
- Filters practical/tutorial classes by O1/O2/O3 batch.
- Attendance = Present / (Present + Absent).
- Future classes and unmarked past classes are not counted as absent.
- Starts attendance calculation from the timetable WEF date: 25/07/2026.
- Uses localStorage as an offline cache.
- Optional Google Drive sync stores one JSON file in Google's `appDataFolder`.
- Export/import remains available as a manual backup.

## Google setup

1. Create/select a project in Google Cloud Console.
2. Enable **Google Drive API**.
3. Configure the OAuth consent screen / Google Auth Platform.
4. Create an **OAuth 2.0 Client ID** of type **Web application**.
5. Add your deployed site origin under **Authorized JavaScript origins**.
   Example:
   `https://your-site-name.netlify.app`
6. Copy the Client ID into `index.html`:

   `const GOOGLE_CLIENT_ID = "YOUR_CLIENT_ID.apps.googleusercontent.com";`

7. Deploy the repository to Netlify.

The app requests only:

`https://www.googleapis.com/auth/drive.appdata`

This is Google's application-specific hidden storage area. Users don't browse this file in their normal Drive UI.

## Netlify

No traditional server is required for this version. Netlify can host the static HTML.

Recommended repository:

div-o-attendance/
└── index.html

You can also add this README.

## Important OAuth note

This build uses Google's browser authorization flow. Access tokens are short-lived; the token itself is kept in memory and not stored in localStorage. If the token expires, the user may need to press "Connect Google Drive" again.

For a production app that needs silent long-lived background access, use Google's authorization-code flow with a backend/serverless function and secure refresh-token storage. That is more complex and is not included in this simple static build.

## Data ownership

The attendance JSON is stored in the signed-in user's Google Drive application data area, not in a database controlled by the app owner.

Users can revoke the app's Google authorization from their Google Account settings.
