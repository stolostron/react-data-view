# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@stolostron/react-data-view` is a reusable React component library for rendering data as sortable, filterable tables or catalog card views. Built on PatternFly 6 with virtualized table rendering, Fuse.js fuzzy search, and automatic URL query string persistence. Used by the Red Hat Advanced Cluster Management (ACM) console.

## Commands

```bash
npm ci                  # Install dependencies
npm start               # Start demo dev server on port 3000 (hot reload)
npm run start:quiet      # Same without opening browser
npm run build           # Build library to lib/ (clean, compile, copy assets)
npm test                # Run all checks concurrently: tsc, eslint, prettier, pages build
npm run tsc             # Type check only (no emit)
npm run eslint          # Lint src/ and demo/
npm run prettier        # Check formatting
npm run prettier:fix    # Auto-fix formatting
```

There are no unit tests. `npm test` runs tsc, eslint, prettier, and a production webpack build concurrently.

## Code Style

- Prettier: 140 char line width, 4-space indent, no semicolons, single quotes
- ESLint: `no-console` is an error. `@typescript-eslint/no-explicit-any` is disabled (any is used freely).
- TypeScript: strict mode enabled with `noUnusedLocals` and `noUnusedParameters`

## Architecture

### Data Pipeline (useTableItems)

The core data flow is a composable hook pipeline in `src/useTableItems.tsx`:

```
items → useSorted → useFiltered → useSearched → usePaged
```

Each stage is a separate internal hook. `useTableItems` composes them and also provides selection state via `useSelected`. The `ItemView` component consumes this pipeline and wires it to the toolbar and view components.

### Component Hierarchy

**`ItemView`** is the main orchestrator component. It:
- Manages view mode (table vs catalog) persisted to URL query params
- Initializes the Fuse.js search function and filter predicates
- Syncs search, filter, and view state bidirectionally with URL query strings
- Delegates to `ItemTable` (table mode) or `Catalog` (catalog mode)

**`ItemTable`** implements virtualized rendering by calculating visible rows from scroll position and only rendering rows in the viewport, using spacer `<Tr>` elements for before/after height.

**`Toolbar` (`PageToolbar`)** provides search input, filter dropdowns, bulk select, toolbar actions (with overflow menu), column management, and table/catalog view toggle.

### Key Interfaces

- **`ITableColumn<T>`** (`src/TableColumn.tsx`) — defines column header, cell renderer, sort function, and enabled state
- **`IItemFilter<T>`** (`src/ItemFilter.tsx`) — defines filter label, options, and predicate function
- **`IItemAction<T>`** (`src/ItemActions.tsx`) — defines row-level actions (click handlers or separators)
- **`IToolbarAction<T>`** (`src/Toolbar.tsx`) — defines toolbar-level actions (buttons, bulk actions, separators)

All data components are generic over `T extends object`.

### Two Build Targets

- **Library build** (`npm run build`): compiles `src/` to `lib/` via `tsconfig.prod.json`. Published to npm. Entry point is `src/index.ts`.
- **Demo build** (`npm start` / `npm run pages`): webpack bundles `demo/` (which imports from `src/`) for development and GitHub Pages. Not published.

### String Localization

`StringContext` (`src/contexts/StringContext.tsx`) provides a context for overriding default UI strings (back, cancel, empty state messages). Consumers wrap with `DataViewStringContext.Provider`.
