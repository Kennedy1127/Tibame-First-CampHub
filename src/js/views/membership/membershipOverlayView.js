class MembershipOverlayView {
  _commentButtons = document.querySelectorAll(
    ".membership_booking_info_comment_button"
  );
  _body = document.querySelector("body");
  _overlay = document.querySelector(".membership_overlay");
  _cancelButton = document.querySelector(".membership_overlay_card_cancel");

  _checkOverlay() {
    this._overlay.classList.contains("membership_overlay--active")
      ? this._body.classList.add("no-scroll")
      : this._body.classList.remove("no-scroll");
  }

  _toggleOverlay() {
    this._overlay.classList.toggle("membership_overlay--active");
    this._body.classList.toggle("no-scroll");
  }

  _showOverlay() {
    this._commentButtons.forEach((button) =>
      button.addEventListener("click", () => this._toggleOverlay())
    );
  }

  _hiddenOverlay() {
    this._cancelButton.addEventListener("click", () => {
      this._toggleOverlay();
    });

    this._overlay.addEventListener("click", (e) => {
      if (e.target.classList.contains("membership_overlay--active")) {
        this._toggleOverlay();
      }
    });
  }

  _setupRating() {
    const stars = document.querySelectorAll(
      ".membership_overlay_card_rate .fa-star"
    );
    console.log(stars);
  }

  init() {
    this._checkOverlay();
    this._showOverlay();
    this._hiddenOverlay();
    this._setupRating();
  }
}

export default new MembershipOverlayView();
