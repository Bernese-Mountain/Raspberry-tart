import type { App } from 'vue';
import { createPinia } from 'pinia';

const pinia = createPinia();

export function setupStore(app: App<Element>) {
  app.use(pinia);
  console.log("1.storeHasBeenSetted");
}

export { pinia };
