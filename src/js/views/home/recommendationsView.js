class RecommendationsView {
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
      rootMargin: "-150px",
      // rootMargin: "0px",
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
      rootMargin: "-25%",
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

  _recommendCardObservation() {
    const cards = document.querySelectorAll(".recommend_card");
    const introOrders = document.querySelectorAll(".recommend_intro_order");
    const currentWindowWidth = window.innerWidth;

    const removeActiveCard = () => {
      cards.forEach((card, i) => {
        card.classList.contains("recommend_card--active")
          ? card.classList.remove("recommend_card--active")
          : "";

        introOrders[i].classList.contains("recommend_intro_order--active")
          ? introOrders[i].classList.remove("recommend_intro_order--active")
          : "";
      });
    };

    cards.forEach((card, i) => {
      const callback = (entries) => {
        if (!entries[0].isIntersecting) return;
        removeActiveCard();
        entries[0].target.classList.add("recommend_card--active");
        introOrders[i].classList.add("recommend_intro_order--active");
      };

      const option = {
        root: null,
        threshold: currentWindowWidth >= 1200 ? 0.4 : 0.8,
      };

      const observer = new IntersectionObserver(callback, option);
      observer.observe(card);
    });
  }

  _clickOrderCardScroll() {
    const cards = document.querySelectorAll(".recommend_card");
    const introOrders = document.querySelectorAll(".recommend_intro_order");

    introOrders.forEach((introOrder, i) => {
      introOrder.addEventListener("click", () => {
        cards[i].scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  init() {
    this._recommendCardObservation();
    this._clickOrderCardScroll();
    this._darwCurtains();
    this._removeOverflowClipOnBorders();
    this._setupCarAnimation();
  }
}

export default new RecommendationsView();
