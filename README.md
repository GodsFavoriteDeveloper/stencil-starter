<h1 align=center>Stencil + Tailwind Starter</h1>

A minimal starter app, based on the [Getting Started](https://stenciljs.com/docs/getting-started) guide, combining [Stencil](https://stenciljs.com/) and [Tailwind CSS](https://tailwindcss.com/). The repository was created following the excellent [Stencil example](https://github.com/jagreehal/setup-examples/tree/updated-stencil-1.12.3) provided by [Jag Reehal](https://github.com/jagreehal).

## Configuration

### Tailwind CSS

The original components have been modified to leverage [Tailwind CSS]() utility classes, applied in the corresponding component `*.css` file. To use inline classes in the `*.html`, the `shadow` option must be set to `false`.

### ESLint

Linting is configured to use the additional rules from [@stencil/eslint-plugin](https://github.com/ionic-team/stencil-eslint). Because this package seems to be based on [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react), a react version setting has been provided in `.eslintrc.json` to avoid any warnings.


## Develop

#### Clone and Setup

```sh
git clone git@github.com:davelsan/stencil-tailwind-starter.git
npm install
```

#### Command Cheatsheet

```sh
npm run build      # build for deployment
npm run generate   # generate new component
npm run lint       # lint and fix code
npm run serve      # build and serve for development
npm run test:unit  # run unit tests
npm run test:watch # run unit tests and watch for changes
npm run test:e2e   # run end-to-end tests
```
