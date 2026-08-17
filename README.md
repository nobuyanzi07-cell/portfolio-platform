# Fulltone studio max — Portfolio Platform

A single-page React application for a creative agency to showcase past
projects, built for the *Summative Lab: SPA with React*. Visitors can browse
the studio's work, search and filter it live, and the studio itself can add
new projects to the catalog without touching code.

## Live concept

The design treats the portfolio as a physical catalog: every project is a
numbered, tagged "entry" filed under a category. Adding a project files a
new entry at the top of the index; removing one takes it out.

## Features

- **Landing page / project index** — a responsive grid of project cards
  (image, category, year, client, description, tags), seeded with six
  sample case studies.
- **Live search** — a single search box filters projects instantly by
  title, client, category, description, or tag as you type. No submit
  button, no page reload.
- **Category filter chips** — narrow the index to one category (Branding,
  Web Design, Packaging, etc.) alongside the search box; both filters
  combine.
- **Add-project form** — a modal form with controlled inputs and inline
  validation (title, client, and description are required; year is range
  checked). New projects appear in the index immediately.
- **Remove a project** — each card has a "Remove from index" action for
  quick catalog management.
- **Persistence** — the catalog is saved to `localStorage`, so additions
  and removals survive a page refresh. If storage is unavailable, the app
  still works for the current session.
- **Responsive design** — the layout adapts from a single column on mobile
  to a multi-column grid on larger screens; the sticky header and toolbar
  collapse gracefully on small viewports.
- **Empty state** — searching or filtering to zero results shows a clear
  "nothing filed under that" message instead of a blank page.

## Tech stack

- React 19 (function components + hooks)
- Vite
- Vitest + React Testing Library for tests (a Jest-compatible test runner
  that integrates natively with Vite — same API as Jest, no extra
  transpilation config needed)
- Plain CSS with a small design-token system (CSS custom properties) — no
  UI framework

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
# opens at http://localhost:5173

# 3. Run the test suite
npm test

# 4. Build for production
npm run build
npm run preview   # serve the production build locally
```

## Project structure

```
src/
  components/        Presentational components (Header, Hero, SearchBar,
                      ProjectList, ProjectCard, ProjectForm, EmptyState,
                      Footer) — each with its own .css and, where it has
                      behavior worth covering, a .test.jsx
  data/projects.js    Seed data used on first run
  hooks/useProjects.js  Custom hook: owns the project list, localStorage
                      sync, and add/remove actions
  App.jsx             Top-level state: search term, active category,
                      form-open flag; derives the filtered list and wires
                      components together
  App.test.jsx        Integration tests (search, filter, add flow)
```

### Component hierarchy

```
App
 ├─ Header        (project count, "+ New project" button)
 ├─ Hero          (static intro copy)
 ├─ SearchBar     (search input + category chips)
 ├─ ProjectList
 │   ├─ ProjectCard × N
 │   └─ EmptyState (shown instead of cards when nothing matches)
 ├─ Footer
 └─ ProjectForm   (modal, mounted only while open)
```

State lives as high as it needs to (in `App` and in `useProjects`) and
flows down as props; user actions (typing, clicking a filter chip,
submitting the form, clicking remove) flow back up as callback props.

## Known limitations

- Images are referenced by URL (or a fallback stock image if left blank)
  rather than uploaded — there's no file upload/storage backend.
- Persistence is local to the browser (`localStorage`), not shared across
  devices or visitors; there's no real backend/database.
- There's no edit-in-place for existing projects, only add and remove.
- No authentication — anyone with the page open can add or remove
  projects, which is fine for a lab/demo but would need a login and an
  API before going live for a real client.

## Design notes

Palette, type, and the "catalog card" treatment (numbered entries, mono
labels, hairline grid) were chosen deliberately to fit a creative agency's
own portfolio — see inline comments in the component files for the
reasoning behind specific UI decisions.
