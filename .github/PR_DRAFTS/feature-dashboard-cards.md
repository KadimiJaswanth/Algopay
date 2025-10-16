Title: feat(dashboard): add Card primitives, StatsCard, MiniChartCard, RecentTransactions, QuickActionLarge

Summary
-------
This branch improves the Dashboard UI by introducing reusable Card primitives and concrete dashboard components:

- `client/components/ui/card.tsx` — small Card primitive (Card, CardHeader, CardContent, CardTitle) used across dashboard components.
- `client/components/StatsCard.tsx` — refactored to use Card primitives.
- `client/components/MiniChartCard.tsx` — refactored to use Card primitives.
- `client/components/RecentTransactions.tsx` — wrapped in Card primitive for consistent layout and styling.
- `client/components/QuickActionLarge.tsx` — larger QuickAction for the dashboard actions column.
- `client/pages/Dashboard.tsx` — wired to use the new primitives and components; actions now use QuickActionLarge.

Why
---
Introducing a small Card primitive centralizes look-and-feel and makes the Dashboard components easier to compose and test. These changes are primarily presentational and should be backward compatible.

Testing notes
-------------
- Start dev server and open `/dashboard`.
- Verify the Wallet Overview tiles render, charts render, recent transactions list is in a Card, and the Actions column shows QuickActionLarge buttons.
- Try selecting a transaction to open the detail drawer and use the Repeat action to send a mock transaction.

Files changed
-------------
- Added: `client/components/ui/card.tsx` (Card primitive)
- Updated: `StatsCard.tsx`, `MiniChartCard.tsx`, `RecentTransactions.tsx`, `QuickActionLarge.tsx`, `client/pages/Dashboard.tsx`

Next steps
----------
- Add small unit tests for Card and RecentTransactions components (Vitest).
- Polish spacing and responsive layout for small screens.
