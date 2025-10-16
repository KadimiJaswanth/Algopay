Title: feat(navbar): wire wallet connect/disconnect, balance popover, accessibility

Summary
-------
This branch finishes several Navbar improvements and developer ergonomics:

- Wire connect/disconnect buttons to existing `useWallet()` flows (Pera, MyAlgo, Mock).
- Render `BalancePopover` with accessible attributes and a stable test id.
- Add keyboard interactions (Enter/Space) on connect/disconnect buttons so they are operable via keyboard.
- Add `data-testid` attributes and export a small `getNavBarTestIds()` helper to make e2e/unit tests stable.

Files changed
-------------
- `client/components/NavBar.tsx` — accessibility, keyboard handlers, test ids, and minor UI wiring.

Testing notes
-------------
- With dev server running, try connecting via each provider (Pera/MyAlgo/Mock). Confirm balance appears and disconnect works.
- Use keyboard (Tab to button, Enter/Space) to activate connect/disconnect actions.
- Use the test ids exported by `getNavBarTestIds()` for unit/integration tests.

Backward compatibility
---------------------
No breaking changes — this wire-up uses existing wallet context methods and only adds small test helpers and accessibility improvements.

Next steps
----------
- Optionally expose a small UI in Settings for network switching and top-up for dev/demo (uses `topUpMock` and `switchNetwork`).
