export const freezeBody = (): void => {
  window.document.body.style.overflow = "hidden";
};

export const unfreezeBody = (): void => {
  window.document.body.style.overflow = "";
};
