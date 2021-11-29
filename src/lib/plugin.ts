import { PluginObject } from "vue";
import { ModalManager } from "./ModalManager";

export interface Options {
  managerPropertyName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  manager: ModalManager<any>;
}

const plugin: PluginObject<Options> = {
  install(Vue, options) {
    if (!options?.manager) {
      throw new Error("ModalManager must be provided.");
    }

    const managerPropertyName = options.managerPropertyName ?? "$modal";

    Object.defineProperty(Vue.prototype, managerPropertyName, {
      value: options.manager,
    });
  },
};

export default plugin;
