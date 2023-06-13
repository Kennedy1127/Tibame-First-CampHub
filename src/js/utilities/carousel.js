class myCarousel {
  constructor(slider, arrows, numbers) {
    this._slider = slider;
    this._arrows = arrows;
    this._currentIndex = 0;
    this._numbers = numbers.querySelectorAll(".myCarousel_number");
    this._slides = slider.querySelectorAll(".myCarousel_slide");
  }

  _carouselTask(currentIndex, transitionMS = 500) {
    this._slider.style.transitionDuration = `${transitionMS}ms`;
    this._slider.style.transform = `translateX(${(-currentIndex - 1) * 100}%)`;

    if (transitionMS === 0) {
      setTimeout(() => {
        this._slider.style.transitionDuration = "500ms";
      }, 1);
    }
  }

  _removeActiveCarouselNumber() {
    this._numbers.forEach((number) =>
      number.classList.contains("myCarousel_number--active")
        ? number.classList.remove("myCarousel_number--active")
        : ""
    );
  }

  _prev() {
    if (this._currentIndex === -1) return;
    this._currentIndex--;
    this._carouselTask(this._currentIndex);

    this._removeActiveCarouselNumber();
    if (this._currentIndex > -1)
      this._numbers[this._currentIndex].classList.add(
        "myCarousel_number--active"
      );
  }

  _next() {
    if (this._currentIndex === this._slides.length) return;
    this._currentIndex++;
    this._carouselTask(this._currentIndex);
    this._removeActiveCarouselNumber();

    if (this._currentIndex < this._slides.length)
      this._numbers[this._currentIndex].classList.add(
        "myCarousel_number--active"
      );
  }

  _setupCarousel() {
    this._slider.append(this._slides[0].cloneNode(true));
    this._slider.prepend(this._slides[this._slides.length - 1].cloneNode(true));
    this._carouselTask(0);
  }

  _setupCarouselArrows() {
    const arrows = this._arrows.querySelectorAll(".myCarousel_arrow");
    arrows[0].addEventListener("click", () => {
      this._prev();
    });

    arrows[1].addEventListener("click", () => {
      this._next();
    });
  }

  _setupCarouselNumbers() {
    this._numbers.forEach((number, i) =>
      // number.addEventListener("click", this._carouselTask.bind(this, i))
      number.addEventListener("click", () => {
        this._currentIndex = i;
        this._carouselTask(this._currentIndex);
        this._removeActiveCarouselNumber();
        number.classList.add("myCarousel_number--active");
      })
    );
  }

  _setupCarouselDrag() {
    const myCarousel = this._slider.closest(".myCarousel");
    let pressed = false;
    let startX;
    let distance;

    ["mousedown", "touchstart"].forEach((event) =>
      myCarousel.addEventListener(event, (e) => {
        pressed = true;
        startX = event === "mousedown" ? e.offsetX : e.touches[0].clientX;
      })
    );

    myCarousel.addEventListener("mouseenter", () => {
      myCarousel.style.cursor = "grab";
    });

    ["mouseup", "mouseleave", "touchend"].forEach((event) =>
      myCarousel.addEventListener(event, () => {
        pressed = false;

        if (Math.abs(distance) < 15) {
          distance = null;
          return this._carouselTask(this._currentIndex);
        }

        if (distance >= 15) {
          distance = null;
          if (this._currentIndex === -1) return;

          this._currentIndex--;
          this._removeActiveCarouselNumber();
          if (this._currentIndex > -1)
            this._numbers[this._currentIndex].classList.add(
              "myCarousel_number--active"
            );
          return this._carouselTask(this._currentIndex);
        }

        if (distance <= 15) {
          distance = null;
          if (this._currentIndex === this._slides.length) return;

          this._currentIndex++;
          this._removeActiveCarouselNumber();
          if (this._currentIndex < this._slides.length)
            this._numbers[this._currentIndex].classList.add(
              "myCarousel_number--active"
            );
          return this._carouselTask(this._currentIndex);
        }
      })
    );

    ["mousemove", "touchmove"].forEach((event) =>
      myCarousel.addEventListener(event, (e) => {
        if (
          !pressed ||
          this._currentIndex === this._slides.length ||
          this._currentIndex === -1
        )
          return;

        e.preventDefault();
        distance =
          (((event === "mousemove" ? e.offsetX : e.touches[0].clientX) -
            startX) /
            myCarousel.getBoundingClientRect().width) *
          100;

        let maxSlideDistance =
          Math.abs(distance) > 15 ? (distance > 0 ? -10 : 10) : distance;

        this._slider.style.transform = `translateX(${
          (-this._currentIndex - 1) * 100 - maxSlideDistance
        }%)`;
      })
    );
  }

  _setupInfiniteCarousel() {
    this._slider.addEventListener("transitionend", () => {
      if (this._currentIndex === this._slides.length) {
        this._currentIndex = 0;
        this._carouselTask(this._currentIndex, 0);
        this._removeActiveCarouselNumber();
        this._numbers[0].classList.add("myCarousel_number--active");
      }

      if (this._currentIndex === -1) {
        this._currentIndex = this._slides.length - 1;
        this._carouselTask(this._currentIndex, 0);
        this._removeActiveCarouselNumber();
        this._numbers[this._slides.length - 1].classList.add(
          "myCarousel_number--active"
        );
      }
    });
  }

  init() {
    this._setupCarousel();
    this._setupCarouselArrows();
    this._setupCarouselNumbers();
    this._setupCarouselDrag();
    this._setupInfiniteCarousel();
  }
}

export default myCarousel;
