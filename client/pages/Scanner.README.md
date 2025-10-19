Scanner page
============

This README explains the Scanner page that was added as part of the QR scanner feature.

Purpose
-------
- Host the `CameraScanner` component which uses the device camera to scan QR codes.
- On successful scan, the page navigates to the `/send` route with the scanned payload included in navigation state.

How to use (developer)
----------------------
1. Ensure your development server is running: `pnpm dev`.
2. Open the app in a browser that supports `getUserMedia` (recent Chrome/Edge/Firefox).
3. Navigate to `/scanner` (you may need to add this route in `client/App.tsx` if not already present).
4. Grant camera permission when the browser prompts. Point the camera at a QR code.
5. The app will navigate to `/send` with the scanned string as `location.state.scanned`.

Notes and troubleshooting
------------------------
- If the camera doesn't start, check browser permissions and console logs.
- On some systems camera access requires HTTPS; the dev server via Vite will work on `localhost`.
- If results are noisy, the decode loop uses a short delay; you can tune timeouts inside `CameraScanner.tsx`.

Developer hooks & helpers
------------------------
- `useCamera` hook is provided to detect permission state. It is lightweight and optimistic.
- The ZXing `BrowserQRCodeReader` is used indirectly by `decodeFromCanvas` helper in `client/utils/zxing.ts`.

Future improvements
-------------------
- Add a bounding box overlay and visual indicator when a QR is detected.
- Add a manual `capture` button for devices that cannot stream reliably.
- Add tests that run in a headless environment using Puppeteer to verify scanning flow.
