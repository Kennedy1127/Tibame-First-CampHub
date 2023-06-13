class MembershipReviewsView {
  constructor() {
    this._selectStars = true;
    this._rates = 0;
    this._banner = "";
    this._id = "";
  }
  _body = document.querySelector("body");

  _renderReviews(data) {
    const membershipReviews = document.querySelector(".membership_reviews");

    const generateStar = (num) => {
      let starHtml = "";
      for (let i = 0; i < 5; i++) {
        i < num
          ? (starHtml += `<i class="fa-solid fa-star active" data-star-id=${
              i + 1
            }></i>`)
          : (starHtml += `<i class="fa-solid fa-star" data-star-id=${
              i + 1
            }></i>`);
      }

      return starHtml;
    };

    data.forEach((review) => {
      const reivewHtml = `
      <div class="membership_review" data-id="${review.id}">
        <div class="membership_review_banner">${review.banner}</div>

        <div class="membership_review_header">
          <div class="membership_review_user-pic">U</div>
          <div class="membership_review_user-name">${review.userName}</div>
          <div class="membership_review_date">${review.date}</div>
          <div class="membership_reivew_rate">
            ${generateStar(review.rates)}
          </div>
        </div>

        <div class="membership_review_content">
          <p class="membership_review_text">
            ${review.text}
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

      membershipReviews.insertAdjacentHTML("beforeend", reivewHtml);
    });
  }

  _deleteReview() {
    window.addEventListener("click", (e) => {
      if (
        !e.target.classList.contains("fa-solid fa-trash-can") &&
        !e.target.closest(".membership_feature--delete ")
      )
        return;

      const review = e.target.closest(".membership_review");
      review.remove();

      let userReviews = JSON.parse(sessionStorage.getItem("userReviews")) || [];

      userReviews = userReviews.filter(
        (userReview) => userReview.id !== review.dataset.id
      );

      sessionStorage.setItem("userReviews", JSON.stringify(userReviews));
    });
  }

  _renderUpdateReviewOverlay() {
    const generateStar = (num) => {
      let starHtml = "";
      for (let i = 0; i < 5; i++) {
        i < num
          ? (starHtml += `<i class="fa-solid fa-star active" data-star-id=${
              i + 1
            }></i>`)
          : (starHtml += `<i class="fa-solid fa-star" data-star-id=${
              i + 1
            }></i>`);
      }
      return starHtml;
    };

    window.addEventListener("click", (e) => {
      if (
        !e.target.classList.contains("fa-solid fa-pen-to-square") &&
        !e.target.closest(".membership_feature--update ")
      )
        return;
      const membership = document.querySelector(".membership");
      const reivew = e.target.closest(".membership_review");
      const banner = reivew.querySelector(
        ".membership_review_banner"
      ).textContent;
      const rates = reivew.querySelectorAll(".fa-solid.fa-star.active").length;
      const text = reivew
        .querySelector(".membership_review_text")
        .textContent.trim();

      this._rates = rates;
      this._banner = banner;
      this._id = reivew.dataset.id;

      const overlayHtml = `
        <div class="membership_overlay membership_overlay--active">
          <div class="membership_overlay_card">
            <div class="membership_overlay_card_header_banner">${banner}</div>
            <div class="membership_overlay_card_cancel">
              <i class="fa-solid fa-xmark"></i>
            </div>

            <div class="membership_overlay_card_header">
              <div class="membership_overlay_card_user-pic">U</div>
              <div class="membership_overlay_card_user-name">USER001</div>
              <div class="membership_overlay_card_rate--update">
                ${generateStar(rates)}
              </div>
            </div>

            <div class="membership_overlay_card_content">
              <div class="membership_overlay_card_textarea--update">
                <textarea>${text}</textarea>
              </div>
            </div>

            <div class="membership_overlay_submit">
              <button class="membership_overlay_submit_button--update">Submit</button>
            </div>
          </div>
        </div>
      `;

      membership.insertAdjacentHTML("beforeend", overlayHtml);
      this._body.classList.add("no-scroll");
    });
  }

  _setupRating() {
    window.addEventListener("mouseover", (e) => {
      if (
        !e.target.classList.contains("fa-star") ||
        !e.target.closest(".membership_overlay_card_rate--update") ||
        this._selectStars
      )
        return;

      const { starId } = e.target.dataset;

      const stars = document.querySelectorAll(
        ".membership_overlay_card_rate--update .fa-star"
      );
      stars.forEach((star) => star.classList.remove("active"));
      for (let i = 0; i < Number(starId); i++) {
        stars[i].classList.add("active");
      }
    });

    window.addEventListener("mouseover", (e) => {
      if (
        e.target.closest(".membership_overlay_card_rate--update") ||
        this._selectStars
      )
        return;

      const stars = document.querySelectorAll(
        ".membership_overlay_card_rate--update .fa-star"
      );

      stars.forEach((star) => star.classList.remove("active"));
    });

    window.addEventListener("click", (e) => {
      if (
        !e.target.classList.contains("fa-star") ||
        !e.target.closest(".membership_overlay_card_rate--update")
      )
        return;

      const { starId } = e.target.dataset;
      const stars = document.querySelectorAll(
        ".membership_overlay_card_rate--update .fa-star"
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

  _setupSubmitUppdate() {
    window.addEventListener("click", (e) => {
      if (
        !e.target.classList.contains("membership_overlay_submit_button--update")
      )
        return;

      const textarea = document.querySelector(
        ".membership_overlay_card_textarea--update textarea"
      );

      const obj = {
        id: this._id,
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

      const indexOfUserReview = userReviews.findIndex(
        (userReview) => userReview.id === this._id
      );

      if (indexOfUserReview !== -1) {
        userReviews[indexOfUserReview] = obj;
        sessionStorage.setItem("userReviews", JSON.stringify(userReviews));
      }

      const membershipOverlay = document.querySelector(".membership_overlay");

      membershipOverlay.remove();
      this._body.classList.remove("no-scroll");

      const reviews = document.querySelectorAll(".membership_review");
      const targetReview = [...reviews].find(
        (review) => review.dataset.id === this._id
      );

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
      `;

      targetReview.innerHTML = reivewHtml;
    });
  }

  init(data) {
    this._renderReviews(data);
    this._deleteReview();
    this._renderUpdateReviewOverlay(data);
    this._setupRating();
    this._setupSubmitUppdate();
  }
}

export default new MembershipReviewsView();
