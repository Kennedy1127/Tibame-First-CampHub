class RoomsView {
  _roomWrappers = document.querySelectorAll(".room_carousel_pics_wrapper");
  _barNumbers = document.querySelectorAll(".room_carousel_bar_numbers");
  _barArrows = document.querySelectorAll(".room_carousel_bar_arrows");

  constructor() {
    this._currentIndex = [0, 0];
    this._picsLength =
      this._roomWrappers[0].querySelectorAll(".room_carousel_pic").length;

    this._carouselNumbers = [...this._barNumbers].map((numbers) =>
      numbers.querySelectorAll(".room_carousel_bar_number")
    );
  }

  _carouselTask(roomWrapper, currentIndex, transitionMS = 500) {
    roomWrapper.style.transitionDuration = `${transitionMS}ms`;
    roomWrapper.style.transform = `translateX(${(-currentIndex - 1) * 100}%)`;
  }

  _setupCarousel() {
    this._roomWrappers.forEach((wrapper, i) => {
      const carouselPics = wrapper.querySelectorAll(".room_carousel_pic");
      const carouselCloneTop =
        carouselPics[carouselPics.length - 1].cloneNode(true);
      const carouselCloneBottom = carouselPics[0].cloneNode(true);

      wrapper.prepend(carouselCloneTop);
      wrapper.append(carouselCloneBottom);

      this._carouselTask(this._roomWrappers[i], this._currentIndex[i]);
    });
  }

  _prev(roomIndex) {
    if (this._currentIndex[roomIndex] <= -1) return;

    this._currentIndex[roomIndex] -= 1;
    this._carouselTask(
      this._roomWrappers[roomIndex],
      this._currentIndex[roomIndex]
    );

    if (this._currentIndex[roomIndex] <= -1) return;
    this._removeActiveCarouselNumbers(this._carouselNumbers[roomIndex]);
    this._activeSelectedCarouselNumber(
      this._carouselNumbers[roomIndex][this._currentIndex[roomIndex]]
    );
  }

  _next(roomIndex) {
    if (this._currentIndex[roomIndex] >= this._picsLength) return;

    this._currentIndex[roomIndex] += 1;
    this._carouselTask(
      this._roomWrappers[roomIndex],
      this._currentIndex[roomIndex]
    );

    if (this._currentIndex[roomIndex] === this._picsLength) return;
    this._removeActiveCarouselNumbers(this._carouselNumbers[roomIndex]);
    this._activeSelectedCarouselNumber(
      this._carouselNumbers[roomIndex][this._currentIndex[roomIndex]]
    );
  }

  _infiniteCarousel() {
    this._roomWrappers.forEach((wrapper, i) =>
      wrapper.addEventListener("transitionend", () => {
        if (this._currentIndex[i] <= -1) {
          this._currentIndex[i] = this._picsLength - 1;

          this._removeActiveCarouselNumbers(this._carouselNumbers[i]);
          this._activeSelectedCarouselNumber(
            this._carouselNumbers[i][this._currentIndex[i]]
          );
        }

        if (this._currentIndex[i] >= this._picsLength) {
          this._currentIndex[i] = 0;

          this._removeActiveCarouselNumbers(this._carouselNumbers[i]);
          this._activeSelectedCarouselNumber(
            this._carouselNumbers[i][this._currentIndex[i]]
          );
        }

        this._carouselTask(this._roomWrappers[i], this._currentIndex[i], 0);
      })
    );
  }

  _setupCarouselArrow() {
    const carouselArrows = [...this._barArrows].map((arrows) =>
      arrows.querySelectorAll(".room_carousel_bar_arrow")
    );

    carouselArrows.forEach((arrows, i) => {
      arrows.forEach((arrow, direction) =>
        arrow.addEventListener("click", () => {
          direction === 0 ? this._prev(i) : this._next(i);
        })
      );
    });
  }

  _removeActiveCarouselNumbers(numbers) {
    numbers.forEach((number) =>
      number.classList.remove("room_carousel_bar_number--active")
    );
  }

  _activeSelectedCarouselNumber(number) {
    number.classList.toggle("room_carousel_bar_number--active");
  }

  _setupCarouselButton() {
    this._carouselNumbers.forEach((numbers, roomIndex) =>
      numbers.forEach((number, i) =>
        number.addEventListener("click", () => {
          this._removeActiveCarouselNumbers(numbers);
          this._activeSelectedCarouselNumber(number);

          this._carouselTask(this._roomWrappers[roomIndex], i);
          this._currentIndex[roomIndex] = i;
        })
      )
    );
  }

  _setupSectionRoomsAnimation() {
    const sectionRooms = document.querySelector(".section-rooms");
    const rooms = document.querySelector(".rooms");

    const callback = (entries) => {
      if (!entries[0].isIntersecting) return;
      rooms.classList.add("rooms--animation");
    };

    const option = {
      root: null,
      rootMargin: "-100px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(callback, option);
    observer.observe(sectionRooms);
  }

  init() {
    this._setupCarousel();
    this._setupCarouselArrow();
    this._setupCarouselButton();
    this._infiniteCarousel();
  }
}

export default new RoomsView();
