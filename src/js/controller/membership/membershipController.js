import navigationView from "./../../views/navigationView.js";
import membershipNavigationView from "../../views/membership/membershipNavigationView.js";
import membershipOverlayView from "../../views/membership/membershipOverlayView.js";

const init = () => {
  navigationView.clickMenuButton();
  membershipNavigationView.init();
  membershipOverlayView.init();
};
init();
