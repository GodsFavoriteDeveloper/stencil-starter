import { Component, h } from '@stencil/core';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {

  render() {
    return (
      <div>
        <header>
          <stencil-route-link url="/">
            <img class="flex items-center" src="../../assets/icon/icon.png" />
          </stencil-route-link>
          <h1>
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
