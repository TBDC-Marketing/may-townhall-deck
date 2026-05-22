---
name: testing-may-townhall-deck
description: Test the May townhall deck UI end-to-end. Use when verifying slide copy, imagery, navigation, or presentation layout changes.
---

# Testing May Townhall Deck

## Devin Secrets Needed

None. This is a static Vite slide deck and local preview does not require login or app credentials.

## Local setup

1. Ensure dependencies are installed with `pnpm install`.
2. Run typecheck/build before browser testing:
   ```bash
   pnpm run typecheck
   pnpm run build
   ```
3. Start the local preview/dev server from the repo root:
   ```bash
   pnpm exec vite --host 127.0.0.1 --port 4173
   ```
4. Open `http://127.0.0.1:4173/` in Chrome.

## Navigation tips

- Use the top-left menu button to open the Table of Contents.
- TOC entries are numbered and can jump directly to the target slide.
- Keyboard navigation also works: right arrow/space/enter advances, left arrow/backspace goes back, `F` toggles fullscreen.
- The slide counter appears at top right in `NN / 32` format and is useful evidence that the correct slide is being tested.

## Browser testing checklist

- Maximize the browser before recording.
- Record only the focused user-facing flow being tested.
- For slide copy/image changes, use the TOC to jump directly to the affected slide(s), then verify exact slide number, title, visible text, and image.
- Check the browser console after rendering affected slides; it should have no runtime errors.
- Capture screenshots of the affected slides and include them inline in the test report.
- When testing an open PR, post one PR comment with concise pass/fail bullets, key screenshots, and the Devin session link.

## Reporting format

- Lead with any blockers or mismatches.
- List each assertion with Passed/Failed/Untested.
- Include screenshots in a compact two-column table when testing more than one slide.
- Attach the recording and full `test-report.md` when reporting back to the user.
