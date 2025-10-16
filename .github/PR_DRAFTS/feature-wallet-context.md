Title: feat(wallet): persist network & txns, add top-up and safer send

Summary
-------
This branch enhances the wallet context used across the app with a few developer-friendly, non-breaking changes:

- Persist selected network (testnet/mainnet) and recent transactions (capped to 25) to localStorage.
- Introduce typed `Network` and `TxnStatus` exports to help callers reason about network and txn lifecycles.
- Add `topUpMock(amount)` helper to simulate incoming (inbound) transactions (useful for dev/demo flows).
- Harden `sendMockTxn` with basic validation, optimistic pending state, and simulated confirmation; balance updates applied on confirmation.

Why
---
These improvements make testing and demo flows smoother: the app now remembers which network the user selected and stores a small transaction history across reloads. The top-up helper is helpful to simulate receiving funds during local development and demo videos. The safer send flow gives a more realistic UX (submit → pending → confirmed) and validates inputs.

Files changed
-------------
- `client/context/WalletContext.tsx` — added types, persisted network & txns, added `topUpMock`, and refactored `sendMockTxn`.

Testing notes
-------------
- Launch dev server and enable mock wallet via the UI ("Enable mock" button) or call `enableMock()` from the console.
- Use the new `topUpMock(amount)` from components/pages (or via console) to simulate incoming funds.
- Try `sendMockTxn(to, amount)` with valid and invalid inputs to observe optimistic UI and validation.

Backward compatibility
---------------------
This is fully backward-compatible: existing consumers of `useWallet()` will continue to receive the same fields. New helpers are additive.

Next steps
----------
- Merge after review.
- Add small UI buttons in the Dashboard or Wallet settings to expose `topUpMock` and `switchNetwork` for easier developer testing.
