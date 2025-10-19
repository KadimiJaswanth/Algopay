## Feature: QR Scanner placeholder

- Branch: `feature/qr-scanner`
- Summary: Adds a simple scanner placeholder component and a `Scanner` page. The placeholder includes a "Simulate scan" button to inject a sample address for local testing. Camera/webcam integration will be added in a follow-up.

Files added:

- `client/components/QrScannerPlaceholder.tsx` - lightweight placeholder UI with simulated scan action.
- `client/pages/Scanner.tsx` - page that uses the placeholder and navigates to `/send` with scanned payload.

Testing notes:

- Visit `/scanner` and click "Simulate scan" — a toast should show the scanned payload and (after a short delay) navigate to `/send` with the scanned address in navigation state.
- The placeholder should render a simple SVG frame and accessible buttons.

Next steps:

- Integrate an actual camera-based QR scanner (e.g., `react-qr-scanner` or `@zxing/library`) with permission handling and fallbacks.
- Add unit tests for the placeholder and navigation wiring.
