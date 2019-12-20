import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true
})
export class AppHome {

  render() {
    return (
      <div class='app-home'>
        <p>
          Welcome to the Stencil + TailwindCSS App Starter.
        </p>

        <p>
          You can use this starter to build entire apps all with
          web components using Stencil and TailwindCSS!
        </p>

        <p>
          Check out the docs on
          <a href='https://stenciljs.com'> stenciljs.com</a> and
          <a href="https://tailwindcss.com/"> tailwindcss.com</a> to get started.
        </p>

        <stencil-route-link url='/profile/stencil'>
          <button>
            Profile page
          </button>
        </stencil-route-link>
      </div>
    );
  }
}
