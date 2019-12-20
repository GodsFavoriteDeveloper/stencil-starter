import { Config }   from '@stencil/core';
import { postcss }  from '@stencil/postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss  from 'tailwindcss';
import purgecss     from '@fullhuman/postcss-purgecss';
import cssnano      from 'cssnano';

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  outputTargets: [
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: null,
      baseUrl: 'http://localhost:5000'
    }
  ],
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
          : [])
      ]
    })
  ]
};
