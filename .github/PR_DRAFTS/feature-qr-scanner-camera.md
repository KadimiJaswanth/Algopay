Feature: Camera QR Scanner
==========================

Summary
-------
Adds a camera-based QR scanner component and a Scanner page that lets users scan QR codes using their device camera. When a QR is detected, the app navigates to /send with the scanned payload.

Files added
-----------
- client/components/CameraScanner.tsx — live camera scanning using ZXing and decodeFromCanvas.
- client/pages/Scanner.tsx — page wrapper and navigation behavior.
- client/hooks/useCamera.ts — helper hook to check camera permission/availability.
- client/utils/__tests__/zxing-camera.spec.ts — simple Vitest smoke test for blank-canvas behavior.
- client/pages/Scanner.README.md — developer notes and usage.

Notes
-----
- The implementation uses decodeFromCanvas from client/utils/zxing.ts and polls the canvas every ~250ms.
- The test is a light smoke test that expects an empty canvas to return null.

Testing
-------
1. pnpm install (dependencies already present in branch)
2. pnpm -s run typecheck — ensure TypeScript passes
3. pnpm dev and navigate to /scanner to test manually

Security & privacy
------------------
- All camera access happens in-browser via getUserMedia and streams are stopped when the component unmounts.
- No camera data is sent to the server.
