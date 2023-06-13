export const calendarInit = (el) => {
  const myCalendar = document.querySelector(`${el || ".myCalendar"}`);
  myCalendar.insertAdjacentHTML(
    "afterbegin",
    '<div class="calendar-header"></div>'
  );

  const generateHeaderMonth = (currentYear, currentMonth, currentDate) => {
    const html = `<div class="calendar-header-month">${
      currentMonth + 1
    }<span>／</span>${currentDate}<span>／</span>${currentYear}</div>`;
    const calendarHeader = myCalendar.querySelector(".calendar-header");
    calendarHeader.insertAdjacentHTML("afterbegin", html);
  };

  const generateHeaderButtons = () => {
    const html = `<div class="calendar-header-buttons">
      <button class="calendar-header-button calendar-header-button--prev">Prev</button>
      <button class="calendar-header-button calendar-header-button--next">Next</button>
    </div>`;
    const calendarHeader = myCalendar.querySelector(".calendar-header");
    calendarHeader.insertAdjacentHTML("beforeend", html);
  };

  const generateTable = () => {
    const html = `
    <table class="calendar">
      <thead>
        <tr>
          <th>Sun</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
        </tr>
      </thead>

      <tbody class="calendar-body">
      </tbody>
    </table>
  `;

    myCalendar.insertAdjacentHTML("beforeend", html);
  };

  const generateDates = (currentYear, currentMonth, currentDate) => {
    const firstDay = new Date(currentYear, currentMonth).getDay();
    const daysOfMonth = (y, m) => 32 - new Date(y, m, 32).getDate();

    let html = "";
    let date = 1;
    let nextMonthDate = 1;
    let lastMonthDate = daysOfMonth(currentYear, currentMonth - 1);

    for (let i = 0; i < 6; i++) {
      html += "<tr>";

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          html += `<td class="calendar-disable">${
            lastMonthDate - (firstDay - j)
          }</td>`;
        } else if (date > 42) {
          break;
        } else if (date > daysOfMonth(currentYear, currentMonth)) {
          html += `<td class="calendar-disable">${nextMonthDate}</td>`;
          nextMonthDate++;
        } else {
          html += `<td class="${
            date >= currentDate ? "calendar-enable" : "calendar-disable"
          } ${
            date === currentDate ? "calendar-selected" : ""
          }" data-year=${currentYear} data-month=${currentMonth} data-date=${date}>${date}</td>`;
          date++;
        }
      }

      html += "</tr>";
    }

    const calendarBody = myCalendar.querySelector(".calendar-body");
    calendarBody.innerHTML = html;
  };

  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();
  let currentDate = new Date().getDate();
  const limitTime = new Date();

  generateHeaderMonth(currentYear, currentMonth, currentDate);
  generateHeaderButtons();
  generateTable();
  generateDates(currentYear, currentMonth, currentDate);

  const updateHeaderMonth = (currentYear, currentMonth, currentDate) => {
    const html = `
    ${
      Number(currentMonth) + 1
    }<span>／</span>${currentDate}<span>／</span>${currentYear}
    `;

    const calendarHeaderMonth = myCalendar.querySelector(
      ".calendar-header-month"
    );
    calendarHeaderMonth.innerHTML = html;
  };

  const prev = () => {
    const prevButton = myCalendar.querySelector(
      ".calendar-header-button--prev"
    );
    prevButton.addEventListener("click", () => {
      if (
        currentMonth <= limitTime.getMonth() &&
        currentYear === limitTime.getFullYear()
      ) {
        return;
      }

      currentMonth--;

      if (
        currentMonth === limitTime.getMonth() &&
        currentYear === limitTime.getFullYear()
      ) {
        generateDates(currentYear, currentMonth, limitTime.getDate());
        updateHeaderMonth(currentYear, currentMonth, limitTime.getDate());
        return;
      }

      if (currentMonth === -1) {
        currentMonth = 11;
        currentYear--;
      }

      generateDates(currentYear, currentMonth, 1);
      updateHeaderMonth(currentYear, currentMonth, 1);
    });
  };

  const next = () => {
    const nextButton = myCalendar.querySelector(
      ".calendar-header-button--next"
    );
    nextButton.addEventListener("click", () => {
      currentMonth++;
      if (currentMonth === 12) {
        currentYear++;
        currentMonth = 0;
      }

      generateDates(currentYear, currentMonth, 1);
      updateHeaderMonth(currentYear, currentMonth, 1);
    });
  };

  prev();
  next();

  const clearSelectedDate = () => {
    const enabledDates = myCalendar.querySelectorAll(".calendar-enable");
    enabledDates.forEach((date) =>
      date.classList.contains("calendar-selected")
        ? date.classList.remove("calendar-selected")
        : ""
    );
  };

  const clickDate = () => {
    const calendarBody = myCalendar.querySelector(".calendar-body");
    calendarBody.addEventListener("click", (e) => {
      clearSelectedDate();
      const clickedDate = e.target.closest(".calendar-enable");
      clickedDate.classList.add("calendar-selected");
      const { year, month, date } = clickedDate.dataset;
      updateHeaderMonth(year, month, date);
    });
  };

  clickDate();
};
