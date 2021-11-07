export function freezeBody(): void {
  window.document.body.style.overflow = "hidden";
}

export function unfreezeBody(): void {
  window.document.body.style.overflow = "";
}
