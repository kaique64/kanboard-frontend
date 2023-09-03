
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { Buffer } from 'buffer';
import { AppFullscreen, Loading, LocalStorage, Notify, Quasar, useQuasar } from 'quasar';

import '@quasar/extras/material-icons/material-icons.css';

import 'quasar/src/css/index.sass';
import App from './App.vue';
import '@quasar/extras/mdi-v6/mdi-v6.css'

const run = () => {
  const global = window;
  global.Buffer = Buffer;
  window.process = {
    env: {
      NODE_ENV: import.meta.env.NODE_ENV
    }
  }
  const modules = import.meta.globEager('/src/modules/*.ts');
  Object.values(modules).forEach((module) => module.install?.(app));

  const pinia = createPinia();
  const app = createApp(App);

  // In case of redeployed frontend the currently active users might have problems to dynamically load JS modules.
  // For that problem we catch the resulting error and force a reloading of the page.
  window.addEventListener('unhandledrejection', function(event) {
    console.log(event);

    if (event instanceof PromiseRejectionEvent && event.isTrusted) {
      const messageToCheck = event.reason.toString();
      console.log(messageToCheck);

      const messagesToReload = [
        'TypeError: Failed to fetch dynamically imported module',
        'Error: Unable to preload CSS for',
        'TypeError: error loading dynamically imported module'
      ];

      messagesToReload.forEach((messageToReload) => {
        console.log(
          'checking for reloadMessage starting with: ' + messageToReload
        );
        if (
          messageToCheck.toLowerCase().startsWith(messageToReload.toLowerCase())
        ) {
          console.log('force reloading of the page...');
          window.location.reload();
        }
      });
    }
  });

  const config = {
    plugins: { Notify, LocalStorage, AppFullscreen, Loading },  
    extends: ['material-icons']
  };

  app.use(pinia)
  app.use(Quasar, config);
  app.mount('#app');
}

run();