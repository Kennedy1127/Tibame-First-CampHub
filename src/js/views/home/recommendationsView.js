class RecommendationsView {
  _recommendCards = document.querySelectorAll(".recommend_card");
  _recommendIntroOrders = document.querySelectorAll(".recommend_intro_order");

  _addActiveIntroOrder() {
    this._recommendCards.forEach((card, i) =>
      card.classList.contains("recommend_card--active")
        ? this._recommendIntroOrders[i].classList.add(
            "recommend_intro_order--active"
          )
        : ""
    );
  }

  _removeActiveIntroOrder() {
    this._recommendIntroOrders.forEach((order) =>
      order.classList.contains("recommend_intro_order--active")
        ? order.classList.remove("recommend_intro_order--active")
        : ""
    );
  }

  _removeActiveCard() {
    this._recommendCards.forEach((card) =>
      card.classList.contains("recommend_card--active")
        ? card.classList.remove("recommend_card--active")
        : ""
    );
  }

  _recommendCardObservation() {
    this._recommendCards.forEach((card) => {
      const option = {
        root: null,
        threshold: 0.6,
      };

      const callback = (entries, _) => {
        if (!entries[0].isIntersecting) return;
        this._removeActiveCard();
        entries[0].target.classList.add("recommend_card--active");
        this._removeActiveIntroOrder();
        this._addActiveIntroOrder();
      };

      const observer = new IntersectionObserver(callback, option);
      observer.observe(card);
    });
  }

  _clickOrderCardScroll() {
    this._recommendIntroOrders.forEach((order, i) =>
      order.addEventListener("click", () => {
        this._recommendCards[i].scrollIntoView({ behavior: "smooth" });
      })
    );
  }

  _darwCurtains() {
    const sectionRecommend = document.querySelector(".section-recommend");

    const callback = (entries, _) => {
      if (!entries[0].isIntersecting) return;
      const borders = document.querySelectorAll(".recommend_background-border");
      borders[0].classList.add("recommend_background-border--left--draw");
      borders[1].classList.add("recommend_background-border--right--draw");
    };

    const option = {
      root: null,
      rootMargin: "-300px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(callback, option);
    observer.observe(sectionRecommend);
  }

  _removeOverflowClipOnBorders() {
    const sectionRecommend = document.querySelector(".section-recommend");
    const sectionTourism = document.querySelector(".section-tourism");

    const callback = (entries, _) => {
      if (!entries[0].isIntersecting) return;
      sectionRecommend.style.overflowY = "initial";
    };
    const option = {
      root: null,
      threshold: 0,
    };

    const observer = new IntersectionObserver(callback, option);
    observer.observe(sectionTourism);
  }

  _changeBordersIndex() {
    const firstRecommendCard = document.querySelector(".recommend_card");

    const callback = (entries, _) => {
      if (!entries[0].isIntersecting) return;

      const stickyBorders = document.querySelectorAll(
        ".recommend_background-borders"
      );

      stickyBorders.forEach((border) => {
        border.style.zIndex = "1";
      });
    };
    const option = {
      root: null,
      threshold: 1,
    };

    const observer = new IntersectionObserver(callback, option);
    observer.observe(firstRecommendCard);
  }

  _setupCarAnimation() {
    const sectionRecommend = document.querySelector(".section-recommend");
    const sectionRooms = document.querySelector(".section-rooms");
    const tourismGallery = document.querySelector(".tourism_gallery");
    const backgroundCar = document.querySelector(".recommend_background-car");

    const addCar = (entries, _) => {
      if (!entries[0].isIntersecting) return;
      backgroundCar.classList.add("recommend_background-car--active");
    };
    const option = {
      root: null,
      rootMargin: "-50%",
      threshold: 0,
    };

    const recommendObserver = new IntersectionObserver(addCar, option);
    recommendObserver.observe(sectionRecommend);

    const removeCar = (entries, _) => {
      if (!entries[0].isIntersecting) return;
      backgroundCar.classList.remove("recommend_background-car--active");
    };

    const sectionRoomsObserver = new IntersectionObserver(removeCar, {
      threshold: 0.3,
    });
    sectionRoomsObserver.observe(sectionRooms);

    const galleryObserver = new IntersectionObserver(removeCar);
    galleryObserver.observe(tourismGallery);
  }

  init() {
    this._recommendCardObservation();
    this._clickOrderCardScroll();
    this._darwCurtains();
    this._removeOverflowClipOnBorders();
    // this._changeBordersIndex();
    this._setupCarAnimation();
  }
}

export default new RecommendationsView();
