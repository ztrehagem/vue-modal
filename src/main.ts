import { createApp } from "vue";
import App from "./App.vue";
import HelloModal from "./components/HelloModal.vue";
import { ModalManager } from "./lib/main";
import { ModalTypes } from "./modal";

const modalManager = new ModalManager<ModalTypes>();
modalManager.addComponent("hello", HelloModal);

const app = createApp(App);
app.use(modalManager);
app.mount("#app");
