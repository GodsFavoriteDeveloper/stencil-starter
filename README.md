# Stencil + TailwindCSS Starter

A minimal starter app combining [Stencil](https://stenciljs.com/) and [TailwindCSS](https://tailwindcss.com/), based on the [Getting Started](https://stenciljs.com/docs/getting-started) minimal starter app. [ESLint](https://eslint.org/) configuration is also included, with additional support for the [VSCode](https://github.com/microsoft/vscode-eslint) extension.

## Stencil

[Stencil](https://stenciljs.com/) is a toolchain for building reusable, scalable Design Systems, to generate small, blazing fast, and 100% standards based Web Components that run in every browser.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool.  Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all. In many cases, Stencil can be used as a drop in replacement for traditional frontend frameworks given the capabilities now available in the browser, though using it as such is certainly not required.

Stencil also enables a number of key capabilities on top of Web Components, in particular Server Side Rendering (SSR) without the need to run a headless browser, pre-rendering, and objects-as-properties (instead of just strings).

## TailwindCSS

[TailwindCSS](https://tailwindcss.com/) is a highly customizable, low-level CSS framework that gives you all of the building blocks you need to build bespoke designs without any annoying opinionated styles you have to fight to override.

Most CSS frameworks come with all sorts of predesigned components like buttons, cards, and alerts that might help you move quickly at first, but cause more pain than they cure when it comes time to make your site stand out with a custom design.

Tailwind is different. Instead of opinionated predesigned components, Tailwind provides low-level utility classes that let you build completely custom designs without ever leaving your HTML.

## Develop

This starter repository comes preloaded with all the necessary config, files and packages to benefit from [ESLint](https://eslint.org/docs/user-guide/configuring), [Jest](https://jestjs.io/docs/en/configuration) and [TailwindCSS](https://tailwindcss.com/docs/configuration) frameworks right from the start. For additional configuration options, check the provided links.

Below there are detailed instructions on how to start using this repository for development and how to create it from scratch.

### Usage

#### Clone and Setup

```sh
git clone git@github.com:davelsan/stencil-tailwind-starter.git
pnpm install
```

#### Command Cheatsheet

```sh
pnpm run build      # build for deployment
pnpm run generate   # generate new component
pnpm run lint       # lint and fix code
pnpm run serve      # build and serve for development
pnpm run test       # run tests
pnpm run test:watch # run tests and watch for changes
```

### Create from scratch

This repository was created following the excellent [Stencil example](https://github.com/jagreehal/setup-examples/tree/master/examples/stencil) provided by [Jag Reehal](https://github.com/jagreehal). His instructions were adapted to a new Stencil app generated using [pnpm](https://pnpm.js.org/).

#### Stencil + TailwindCSS

Follow the [Getting Started](https://stenciljs.com/docs/getting-started) guide, selecting a minimal starter app.

```sh
npm init stencil
> app
```

Update `build` script and add `devDependencies` to `package.json`.

```json
{
  "scripts": {
    "build": "cross-env NODE_ENV=production stencil build",
  },
  "devDependencies": {
    "@fullhuman/postcss-purgecss": "^1.3.0",
    "@stencil/postcss": "^1.0.1",
    "@types/autoprefixer": "^9.6.1",
    "@types/node": "^12.12.21",
    "autoprefixer": "^9.7.3",
    "cross-env": "^6.0.3",
    "cssnano": "^4.1.10",
    "serve": "^11.2.0",
    "tailwindcss": "^1.1.4"
  }
}
```

Update `stencil.config.ts` with `postcss` plugins and config.

```ts
import { Config }   from '@stencil/core';
import { postcss }  from "@stencil/postcss";
import autoprefixer from "autoprefixer";
import tailwindcss  from "tailwindcss";
import purgecss     from "@fullhuman/postcss-purgecss";
import cssnano      from "cssnano";

const purge = purgecss({
  content: ["./src/**/*.tsx", "./src/index.html"],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null,
      baseUrl: 'http://localhost:5000'
    }
  ],
  plugins: [
    postcss({
      plugins: [
        tailwindcss('./tailwind.config.js'),
        autoprefixer(),
        ...( process.env.NODE_ENV === "production" ? [ purge, cssnano() ] : [] )
      ]
    })
  ]
};
```

Add TailwindCSS imports to `global/app.css`.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Install dependencies, initialize `tailwind.config.js`, then serve the app.

```sh
npm install
npx tailwind init
npm run start
```

#### ESLint

Follow the [@stencil/eslint-plugin](https://github.com/ionic-team/stencil-eslint) instructions on how to add ESLint to a Stencil project (summarized below).

Install eslint, the  and its dependencies.

```sh
pnpm add -D eslint @typescript-eslint/parser @stencil/eslint-plugin
```

Create an `.eslintrc.json` file at the project root.

```json
{
  "root": true,
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "extends": [
    "plugin:@stencil/recommended"
  ]
}
```

## Troubleshooting

### ESLint

Using pnpm, it is possible that `eslint-plugin-react` is detected as a missing dependency. To fix this, install the plugin.

```sh
pnpm add -D eslint-plugin-react
```

When using the [ESLint extension for Visual Studio Code](https://github.com/microsoft/vscode-eslint), the typescript parser might complain about `stencil.config.ts` not being included in your project files. This happens because `tsconfig.json` has been referenced as a project in `.eslintrc.json`, and the stencil config file is not included there. For more information, see typescript-eslint issues [#890](https://github.com/typescript-eslint/typescript-eslint/issues/890) and [#967](https://github.com/typescript-eslint/typescript-eslint/issues/967).

There are several ways to fix this. The one employed in this repo is to add any root `*.ts` files to `tsconfig.json`.

```json
{
  "include": [
    "./*.ts"
  ],
}
```

Then, to avoid collisions with the recommended `@stencil/ban-side-effects` rule, move the `purgecss` options to the body of the `postcss` function in `stencil.config.ts`.

```ts
export const config: Config = {
  plugins: [
    postcss({
      plugins: [
        tailwindcss('./tailwind.config.js'),
        autoprefixer(),
        ...(process.env.NODE_ENV === 'production'
          ? [
            purgecss({
              content: ['./src/**/*.tsx', './src/index.html'],
              defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
            }),
            cssnano()
          ]
          : []
        )
      ]
    })
  ]
};
```
