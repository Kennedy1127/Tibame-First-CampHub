import { calendarInit } from "../../utilities/calendar.js";

class ReserveView {
  constructor() {
    this._checkInYear = new Date().getFullYear();
    this._checkInMonth = new Date().getMonth() + 1;
    this._checkInDate = new Date().getDate();
    this._checkOutYear = new Date().getFullYear();
    this._checkOutMonth = new Date().getMonth() + 1;
    this._checkOutDate = new Date().getDate();
    this._roomData = null;
    this._guests = 1;
    this._subtotal = null;
  }

  _initReservePaymentPrice() {
    const reserveName = document.querySelector(
      ".reserve_payment_content_price_item_name"
    );

    const reservePrice = document.querySelector(
      ".reserve_payment_content_price_item_subtotal"
    );

    const reserveTotal = document.querySelector(
      ".reserve_payment_content_price_subtotal_price"
    );

    reserveName.textContent = `$${this._roomData.price} x 0 nights x 1 person`;
    reservePrice.textContent = `$${this._roomData.price} USD`;
    reserveTotal.textContent = `$${this._roomData.price} USD`;
  }

  _renderReservePaymentDate(check, year, month, date) {
    const el = document.querySelector(check);
    el.textContent = `${month}/${date}/${year}`;
  }

  _calculateDays() {
    return Math.floor(
      (new Date(
        this._checkOutYear,
        this._checkOutMonth - 1,
        this._checkOutDate
      ).getTime() -
        new Date(
          this._checkInYear,
          this._checkInMonth - 1,
          this._checkInDate
        ).getTime()) /
        1000 /
        60 /
        60 /
        24
    );
  }

  _renderReservePaymentPrice(days) {
    const reserveName = document.querySelector(
      ".reserve_payment_content_price_item_name"
    );

    const reservePrice = document.querySelector(
      ".reserve_payment_content_price_item_subtotal"
    );

    const reserveTotal = document.querySelector(
      ".reserve_payment_content_price_subtotal_price"
    );

    const reserveWarnText = document.querySelector(
      ".reserve_payment_content_warning"
    );

    const calculatePrice = () => {
      return this._roomData.price * this._guests * (days < 1 ? 1 : days);
    };

    if (days < 0) {
      reserveWarnText.innerHTML =
        "Please choose correct arrive and depart dates.";
      reserveName.innerHTML = `$${this._roomData.price} x 0 nights x ${this._guests} person`;
      reserveTotal.innerHTML =
        reservePrice.innerHTML = `${calculatePrice().toFixed(2)} USD`;

      this._subtotal = calculatePrice();
      return;
    }

    reserveWarnText.innerHTML = "";
    reserveName.innerHTML = `$${this._roomData.price} x ${days} nights x ${
      this._guests
    } person${this._guests > 1 ? "s" : ""}`;
    reserveTotal.innerHTML =
      reservePrice.innerHTML = `$${calculatePrice().toFixed(2)} USD`;
    this._subtotal = calculatePrice();
  }

  _changeGuests() {
    document
      .querySelector(".reserve_payment_content_order_guest")
      .addEventListener("change", (e) => {
        this._guests = e.target.value;
        this._renderReservePaymentPrice(this._calculateDays());
      });
  }

  _calendarInit() {
    calendarInit(".checkIn");
    calendarInit(".checkOut");
  }

  _selectCalendarDate(calendar) {
    const calendarBody = document.querySelector(`${calendar} .calendar-body`);

    calendarBody.addEventListener("click", (e) => {
      const clickedDate = e.target.closest(".calendar-enable");

      if (calendar === ".checkIn") {
        this._checkInYear = clickedDate.dataset.year;
        this._checkInMonth = Number(clickedDate.dataset.month) + 1;
        this._checkInDate = clickedDate.dataset.date;
        const check = ".reserve_checkInDate";

        this._renderReservePaymentDate(
          check,
          this._checkInYear,
          this._checkInMonth,
          this._checkInDate
        );
        this._renderReservePaymentPrice(this._calculateDays());
      } else if (calendar === ".checkOut") {
        this._checkOutYear = clickedDate.dataset.year;
        this._checkOutMonth = Number(clickedDate.dataset.month) + 1;
        this._checkOutDate = clickedDate.dataset.date;
        const check = ".reserve_checkOutDate";

        this._renderReservePaymentDate(
          check,
          this._checkOutYear,
          this._checkOutMonth,
          this._checkOutDate
        );
        this._renderReservePaymentPrice(this._calculateDays());
      }
    });
  }

