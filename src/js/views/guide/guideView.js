class GuideView {
  scrollGuideStep() {
    const guides = document.querySelectorAll(".guide_step");
    const steps = document.querySelectorAll(".step");

    guides.forEach((guide, i) =>
      guide.addEventListener("click", (e) => {
        const guide = e.target.closest(".guide_step");
        if (!guide) return;

        const indexOfStep = [...guides].indexOf(guide);
        steps[indexOfStep].scrollIntoView({ behavior: "smooth" });
      })
    );
  }
}

export default new GuideView();
