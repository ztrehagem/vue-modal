import { createApp } from "vue";
import App from "./App";
import { createModalManager } from "./plugins/modal";

const modalManager = createModalManager();

const app = createApp(App);
app.use(modalManager);
app.mount("#app");

Object.defineProperty(window, "app", { value: app });
Object.defineProperty(window, "modal", { value: modalManager });
