class CommentView {
  _setupParallaxScroll() {
    const sectionComment = document.querySelector(".section-comment");
    const commentCards = document.querySelectorAll(".comment_cards");
    const comments = commentCards[0].querySelectorAll(".comment_card");
  }
  init() {
    this._setupParallaxScroll();
  }
}

export default new CommentView();
