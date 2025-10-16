Title: feat(sidebar+layout): add Sidebar component and Layout wrapper, wire routes

Summary
-------
This branch implements the app shell: a polished Sidebar component, a Layout wrapper to centralize sidebar + main content, and route wiring for core pages (Dashboard, Send, Receive, Transactions, Analytics, Settings).

Key changes
-----------
- `client/components/Sidebar.tsx` — new Sidebar with collapse support, active-route highlighting, icons, and a mobile slide-over overlay.
- `client/components/Sidebar.tsx` — new Sidebar with collapse support, active-route highlighting, icons, a mobile slide-over overlay, keyboard navigation and ARIA improvements (ArrowUp/Down, Home/End, Escape-to-close).
- `client/components/Layout.tsx` — central layout wrapper that places the Sidebar (desktop) and main content responsively.
- `client/App.tsx` — refactored to use `Layout` for app routes instead of repeated markup.

Testing notes
-------------
- Start dev server. Navigate to `/dashboard` and other app pages to see Sidebar on desktop (md and up) and a slide-over menu on mobile sizes.
- Verify collapse toggle hides labels and collapses width; verify active route highlighting changes when navigating.
- On mobile viewport, open the NavBar menu and ensure the Sidebar overlay appears and closes when clicking backdrop or links.

Backward compatibility
---------------------
This change centralizes layout behavior and is backwards-compatible for routes. Components that used the previous inline layout markup continue to work because `Layout` renders the same structure.

Next steps
----------
- Polish sidebar icons and spacing.
- Add keyboard navigation inside the sidebar (arrow keys) and ARIA roles for better accessibility.
- Keyboard navigation and ARIA roles have been implemented: ArrowUp/ArrowDown/Home/End to move focus, Escape to close mobile overlay, and focus management on route change.
