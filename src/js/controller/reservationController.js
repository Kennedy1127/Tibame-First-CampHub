import navigationView from "../views/navigationView.js";
import calendarView from "../views/reservation/calendarView.js";

const init = () => {
  navigationView.clickMenuButton();
  calendarView.init();
};
init();
