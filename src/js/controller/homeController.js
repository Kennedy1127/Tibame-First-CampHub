import navigationView from "../views/navigationView.js";
import conceptView from "../views/home/conceptView.js";
import roomsView from "../views/home/roomsView.js";
import recommendationsView from "../views/home/recommendationsView.js";

const init = () => {
  navigationView.clickMenuButton();
  conceptView.init();
  roomsView.init();
  recommendationsView.init();
};
init();
