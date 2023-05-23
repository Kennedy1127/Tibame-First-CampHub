class ConceptView {
  _setupConceptCardHeaderAnimation() {
    const conceptContent = document.querySelector(".concept_content");
    const conceptCardTitles = document.querySelectorAll(
      ".concept_content_card_title"
    );
    const conceptCardPics = document.querySelectorAll(
      ".concept_content_card_pic"
    );

    const callback = (entries) => {
      if (!entries[0].isIntersecting) return;
      conceptCardTitles.forEach((el) =>
        el.classList.add("concept_content_card_title--animation")
      );
      conceptCardPics.forEach((el) =>
        el.classList.add("concept_content_card_pic--animation")
      );
    };

    const option = {
      root: null,
      rootMargin: "-50px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(callback, option);
    observer.observe(conceptContent);
  }

  init() {
    this._setupConceptCardHeaderAnimation();
  }
}

export default new ConceptView();
