import { createApp } from "vue";
import App from "./App.vue";
import { createModalManager } from "./plugins/modal";

const app = createApp(App);
app.use(createModalManager());
app.mount("#app");
