import navigationView from "../../views/navigationView.js";
import campgroundsView from "../../views/campgrounds/campgroundsView.js";
import commentView from "../../views/campgrounds/commentView.js";

const init = () => {
  navigationView.init();
  campgroundsView.init();
  commentView.init();
};

init();
