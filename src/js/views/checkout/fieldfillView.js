class FieldfillView {
  constructor() {
    this._reservationOrder = JSON.parse(
      sessionStorage.getItem("reservationOrder")
    );
  }

  _renderGuestsInformation() {
    const informationFillGuests = document.querySelector(
      ".information_fill_guests"
    );

    for (
      let i = 0;
      i < this._reservationOrder.reservationOrderRoom.guests;
      i++
    ) {
      const guestHtml = `
      <div class="information_fill_guest">
        <h3 class="information_fill_guest_title">Guest ${i + 1}:</h3>
        <div class="information_fill_guest_content">
          <div class="information_fill_guest_group">
            <label for="guest1Firstname">First name:</label>
            <input
              type="text"
              id="guest1Firstname"
              placeholder="Jacob"
            />
          </div>

          <div class="information_fill_guest_group">
            <label for="guest1Lastname">Last name:</label>
            <input
              type="text"
              id="guest1Lastname"
              placeholder="Hayes"
            />
          </div>

          <div class="information_fill_guest_group">
            <label for="guest1ID">ID or passport number:</label>
            <input
              type="text"
              id="guest1ID"
              placeholder="A012345689"
            />
          </div>
        </div>
      </div>
    `;

      informationFillGuests.insertAdjacentHTML("beforeend", guestHtml);
    }
  }

  _renderSummaryCheckout() {
    const informationCheckoutBody = document.querySelector(
      ".information_checkout_body_items"
    );
    const informationCheckoutBodyTotalPrice = document.querySelector(
      ".information_checkout_body_total_price"
    );

    const summaryCheckoutRoomHtml = `
      <div class="information_checkout_body_item information_checkout_body_item--room">
        <div class="information_checkout_body_item_name">
          ${this._reservationOrder.reservationOrderRoom.title}
        </div>
        <div class="information_checkout_body_item_price">
        ${this._reservationOrder.reservationOrderRoom.subtotal.toFixed(2)} USD
        </div>
    </div>
    `;

    informationCheckoutBody.insertAdjacentHTML(
      "afterbegin",
      summaryCheckoutRoomHtml
    );

    this._reservationOrder.reservationOrderRental.forEach((data) => {
      const summaryCheckoutItemHtml = `
      <div class="information_checkout_body_item">
        <div class="information_checkout_body_item_name">
          ${data.title}
        </div>
        <div class="information_checkout_body_item_price">
          $${data.subtotal.toFixed(2)} USD
        </div>
      </div>
    `;

      informationCheckoutBody.insertAdjacentHTML(
        "beforeend",
        summaryCheckoutItemHtml
      );
    });

    informationCheckoutBodyTotalPrice.textContent = `$${this._reservationOrder.subtotal.toFixed(
      2
    )} USD`;
  }

  _confirmCreateOrder() {
    const informationFillConfirmButton = document.querySelector(
      ".information_fill_confirm_button"
    );
    const informationCheckoutSubmit = document.querySelector(
      ".information_checkout_submit"
    );

    [informationCheckoutSubmit, informationFillConfirmButton].forEach((el) =>
      el.addEventListener("click", () => {
        if (!this._reservationOrder.id) return;
        const userOrders =
          JSON.parse(sessionStorage.getItem("userOrders")) || [];

        userOrders.unshift(this._reservationOrder);
        sessionStorage.setItem("userOrders", JSON.stringify(userOrders));

        sessionStorage.removeItem("reservePaymentData");
        sessionStorage.removeItem("rentalData");
        sessionStorage.removeItem("reservationOrder");
        location.href =
          "https://kennedy1127.github.io/Tibame-First-CampHub/pages/membership/membership.html";
      })
    );
  }

  init() {
    if (!this._reservationOrder?.id) return;
    this._renderGuestsInformation();
    this._renderSummaryCheckout();
    this._confirmCreateOrder();
  }
}

export default new FieldfillView();
