import { action } from "mobx";

import { mainMenuStore } from "../../stores";

export const mobileToggleMainMenuVisibility = action(() => {
  const { isOpen } = mainMenuStore;
  const isCureentlyOnMobileResolution = window.innerWidth <= 800;

  if (isCureentlyOnMobileResolution) {
    mainMenuStore.isOpen = !isOpen;
  }
});
