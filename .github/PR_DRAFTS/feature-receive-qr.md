## Feature: Receive QR generator

- Branch: `feature/receive-qr`
- Summary: Adds a Receive page that shows a QR code for the current wallet address, a copy-to-clipboard action, and a small share flow. Also includes user-facing scan-to-pay hints.

Files changed/added:

- `client/components/ReceiveQR.tsx` - new QR component using `react-qr-code` with Copy and Share buttons wired to clipboard and Web Share API fallback.
- `client/pages/Receive.tsx` - replaced placeholder with card-based Receive page that consumes `useWallet()` and shows scan hints.
- `client/utils/clipboardCopy.ts` - small utility to copy text to clipboard safely with a fallback.

Testing notes:

- With a connected wallet, visit `/receive` and verify the QR encodes your wallet address.
- Click "Copy address" -> verify clipboard contains the address and a toast appears.
- Click "Share" on mobile -> native share dialog should open (if supported); on desktop it copies the `algo:<address>` URI to clipboard.
- If no wallet is connected, the page shows a mock address and copy/share still function.

Next steps:

- Add an option to download the QR as an image.
- Integrate a small scanner component (feature 8) to allow local scanning for desktop webcam testing.
