import { ModalKey } from "./types";

export class ModalManagerInjectionError extends Error {
  static readonly errorName = "ModalManagerInjectionError";

  constructor() {
    super("No ModalManager instance is injected.");
    this.name = ModalManagerInjectionError.errorName;
  }
}

export class ModalComponentNotProvidedError extends Error {
  static readonly errorName = "ModalComponentNotProvidedError";

  readonly expectedModalKey: ModalKey;

  constructor(expectedModalKey: ModalKey) {
    super(`Modal component "${String(expectedModalKey)}" is not provided.`);
    this.name = ModalComponentNotProvidedError.errorName;
    this.expectedModalKey = expectedModalKey;
  }
}
