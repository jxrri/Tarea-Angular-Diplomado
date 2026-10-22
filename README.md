# Character Directory (Angular 21)

A small browsing app for the [Dragon Ball API](https://dragonball-api.com): search and filter characters, browse planets, keep a list of favorites and send a suggestion through a validated form. Built for the URBE 2026 client-side programming module.

Stack: Angular 21 (standalone components, signals), TailwindCSS 4, Lucide icons, Vitest.

## Run it

```bash
npm install
npm start        # http://localhost:4200
npm test         # unit tests (Vitest)
npm run build    # production bundle in dist/
```

Requires Node 20.19+, 22.12+ or 24.

## Routes

| URL               | View                                    |
|-------------------|-----------------------------------------|
| `/personajes`     | Searchable, filterable, paginated list  |
| `/personajes/:id` | Character detail with transformations   |
| `/planetas`       | Paginated planets                       |
| `/favoritos`      | Characters saved as favorites           |
| `/sugerir`        | Suggestion form (reactive forms)        |

Favorites are stored in `localStorage` under the key `favoritos`.

## API notes

- `GET /characters?page=1&limit=12` returns `{ items, meta }`.
- Any filter (`name`, `race`, `gender`) switches the API to a bare array without pagination; `CharactersApi.search` wraps it into the same paged shape, and maps a 404 to an empty result.
- `GET /characters/:id` adds `originPlanet` and `transformations`.

## Project layout

```
src/app/
├── app.ts · app.html · app.config.ts · app.routes.ts   shell, providers, lazy routes
│
├── platform/                  app-wide singletons
│   ├── config/endpoints.ts    API base URL
│   ├── layout/top-bar/        navigation bar
│   ├── layout/not-found/      catch-all page
│   └── state/favorites.store.ts   signal store + localStorage
│
├── common/                    reusable, no business rules
│   ├── types/paged.ts         Paged<T> and singlePage()
│   └── widgets/pager/         pagination control
│
└── domains/                   one folder per area of the product
    ├── characters/  { types, data, ui, views, characters.routes.ts }
    ├── planets/     { types, data, ui, views, planets.routes.ts }
    ├── favorites/   { views, favorites.routes.ts }
    └── suggestions/ { views, suggestions.routes.ts }
```

Inside a domain:

| Folder   | Contents                                              | Rule                                   |
|----------|-------------------------------------------------------|----------------------------------------|
| `types/` | Interfaces and constants                              | No dependencies on the rest of the app |
| `data/`  | API clients (`*.api.ts`) and their specs              | The only code that talks HTTP          |
| `ui/`    | Presentational components (`input()` / `output()`)    | Never inject services                  |
| `views/` | Routed components that own state and call `data/`     | Loaded by the router only              |

Path aliases (`tsconfig.json`): `@platform/*`, `@common/*`, `@domains/*`. Views may reuse another domain's `ui/` and `data/`, never its `views/`.

## Legacy examples

`historia/` keeps the same list written in AngularJS 1.8 and in NgModule-style Angular, for comparison. It is not compiled.
