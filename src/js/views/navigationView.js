class NavigationView {
  _clickMenuButton() {
    const menuButton = document.querySelector(".navigation_button");
    const navigationOverlay = document.querySelector(".navigation_overlay");

    menuButton.addEventListener("click", () => {
      menuButton.classList.toggle("navigation_button--active");
      navigationOverlay.classList.toggle("navigation_overlay--show");
    });
  }

  init() {
    this._clickMenuButton();
  }
}

export default new NavigationView();
