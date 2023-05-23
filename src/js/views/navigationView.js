class NavigationView {
  clickMenuButton() {
    const menuButton = document.querySelector(".navigation_button");
    const navigationOverlay = document.querySelector(".navigation_overlay");

    menuButton.addEventListener("click", () => {
      menuButton.classList.toggle("navigation_button--active");
      navigationOverlay.classList.toggle("navigation_overlay--show");
    });
  }
}

export default new NavigationView();
