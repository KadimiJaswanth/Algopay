## Feature: Receive QR generator

- Branch: `feature/receive-qr`
- Summary: Adds a Receive page that shows a QR code for the current wallet address, a copy-to-clipboard action, and a small share flow. Also includes user-facing scan-to-pay hints.

Files changed/added:

- `client/components/ReceiveQR.tsx` - new QR component using `react-qr-code` with Copy and Share buttons wired to clipboard and Web Share API fallback.
- `client/pages/Receive.tsx` - replaced placeholder with card-based Receive page that consumes `useWallet()` and shows scan hints.
- `client/utils/clipboardCopy.ts` - small utility to copy text to clipboard safely with a fallback.

Additional improvements in this commit:

- Accessibility: landmarks (main/section/aside), aria-labels and aria-live support for address updates.
- Keyboard & focus: copy button receives focus after copy; buttons expose aria-labels for screen readers.
- Micro-interaction: subtle hover/focus scale animation for the QR container; entrance animation for the Receive card.


Testing notes:

- With a connected wallet, visit `/receive` and verify the QR encodes your wallet address.
- Click "Copy address" -> verify clipboard contains the address and a toast appears.
- Click "Share" on mobile -> native share dialog should open (if supported); on desktop it copies the `algo:<address>` URI to clipboard.
- If no wallet is connected, the page shows a mock address and copy/share still function.

Testing notes (a11y & UX):

- Use a screen reader (NVDA/VoiceOver) to verify the region announces "Receive address QR" and address updates are read via aria-live.
- Tab through the Copy and Share buttons and press Enter/Space to activate. After copying, focus should remain on the Copy button.
- Observe the subtle scale on hover/focus of the QR image and the fade-in entrance when the page loads.

Next steps:

- Add an option to download the QR as an image.
- Integrate a small scanner component (feature 8) to allow local scanning for desktop webcam testing.
