export class ModalManagerInjectionError extends Error {
  static readonly errorName = "ModalManagerInjectionError";

  constructor() {
    super("No ModalManager instance is injected.");
    this.name = ModalManagerInjectionError.errorName;
  }
}
