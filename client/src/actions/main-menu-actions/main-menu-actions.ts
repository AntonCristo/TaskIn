import { action } from "mobx";

import { mainMenuStore } from "../../stores";

export const mobileToggleMainMenuVisibility = action(() => {
  const { isOpen } = mainMenuStore;
  const isCurrentlyOnMobileResolution = window.innerWidth <= 800;

  if (isCurrentlyOnMobileResolution) {
    mainMenuStore.isOpen = !isOpen;
  }
});
