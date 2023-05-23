import navigationView from "../views/navigationView.js";
import guideView from "../views/guide/guideView.js";
import stepView from "../views/guide/stepView.js";

const init = () => {
  navigationView.clickMenuButton();
  guideView.scrollGuideStep();
  stepView.setupStepHeaders();
};
init();
