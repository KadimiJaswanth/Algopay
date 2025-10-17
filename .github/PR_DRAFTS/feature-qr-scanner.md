## Feature: QR Scanner placeholder

- Branch: `feature/qr-scanner`
- Summary: Adds a simple scanner placeholder component and a `Scanner` page. The placeholder includes a "Simulate scan" button to inject a sample address for local testing. Camera/webcam integration will be added in a follow-up.

Files added:

- `client/components/QrScannerPlaceholder.tsx` - lightweight placeholder UI with simulated scan action.
- `client/pages/Scanner.tsx` - page that uses the placeholder and navigates to `/send` with scanned payload.

New changes in this update:

- `client/components/CameraScanner.tsx` - camera-based scanner using MediaDevices API and the browser `BarcodeDetector` when available.
	- Permission prompts handled via `getUserMedia`.
	- Device selection UI (enumerates `videoinput` devices).
	- Error handling and fallback to the placeholder if decoding isn't available.
- `client/pages/Scanner.tsx` updated to include the real camera scanner and keep placeholder as a fallback.

Testing notes:

- Visit `/scanner` and click "Simulate scan" — a toast should show the scanned payload and (after a short delay) navigate to `/send` with the scanned address in navigation state.
- The placeholder should render a simple SVG frame and accessible buttons.

Next steps:

- Integrate an actual camera-based QR scanner (e.g., `react-qr-scanner` or `@zxing/library`) with permission handling and fallbacks.
- Add unit tests for the placeholder and navigation wiring.

This update provides the camera integration and device selection. Next steps:

- Add decoding fallback using `@zxing/library` for browsers without `BarcodeDetector` support.
- Add unit/integration tests for CameraScanner (mocking media devices) and navigation flows.