  _showCalendar() {
    const orderDates = document.querySelectorAll(
      ".reserve_payment_content_order_date"
    );
    const calendars = document.querySelectorAll(".reserve_payment_calendar");

    window.addEventListener("click", (e) => {
      calendars.forEach((calendar) =>
        calendar.classList.contains("reserve_payment_calendar--active")
          ? calendar.classList.remove("reserve_payment_calendar--active")
          : ""
      );

      if (e.target.closest(".calendar-enable ")) {
        return;
      }

      const el = e.target.closest(".reserve_payment_content_order_date");
      const index = [...orderDates].indexOf(el);
      if (index === -1) return;

      calendars[index].classList.add("reserve_payment_calendar--active");
    });
  }

  _submitReserveData() {
    const reservePaymentSubmitButton = document.querySelector(
      ".reserve_payment_content_submit"
    );

    const summaryProductsTableBody = document.querySelector(
      ".summary_products_table_body"
    );

    const summaryCheckoutBody = document.querySelector(
      ".summary_checkout_body_items"
    );

    const summaryCheckoutBodyTotalPrice = document.querySelector(
      ".summary_checkout_body_total_price"
    );

    reservePaymentSubmitButton.addEventListener("click", () => {
      const tableRows = summaryProductsTableBody.querySelectorAll("tr");
      const checkoutItems = document.querySelectorAll(
        ".summary_checkout_body_item"
      );
      const days = this._calculateDays();

      if (days < 0) {
        sessionStorage.clear("reservePaymentData");

        tableRows[0]?.classList.contains("summary_product_room") &&
          tableRows[0].remove();
        checkoutItems[0]?.classList.contains(
          "summary_checkout_body_item--room"
        ) && checkoutItems[0].remove();
        return;
      }

      const title = `${this._roomData.title} - ${
        this._roomData.price
      } USD x ${days} night${days > 1 ? "s" : ""}`;

      const roomProductHtml = `
        <tr class="summary_product_room">
          <td>
            <div class="summary_product_pic">
              <picture>
                <source
                  media="(min-width:1000px)"
                  srcset="
                    ${this._roomData.imgs[1].pic}
                  "
                />
                <source
                  media="min-width:300px"
                  srcset="
                  ${this._roomData.imgs[1].picMobile}
                  "
                />
                <img
                  src=" ${this._roomData.imgs[1].pic}"
                  alt=""
                />
              </picture>
            </div>
            <span>${title}</span>
          </td>
          <td>
            <span>$${(this._subtotal / this._guests).toFixed(2)}</span>
          </td>
          <td>
            <span>${this._guests}</span>
          </td>
          <td>
            <span>$${this._subtotal.toFixed(2)}</span>
          </td>
          <td>
            <span class="cancel">
              <i class="fa-solid fa-xmark"></i>
            </span>
          </td>
        </tr>
      `;

      const summaryCheckoutItemRoomHtml = `
        <div class="summary_checkout_body_item summary_checkout_body_item--room">
          <div class="summary_checkout_body_item_name">
            ${title} x ${this._guests} person${this._guests > 1 ? "s" : ""}
          </div>
          <div class="summary_checkout_body_item_price">
            $${this._subtotal.toFixed(2)} USD
          </div>
        </div>
      `;

      tableRows[0]?.classList.contains("summary_product_room") &&
        tableRows[0].remove();

      summaryProductsTableBody.insertAdjacentHTML(
        "afterbegin",
        roomProductHtml
      );

      checkoutItems[0]?.classList.contains(
        "summary_checkout_body_item--room"
      ) && checkoutItems[0].remove();

      summaryCheckoutBody.insertAdjacentHTML(
        "afterbegin",
        summaryCheckoutItemRoomHtml
      );

      let summarySubTotal = this._subtotal;

      if (tableRows.length) {
        const rentalData = JSON.parse(sessionStorage.getItem("rentalData"));

        if (rentalData) {
          summaryProductsTableBody.innerHTML = "";
          summaryCheckoutBody.innerHTML = "";

          rentalData.forEach((data, i) => {
            const rentalProductHtml = `
          <tr class="summary_product_rental" data-id=${data.id}>
            <td>
              <div class="summary_product_pic">
                <picture>
                  <source
                    media="(min-width:1000px)"
                    srcset="
                      ${data.pic}
                    "
                  />
                  <source
                    media="min-width:300px"
                    srcset="
                    ${data.pic}
                    "
                  />
                  <img
                    src=" ${data.pic}"
                    alt=""
                  />
                </picture>
              </div>
              <span
                >${data.title} - ${data.price} USD x ${days} nights</span
              >
            </td>
            <td>
              <span>$${(data.price * (days || 1)).toFixed(2)}</span>
            </td>
            <td>
              <span>${data.quantity}</span>
            </td>
            <td>
              <span>$${(data.price * (days || 1) * data.quantity).toFixed(
                2
              )}</span>
            </td>
            <td>
              <span class="cancel">
                <i class="fa-solid fa-xmark"></i>
              </span>
            </td>
          </tr>
        `;

            const summaryCheckoutItemHtml = `
        <div class="summary_checkout_body_item" data-id=${data.id}>
          <div class="summary_checkout_body_item_name">
          ${data.title} - ${days} night${days > 1 ? "s" : ""} x ${
              data.quantity
            } 
              
          </div>
          <div class="summary_checkout_body_item_price">
            $${(data.price * (days || 1) * data.quantity).toFixed(2)} USD
          </div>
        </div>
      `;

            summaryProductsTableBody.insertAdjacentHTML(
              "beforeend",
              rentalProductHtml
            );
            summaryCheckoutBody.insertAdjacentHTML(
              "beforeend",
              summaryCheckoutItemHtml
            );

            data.subtotal = (days || 1) * data.price * Number(data.quantity);
            data.days = days;
            summarySubTotal += data.subtotal;
          });

          sessionStorage.setItem("rentalData", JSON.stringify(rentalData));
          summaryProductsTableBody.insertAdjacentHTML(
            "afterbegin",
            roomProductHtml
          );

          summaryCheckoutBody.insertAdjacentHTML(
            "afterbegin",
            summaryCheckoutItemRoomHtml
          );
        }
      }

      const summaryCheckoutBodyWarning = document.querySelectorAll(
        ".summary_checkout_body_warning"
      );

      summaryCheckoutBodyWarning.forEach(
        (el) =>
          el.classList.contains("summary_checkout_body_warning--hidden") ||
          el.classList.add("summary_checkout_body_warning--hidden")
      );

      summaryCheckoutBodyTotalPrice.textContent = `$${summarySubTotal.toFixed(
        2
      )} USD`;

      const data = {
        id: this._roomData.title,
        title,
        price: this._roomData.price,
        guests: Number(this._guests),
        subtotal: this._subtotal,
        imgs: this._roomData.imgs,
        days,
        checkInDate: `${this._checkInMonth}/${this._checkInDate}/${this._checkInYear}`,
        checkOutDate: `${this._checkOutMonth}/${this._checkOutDate}/${this._checkOutYear}`,
      };
      const jsonData = JSON.stringify(data);
      sessionStorage.setItem("reservePaymentData", jsonData);
    });
  }

  init(data) {
    this._roomData = data;
    this._subtotal = this._roomData.price;

    this._initReservePaymentPrice();
    this._showCalendar();
    this._renderReservePaymentDate(
      ".reserve_checkInDate",
      this._checkInYear,
      this._checkInMonth,
      this._checkInDate
    );
    this._renderReservePaymentDate(
      ".reserve_checkOutDate",
      this._checkOutYear,
      this._checkOutMonth,
      this._checkOutDate
    );
    this._changeGuests();
    this._calendarInit();
    this._selectCalendarDate(".checkIn");
    this._selectCalendarDate(".checkOut");
    this._submitReserveData();
  }
}

export default new ReserveView();
