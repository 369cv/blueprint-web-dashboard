# Summary — Blueprint Web Dashboard (React/Vite port)

Ported from the Claude Design handoff bundle at
`/Users/savage/Desktop/blueprint-import/blueprint-app-ui-mockups/project/` into a real
Vite + React app at `/Users/savage/Desktop/blueprint-app/web`.

## What was implemented

- **Design system** (`src/design-system/`): `Icon`, `Button`, `Avatar`, `Badge`, `SettingsRow`,
  `SearchInput`, `SidebarNavItem`, `TopBar` — each re-implemented as a real React component from
  the `_ds_bundle.js` source, matching padding, colors, sizes, and variants. Tokens
  (`tokens.css`) and global styles (`styles.css`) are copied verbatim from the design system's
  `tokens/*.css` and `styles.css`, including the Google Fonts import (Inter, Lora, IBM Plex Mono)
  and the `@keyframes spin` used by the save-video progress spinner.
- **Data** (`src/data/blueprintData.js`): the full `window.BlueprintData` object ported as a plain
  `initialData` export, plus the `BlueprintDate` (day-serial calendar helper) and `BlueprintCard`
  (tint/score color cycling) helpers, ported 1:1.
- **Screens** (`src/screens/`): CalendarScreen, InspoScreen, ScriptsScreen, TemplatesScreen,
  SettingsScreen, IdeasScreen, ContentProfilesScreen, DiscoverScreen, TrackedCreatorsScreen,
  OutlierDetailScreen — each a standalone React component with camelCase props, no `window.X`
  globals.
- **Components** (`src/components/`): Shell (sidebar + top bar), RemixPanel, CategoryPickerModal,
  ProfileCreateModal, TrackCreatorModal.
- **App.jsx**: the full state machine from the `.dc.html`'s `DCLogic` class (`state` +
  `renderVals()` + `startImport()`), translated into `useState`/`useRef` at the top level —
  nav state, the four-step Save Video modal (`input -> fetching -> transcribing -> done` with the
  same 900ms/1900ms total `setTimeout` delays), filters modal, category picker (with its
  "current selection + onSelect callback" pattern reproduced via a ref since the callback itself
  isn't serializable React state), profile create/edit modal, track-creator modal, remix panel,
  outlier detail view + back button, week offset for the calendar, and every data mutation
  (`scheduled`, `inspoVideos`, `scripts`, `templates`, `personas`, `trackedCreators`, `categories`)
  lifted to real React state instead of mutating a shared `window.BlueprintData` singleton.
- **Assets**: `assets/iman-source.mp4` and `assets/iman-thumb.jpg` copied into `public/assets/`
  and referenced with root-relative paths (`/assets/...`) from `blueprintData.js`.

## Judgment calls

- **`image-slot.js` was not ported.** No screen `.jsx` file actually uses `<image-slot>` — a
  grep across all the mockup's screen/component files turned up zero references (it's only used
  inside the design system's own `ContentCard` demo component, which none of the app screens
  import). Every real thumbnail in the app renders via a plain `<img>` or a CSS gradient
  placeholder, matching what the screens themselves already do. Per the task instructions this
  was the "otherwise use plain `<img>`" branch.
- **`ContentCard`, `StatusLegend`, `SegmentedTabs`, and `PaginationControl`** exist in
  `_ds_bundle.js` but are not imported by any of the 14 screen/modal `.jsx` files (confirmed by
  grepping every file for `BlueprintDesignSystem_cb7dc4.<Name>` usage) — only `Icon`, `Button`,
  `Avatar`, `Badge`, `SearchInput`, `SettingsRow`, `SidebarNavItem`, and `TopBar` are referenced.
  The four unused components were not ported, to avoid shipping dead code; this is noted in
  `src/design-system/index.js` as well.
- **`categoryPickerOnSelect` / `profileCreateOnDone`** are held as `useRef` instead of `useState`
  in `App.jsx`. The original mockup stores a raw function in component state (`this.setState({
  categoryPickerOnSelect: onSelect })`), which works in the prototype's custom `DCLogic` runtime
  but is not a safe pattern in real React (storing a function directly in state is fragile — a
  functional updater form would be misread as a state-updater callback). A ref achieves the
  identical "pending callback for the next selection" behavior without that risk.
- **`uploads/*.png` screenshots** were not copied in — grepped across every `.jsx` file, none
  reference `uploads/`, confirming they're reference-only screenshots from the design session
  rather than app assets.
- **Save Video "Import" flow** always imports a hardcoded placeholder entry (`caption: 'Imported
  from TikTok'`, `author: '@saved_creator'`), exactly matching the mockup's `startImport()` —
  the pasted URL is not actually parsed into a real entry in either the mockup or this port; that
  fidelity was preserved intentionally rather than "fixed."
- **`IdeasScreen`'s "Check again"** shuffle is local component state (matching the mockup, which
  also keeps it in a local `React.useState` rather than lifting it to the top-level `.dc.html`
  component) — it is not persisted or written back to any shared store in either version.

## Parts of the design-system bundle not fully reverse-engineered

None encountered — `_ds_bundle.js`'s component source (Icon, Button, Avatar, Badge, ContentCard,
SettingsRow, StatusLegend, SearchInput, SegmentedTabs, PaginationControl, SidebarNavItem, TopBar)
is plain, un-minified `React.createElement` output with no runtime magic, so every used component
was ported directly with full fidelity. The only pieces of the bundle intentionally left unported
are the four components confirmed unused by the app (see above).

## Build

`npm install && npm run build` — passes cleanly, no errors or warnings beyond npm's own
audit notice (2 known upstream advisories in transitive build tooling, not runtime code).
