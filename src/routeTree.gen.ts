/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const RecordLazyImport = createFileRoute('/record')()
const ChangelogLazyImport = createFileRoute('/changelog')()
const IndexLazyImport = createFileRoute('/')()
const BattleStartLazyImport = createFileRoute('/battle/start')()
const BattleSelectLazyImport = createFileRoute('/battle/select')()

// Create/Update Routes

const RecordLazyRoute = RecordLazyImport.update({
  path: '/record',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/record.lazy').then((d) => d.Route))

const ChangelogLazyRoute = ChangelogLazyImport.update({
  path: '/changelog',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/changelog.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const BattleStartLazyRoute = BattleStartLazyImport.update({
  path: '/battle/start',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/battle/start.lazy').then((d) => d.Route))

const BattleSelectLazyRoute = BattleSelectLazyImport.update({
  path: '/battle/select',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/battle/select.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/changelog': {
      id: '/changelog'
      path: '/changelog'
      fullPath: '/changelog'
      preLoaderRoute: typeof ChangelogLazyImport
      parentRoute: typeof rootRoute
    }
    '/record': {
      id: '/record'
      path: '/record'
      fullPath: '/record'
      preLoaderRoute: typeof RecordLazyImport
      parentRoute: typeof rootRoute
    }
    '/battle/select': {
      id: '/battle/select'
      path: '/battle/select'
      fullPath: '/battle/select'
      preLoaderRoute: typeof BattleSelectLazyImport
      parentRoute: typeof rootRoute
    }
    '/battle/start': {
      id: '/battle/start'
      path: '/battle/start'
      fullPath: '/battle/start'
      preLoaderRoute: typeof BattleStartLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  ChangelogLazyRoute,
  RecordLazyRoute,
  BattleSelectLazyRoute,
  BattleStartLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/changelog",
        "/record",
        "/battle/select",
        "/battle/start"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/changelog": {
      "filePath": "changelog.lazy.tsx"
    },
    "/record": {
      "filePath": "record.lazy.tsx"
    },
    "/battle/select": {
      "filePath": "battle/select.lazy.tsx"
    },
    "/battle/start": {
      "filePath": "battle/start.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
