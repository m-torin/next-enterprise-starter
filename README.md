# Next.js Enterprise Starter Turborepo

This is an official starter Turborepo with multiple meta-frameworks all working in harmony and sharing packages.

This example also shows how to use [Workspace Configurations](https://turbo.build/repo/docs/core-concepts/monorepos/configuring-workspaces).

## Using this example

Run the following command:

```sh
npx create-turbo@latest -e kitchen-sink
```

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `api`: an [Express](https://expressjs.com/) server
- `storefront`: a [Next.js](https://nextjs.org/) app
- `admin`: a [Vite](https://vitejs.dev/) single page app
- `blog`: a [Remix](https://remix.run/) blog
- `@repo/eslint-config`: ESLint configurations used throughout the monorepo
- `@repo/jest-presets`: Jest configurations
- `@repo/logger`: isomorphic logger (a small wrapper around console.log)
- `@repo/design-system`: a dummy React UI library (which contains `<CounterButton>` and `<Link>` components)
- `@repo/typescript-config`: tsconfig.json's used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting

---

# Multi-Zone Next.js Applications

This is an example that demonstrates how to serve multiple Next.js applications from a single domain, called [Multi Zones](https://nextjs.org/docs/advanced-features/multi-zones).

Multi Zones are an approach to micro-frontends that separate a single large application on a domain into smaller applications that each serve a set of paths.
This is useful when there are collections of pages unrelated to the other pages in the application. By moving those pages to a separate zone, you can reduce the size of the application which improves build times and removes code that is only necessary for one of the zones.

Multi-Zone applications work by having one of the applications route requests for some paths to the other pages using the [`rewrites` feature](https://nextjs.org/docs/pages/api-reference/next-config-js/rewrites) of `next.config.js`. All URL paths should be unique across all the zones for the domain. For example:

- There are two zones in this application: `home` and `blog`.
- The `home` app is the main app and therefore it includes the rewrites that map to the `blog` app in [next.config.js](home/next.config.js)
- `home` will serve all paths that are not specifically routed to `blog`.
- `blog` will serve the `/blog` and `/blog/*` paths.
- The `blog` app sets [`basePath`](https://nextjs.org/docs/api-reference/next.config.js/basepath) to `/blog` so that generated pages, Next.js assets and public assets are unique to the `blog` zone and won't conflict with anything from the other zones.

NOTE: A `basePath` will prefix all pages in the application with the `basePath` automatically, including relative links. If you have many pages that don't share the same path prefix (for example, `/home` and `/blog` live in the same zone), you can use [`assetPrefix`](https://nextjs.org/docs/app/api-reference/next-config-js/assetPrefix) to add a unique prefix for Next.js assets without affecting the other pages.
