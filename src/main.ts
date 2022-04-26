import { createApp } from "vue";
import App from "./App";
import HelloModal from "./components/HelloModal";
import { createModalManager } from "./plugins/modal";

const modalManager = createModalManager();
modalManager.addComponent("hello", HelloModal);

const app = createApp(App);
app.use(modalManager);
app.mount("#app");
