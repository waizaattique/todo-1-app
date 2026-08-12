# WORKFLOW.md — round 1 (vague prompt)

**Prompt used:** a single, deliberately lazy one-liner, no file references, no constraints, no example behavior, no verification step. Accepted the first output as-is.

**What was built:** `TodoList.jsx` — one component, ~180 lines. Add/toggle/delete tasks, Enter-to-submit, an empty-state message.

## Correctness

Covers the happy path only: add, toggle, delete, and a trimmed-empty guard on the input. There's no persistence — refreshing the page silently wipes every task, and nothing in the UI warns the user this will happen. Task IDs come from `Date.now()` alone, which works for manual clicking but would collide under two adds in the same millisecond.

There's no validation beyond "not empty," no duplicate detection, no categories, and no due dates — none of that was asked for, which is exactly the point of round 1: a vague prompt gets a vague, minimum-viable result.

## Accessibility

The checkbox is wrapped in a `<label>` with visible text, which is good, and the delete button has `aria-label="Delete task"`. But the task-input text field has no associated `<label>` element — only a placeholder (`"Add a task"`), which screen readers don't reliably announce as a field name. No visible focus-state styling was added beyond the browser default.

## Edge cases

Essentially none are handled: no duplicate detection, no category concept, no dates, no storage-unavailable handling (because there's no storage at all).

## Review effort

Reading the output took under a minute — it's short and easy to follow. But it wasn't usable as-is for the capstone: I had to go back with follow-up prompts to get persistence and validation, which weren't in the original ask. The "fast" round ended up being slower once those gaps surfaced during review. No tests exist for this branch, so every one of the gaps above was found by manual reading and clicking through the app, not by a verification step — that absence is itself the biggest weakness of this round.


