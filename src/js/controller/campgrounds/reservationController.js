import * as model from "../../model/model.js";
import navigationView from "../../views/navigationView.js";
import reservationView from "../../views/reservation/reservationView.js";
import reserveView from "../../views/reservation/reserveView.js";
import rentalView from "../../views/reservation/rentalView.js";
import checkoutView from "../../views/reservation/checkoutView.js";

const controllLoadSessionRoomTarget = () => {
  return model.loadSessionRoom();
};

const controllLoadRentals = () => {
  return model.state.rentals;
};

const controllLoadSessionData = () => {
  return model.loadSessionReserveData();
};

const init = () => {
  navigationView.init();
  reservationView.renderRoomData(controllLoadSessionRoomTarget());
  reserveView.init(controllLoadSessionRoomTarget());
  rentalView.renderRentalCards(controllLoadRentals());
  rentalView.createRentalCarousel();
  rentalView.updateRentalProductQuantity();
  rentalView.submitRentalCard(controllLoadRentals());
  checkoutView.init(controllLoadSessionData);
};

window.addEventListener("load", init);
