class membershipNavigationView {
  _navigationButtons = document.querySelectorAll(
    ".membership_navigation_button"
  );

  _membershipContents = document.querySelector(".membership_content").children;

  _removeActiveNavigationButton() {
    this._navigationButtons.forEach((button) =>
      button.classList.remove("membership_navigation_button--active")
    );
  }

  _removeActiveContent() {
    [...this._membershipContents].forEach((content) =>
      content.classList.remove("membership_content--active")
    );
  }

  _clickNavigationButton() {
    this._navigationButtons.forEach((button, i) =>
      button.addEventListener("click", (e) => {
        if (!e.target.closest(".membership_navigation_button")) return;
        this._removeActiveNavigationButton();
        button.classList.add("membership_navigation_button--active");

        this._removeActiveContent();
        [...this._membershipContents][i].classList.add(
          "membership_content--active"
        );
      })
    );
  }

  init() {
    this._clickNavigationButton();
  }
}

export default new membershipNavigationView();
