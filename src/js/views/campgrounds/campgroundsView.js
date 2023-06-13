class CampgroundsView {
  _setupClickCampgroundPic() {
    const headerPics = document.querySelectorAll(".room_header_pic");
    const contentPics = document.querySelectorAll(".room_content_pic");
    const headers = [...headerPics].map((headerPic) =>
      headerPic.closest(".room_header")
    );
    const contents = [...contentPics].map((content) =>
      content.closest(".room_content")
    );

    headers.forEach((header) => (header.style.zIndex = 0));

    contents.forEach((content) => (content.style.zIndex = 1));

    const imgEffect = (img, parent, opponent) => {
      img.style.opacity = "0";
      img.style.transition = "0.5s";
      setTimeout(() => {
        parent.style.zIndex = "1";
        opponent.style.zIndex = "0";
        img.style.opacity = "1";
      }, 500);
    };

    headerPics.forEach((headerPic, i) =>
      headerPic.addEventListener("click", () => {
        if (headers[i].style.zIndex === "1") return;

        imgEffect(headerPic, headers[i], contents[i]);
      })
    );

    contentPics.forEach((contentPic, i) =>
      contentPic.addEventListener("click", () => {
        if (contents[i].style.zIndex === "1") return;

        imgEffect(contentPic, contents[i], headers[i]);
      })
    );
  }

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

  _clickBookNowLink() {
    const links = document.querySelectorAll(".room_content_link");

    links.forEach((link) =>
      link.addEventListener("click", (e) => {
        sessionStorage.setItem(
          "reservationTarget",
          `${e.target.dataset.target}`
        );
      })
    );
  }

  init() {
    if (window.innerWidth <= 450) {
      this._setupClickCampgroundPic();
    }

    this._setupSectionsAnimation();
    this._clickBookNowLink();
  }
}

export default new CampgroundsView();
