# AGENTS.md

Instructions for AI agents working in the **bee-here** repository. Follow these for every prompt.

## Project

- "Bee Here With Me" — a cross-platform (iOS + Android) mobile app built with **Expo SDK 57**, **React 19**, **React Native 0.86**, **TypeScript 6**.
- Entry: `index.ts` → `App.tsx` (loads fonts, splash screen) → `src/screens/WelcomeScreen.tsx`.
- Source lives under `src/` (`screens/`, `components/`, `theme/`). Images live in `assets/`.

## Workflow for every change

1. **Read before editing.** Understand the existing file and surrounding code first.
2. **Type-check after edits:** `npx tsc --noEmit -p tsconfig.json`. Fix all errors before continuing.
3. **Restart the dev server to see changes.** The server runs in CI mode, which disables hot reload, so changes are only picked up on restart:
   ```sh
   lsof -ti:8082 | xargs kill -9 2>/dev/null
   CI=1 npx expo start --ios --port 8082
   ```
4. **Verify visually.** After "iOS Bundled" appears, screenshot the simulator and inspect it:
   ```sh
   xcrun simctl io booted screenshot /tmp/bee-check.png
   ```

## Environment constraints

- **Always run Expo with `CI=1`.** Watchman is unavailable; without CI mode Metro crashes with `EMFILE: too many open files`.
- **Use port 8082.** Port 8081 is used by another project.
- **Never run `sudo`** or other interactive privilege-escalation commands.
- Keep all dependencies aligned to **Expo SDK 57** (install packages with `npx expo install`, not plain `npm install`).

## Conventions

- Use the color palette in `src/theme/colors.ts`; do not hard-code new hex values unless matching a baked-in asset (e.g. the flower image cream `#FDFBEF`).
- Fonts: `Fraunces` (serif) for titles, `Nunito` (sans) for body — via `Platform.select`.
- **Text must never be smaller than `24`** (`fontSize` >= 24 for all user-facing text).
- Prefer editing existing files over creating new ones.
- Put temporary files (screenshots, etc.) in `/tmp`, never in the repo.

## Do not

- Do not create markdown docs to describe changes unless explicitly asked.
- Do not add features, refactors, comments, or error handling beyond what is requested.
- Do not commit or push unless asked.
- Do not leave stray one-off scripts or unused assets in the repo — remove them when the task is done.
