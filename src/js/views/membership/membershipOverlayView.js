class MembershipOverlayView {
  constructor() {
    this._rates = 0;
    this._banner = "";
    this._selectStars = false;
  }
  _body = document.querySelector("body");

  _showOverlay() {
    window.addEventListener("click", (e) => {
      const button = e.target.closest(
        ".membership_booking_info_comment_button"
      );
      if (!button) return;
      const { id } = button.closest(".membership_booking").dataset;
      const membership = document.querySelector(".membership");
      this._banner = id;

      const overlayHtml = `
        <div class="membership_overlay membership_overlay--active" data-type="addReview">
          <div class="membership_overlay_card">
            <div class="membership_overlay_card_header_banner">${id}</div>
            <div class="membership_overlay_card_cancel">
              <i class="fa-solid fa-xmark"></i>
            </div>

            <div class="membership_overlay_card_header">
              <div class="membership_overlay_card_user-pic">U</div>
              <div class="membership_overlay_card_user-name">USER001</div>
              <div class="membership_overlay_card_rate">
                <i class="fa-solid fa-star" data-star-id=1></i>
                <i class="fa-solid fa-star" data-star-id=2></i>
                <i class="fa-solid fa-star" data-star-id=3></i>
                <i class="fa-solid fa-star" data-star-id=4></i>
                <i class="fa-solid fa-star" data-star-id=5></i>
              </div>
            </div>

            <div class="membership_overlay_card_content">
              <div class="membership_overlay_card_textarea">
                <textarea></textarea>
              </div>
            </div>

            <div class="membership_overlay_submit">
              <button class="membership_overlay_submit_button">Submit</button>
            </div>
          </div>
        </div>
      `;

      membership.insertAdjacentHTML("beforeend", overlayHtml);
      this._body.classList.add("no-scroll");
    });
  }

  _hiddenOverlay() {
    window.addEventListener("click", (e) => {
      if (
        !e.target.classList.contains("membership_overlay") &&
        !e.target.classList.contains("fa-xmark")
      )
        return;

      const membershipOverlay = document.querySelector(".membership_overlay");
      membershipOverlay.remove();
      this._body.classList.remove("no-scroll");
    });
  }

  _setupRating() {
    window.addEventListener("mouseover", (e) => {
      if (
        !e.target.classList.contains("fa-star") ||
        !e.target.closest(".membership_overlay_card_rate") ||
        this._selectStars
      )
        return;

      const { starId } = e.target.dataset;

      const stars = document.querySelectorAll(
        ".membership_overlay_card_rate .fa-star"
      );
      stars.forEach((star) => star.classList.remove("active"));
      for (let i = 0; i < Number(starId); i++) {
        stars[i].classList.add("active");
      }
    });

    window.addEventListener("mouseover", (e) => {
      if (
        e.target.closest(".membership_overlay_card_rate") ||
        this._selectStars
      )
        return;

      const stars = document.querySelectorAll(
        ".membership_overlay_card_rate .fa-star"
      );

      stars.forEach((star) => star.classList.remove("active"));
    });

    window.addEventListener("click", (e) => {
      if (
        !e.target.classList.contains("fa-star") ||
        !e.target.closest(".membership_overlay_card_rate")
      )
        return;
      const { starId } = e.target.dataset;
      const stars = document.querySelectorAll(
        ".membership_overlay_card_rate .fa-star"
      );

      stars.forEach((star) => star.classList.remove("active"));
      if (this._rates === Number(starId)) {
        this._selectStars = false;
        this._rates = 0;
        return;
      }

      this._selectStars = true;
      this._rates = Number(starId);

      for (let i = 0; i < Number(starId); i++) {
        stars[i].classList.add("active");
      }
    });
  }

  _setupSubmitComment() {
    window.addEventListener("click", (e) => {
      if (!e.target.classList.contains("membership_overlay_submit_button"))
        return;

      const textarea = document.querySelector(
        ".membership_overlay_card_textarea textarea"
      );

      const obj = {
        id: Date.now().toString().slice(-7),
        userName: "USER001",
        userIcon: "default",
        text: textarea.value,
        date: `${
          new Date().getMonth() + 1
        }/${new Date().getDate()}/${new Date().getFullYear()}`,
        rates: this._rates || 0,
        banner: this._banner,
      };

      const userReviews =
        JSON.parse(sessionStorage.getItem("userReviews")) || [];
      userReviews.unshift(obj);
      sessionStorage.setItem("userReviews", JSON.stringify(userReviews));

      const membershipOverlay = document.querySelector(".membership_overlay");
      membershipOverlay.remove();
      this._body.classList.remove("no-scroll");

      const membershipReviews = document.querySelector(".membership_reviews");

      const generateStar = (num) => {
        let starHtml = "";
        for (let i = 0; i < 5; i++) {
          i < num
            ? (starHtml += '<i class="fa-solid fa-star active"></i>')
            : (starHtml += '<i class="fa-solid fa-star"></i>');
        }

        return starHtml;
      };

      const reivewHtml = `
      <div class="membership_review" data-id="${obj.id}">
        <div class="membership_review_banner">${obj.banner}</div>

        <div class="membership_review_header">
          <div class="membership_review_user-pic">U</div>
          <div class="membership_review_user-name">${obj.userName}</div>
          <div class="membership_review_date">${obj.date}</div>
          <div class="membership_reivew_rate">
            ${generateStar(obj.rates)}
          </div>
        </div>

        <div class="membership_review_content">
          <p class="membership_review_text">
            ${obj.text}
          </p>

          <div class="membership_review_features">
            <div class="membership_feature membership_feature--update">
              <i class="fa-solid fa-pen-to-square"></i>
            </div>

            <div class="membership_feature membership_feature--delete">
              <i class="fa-solid fa-trash-can"></i>
            </div>
          </div>
        </div>
      </div>
    `;

      membershipReviews.insertAdjacentHTML("afterbegin", reivewHtml);
    });
  }

  init() {
    this._showOverlay();
    this._hiddenOverlay();
    this._setupRating();
    this._setupSubmitComment();
  }
}

export default new MembershipOverlayView();
