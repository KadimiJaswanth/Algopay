Title: feat(send): add Send ALGO form with validation and confirm flow

Summary
-------
This branch implements a Send ALGO form with validation, a review/confirmation dialog, and connection to the existing mock send flow (`sendMockTxn`) from `useWallet()`.

Key changes
-----------
- `client/pages/Send.tsx` — Replaced the placeholder with a full Send form featuring recipient, amount, and optional note fields.
- Client-side validation for recipient and amount (including insufficient balance check against the mock balance).
- Review/confirm dialog before sending, using the project's `Dialog` primitives.
- Uses `sendMockTxn` from `useWallet()` to perform a mock send and relies on context to show toasts and update txns.
- Adds clipboard paste helper and a QR scan placeholder to assist entering recipient addresses.
- Adds a simple fee estimate line (base fee + percentage) and displays the estimated total before confirmation.

Testing notes
-------------
- Start dev server and open `/send`.
- Fill a recipient and amount and click Review. Confirm that validation runs and the review dialog appears.
- Confirm send: the mock send flow will execute and should add a transaction to the mock history.

Files changed
-------------
- Updated: `client/pages/Send.tsx`

Next steps
----------
- Improve UX: add address paste/scan helpers, show an estimated fee line, and provide success screen with links to Transactions.
- Improve UX: add address paste/scan helpers (now included as placeholder), show an estimated fee line (included), and provide success screen with links to Transactions.
- Add tests for form validation and confirmation dialog.
