class CalendarView {
  _setupFullCalendarArrive() {
    document.addEventListener("DOMContentLoaded", function () {
      const calendarEl = document.getElementById("calendarArrive");
      const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",

        dateClick(info) {
          console.log(info);
        },
      });
      calendar.setOption("locale", "en");
      calendar.render();
    });
  }

  _setupFullCalendarCheckout() {
    document.addEventListener("DOMContentLoaded", function () {
      const calendarEl = document.getElementById("calendarCheckout");
      const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",

        dateClick(info) {
          console.log(info);
        },
      });
      calendar.setOption("locale", "en");
      calendar.render();
    });
  }

  init() {
    this._setupFullCalendarArrive();
    this._setupFullCalendarCheckout();
  }
}

export default new CalendarView();
