import { Component, h } from '@stencil/core';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: false
})
export class AppRoot {

  render() {
    return (
      <div>
        <header class="flex items-center bg-blue-600 text-white shadow-xl">
          <stencil-route-link url="/">
            <img
              class="ml-4 w-10"
              src="../../assets/icon/icon.png"
            />
          </stencil-route-link>
          <h1 class="p-4 font-medium text-2xl">
            Stencil + Tailwind Starter
          </h1>
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={ 0 }>
              <stencil-route
                url='/'
                component='app-home'
                exact={ true }
              />
              <stencil-route
                url='/profile/:name'
                component='app-profile'
              />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
