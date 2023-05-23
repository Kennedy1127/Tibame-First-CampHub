class StepView {
  _toggleStepHeader(stepHeader) {
    stepHeader.addEventListener("click", (e) => {
      const stepHeader = e.target.closest(".step_header");
      const arrow = stepHeader.querySelector("i");

      if (!stepHeader) return;
      stepHeader.classList.toggle("step_header--active");
      arrow.classList.toggle("fa-chevron-up");
      arrow.classList.toggle("fa-chevron-down");
    });
  }

  setupStepHeaders() {
    const stepHeaders = document.querySelectorAll(".step_header");
    stepHeaders.forEach((stepHeader) => this._toggleStepHeader(stepHeader));
  }
}

export default new StepView();
