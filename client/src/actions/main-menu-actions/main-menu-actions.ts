import { action } from "mobx";
import { mainMenuStore } from "src/stores";

export const mobileToggleMainMenuVisibility = action(() => {
  const { isOpen } = mainMenuStore;
  const isCurrentlyOnMobileResolution = window.innerWidth <= 800;

  if (isCurrentlyOnMobileResolution) {
    mainMenuStore.isOpen = !isOpen;
  }
});

export const showMainMenu = action(() => {
  mainMenuStore.isOpen = true;
});

export const hideMainMenu = action(() => {
  mainMenuStore.isOpen = false;
});
