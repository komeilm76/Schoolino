# Product requirements

## Required and implemented

- Preserve all visible Persian content, approved assets, spacing and breakpoints.
- Client-side routes for existing information/contact views; refresh and native history work.
- Persistent landing layout; no document reload for internal actions.
- Mobile menu, service anchor, details, accessible 404 and local enquiry validation.
- Route-based page titles, visible keyboard focus, named dialogs, Escape dismissal, return focus and reduced-motion behavior.
- No screenshot canvas and no runtime third-party asset requests.
- Bun lockfile and mandatory stack; strict typing, lint, format, tests and production build.

## Explicit exclusions

No Schoolino rebranding or additional education sections, auth, payments, real contact submission, storage or external API. Original supplied fonts/vector artwork cannot be inferred with certainty.

## Non-functional gates

No overflow/callout collisions across eleven checked widths. All existing interactions must pass after extraction. Recorded desktop/mobile screenshot comparisons must not change approved geometry. Production host must serve index.html for client routes.
