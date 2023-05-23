class CampgroundsView {
  _setupSectionsAnimation() {
    const rooms = document.querySelector(".rooms");
    const gallery = document.querySelector(".gallery");
    const comment = document.querySelector(".comment");

    const callback = (entries, _) => {
      if (!entries[0].isIntersecting) return;
      entries[0].target.classList.add("section-animation");
    };

    const observer = new IntersectionObserver(callback);
    observer.observe(rooms);
    observer.observe(gallery);
    // observer.observe(comment);
  }

  init() {
    this._setupSectionsAnimation();
  }
}

export default new CampgroundsView();
