# BS AI Business Intelligence Platform
## Version 3.0 Enterprise Edition Roadmap

### Branch policy
- `main`: production branch connected to Netlify.
- `stable/v2.3.0`: immutable recovery snapshot.
- `enterprise/v3.0`: active development branch.

No feature is merged into `main` until it is reviewed and tested on the development branch.

## Milestone 1 — Stable foundation
- Preserve current production behavior.
- Validate navigation, local storage, charts, reports, forecasts, PWA, and responsive layouts.
- Add a visible development version label.

## Milestone 2 — Presentation navigation
- Add the presentation toolbar:
  - Home / Application
  - Presentation
  - Dashboard
- Add a visible Exit Presentation button.
- Add Escape-key support.
- Preserve the user's previous page when leaving presentation mode.

## Milestone 3 — Start Live Demo
- Add a safe demo launcher.
- Preserve the user's real data before demo mode.
- Load demo records automatically.
- Navigate through analysis, charts, report, and forecast.
- Add pause, stop, and restore-data controls.

## Milestone 4 — Cinematic experience
- Add a short optional splash screen.
- Improve the BS logo glow and light sweep.
- Add subtle Abu Dhabi-inspired background treatment.
- Add animated counters, transitions, and chart entrances.
- Respect reduced-motion accessibility preferences.

## Milestone 5 — Feedback and support
- Add 1–5 star rating.
- Add optional written feedback.
- Add report-a-problem and feature-request actions.
- Add version and release notes.

## Milestone 6 — Enterprise readiness
- Separate HTML, CSS, and JavaScript modules.
- Add error boundaries and visible fallback messages.
- Add smoke-test checklist before production deployment.
- Prepare future authentication, roles, cloud storage, and database integration.

## Release gate
A milestone is merged into `main` only after:
1. The page loads without JavaScript errors.
2. Arabic and English work.
3. Desktop and mobile layouts are checked.
4. Existing user data remains safe.
5. PWA cache is updated.
6. A rollback point is confirmed.
