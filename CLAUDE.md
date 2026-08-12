# CLAUDE.md — round 1 (vague prompt) rules

This file documents the project rules as they stand after round 1. Round 1 was intentionally a single, lazy prompt with no context, so most of these are gaps rather than established patterns — they're the reason round 2 exists.

1. **State that should survive a refresh must be persisted.** `TodoList.jsx` keeps tasks in a plain `useState([])` with no storage layer. Reloading the page silently deletes every task, and nothing in the UI warns the user. Any future "list" or "tracker" feature needs either persistence (localStorage, backend) or an explicit, visible note that data is session-only.
2. **Every user-facing form input needs an accessible label — a placeholder is not a label.** The task-input field only has `placeholder="Add a task"` and no associated text label. Placeholders may provide examples or hints, but they must not be the only accessible name for an input.
3. **Don't ship logic that can't be unit-tested without a DOM.** There is no `src/utils/`-style separation here — add/toggle/delete all live inline inside the component. As soon as this project grows past a single component, business logic (validation, dedupe checks, date math) should move to plain, framework-free functions so it can be tested with a basic test runner.
4. **IDs need a real generator, not `Date.now()` alone.** Works for manual clicking, but two adds in the same millisecond (e.g. a fast double-submit) would collide. Use a proper unique-id approach if this codebase is extended.
