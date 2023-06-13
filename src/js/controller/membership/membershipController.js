import * as model from "./../../model/model.js";
import navigationView from "./../../views/navigationView.js";
import membershipNavigationView from "../../views/membership/membershipNavigationView.js";
import membershipOverlayView from "../../views/membership/membershipOverlayView.js";
import membershipBookingsView from "../../views/membership/membershipBookingsView.js";
import membershipReviewsView from "../../views/membership/membershipReviewsView.js";

const controlLoadUserOrders = () => {
  return model.loadUserOrders();
};

const controlLoadUserReviews = () => {
  return model.loadUserReviews();
};

const init = () => {
  navigationView.init();
  membershipNavigationView.init();
  membershipOverlayView.init();
  membershipBookingsView.init(controlLoadUserOrders());
  membershipReviewsView.init(controlLoadUserReviews());
};
init();
