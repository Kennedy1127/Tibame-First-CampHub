class CheckoutView {
  _renderSummaryProduct(data) {
    const { reserveRoom, rentalData } = data;
    const summaryProductsTableBody = document.querySelector(
      ".summary_products_table_body"
    );

    if (data.reserveRoom && Object.keys(data.reserveRoom).length !== 0) {
      const roomProductHtml = `
    <tr class="summary_product_room">
      <td>
        <div class="summary_product_pic">
          <picture>
            <source
              media="(min-width:1000px)"
              srcset="
                ${reserveRoom.imgs[1].pic}
              "
            />
            <source
              media="min-width:300px"
              srcset="
              ${reserveRoom.imgs[1].picMobile}
              "
            />
            <img
              src=" ${reserveRoom.imgs[1].pic}"
              alt=""
            />
          </picture>
        </div>
        <span>${reserveRoom.title}</span>
      </td>
      <td>
        <span>$${(reserveRoom.subtotal / reserveRoom.guests).toFixed(2)}</span>
      </td>
      <td>
        <span>${reserveRoom.guests}</span>
      </td>
      <td>
        <span>$${Number(reserveRoom.subtotal).toFixed(2)}</span>
      </td>
      <td>
        <span class="cancel">
          <i class="fa-solid fa-xmark"></i>
        </span>
      </td>
    </tr>
  `;
      summaryProductsTableBody.insertAdjacentHTML(
        "afterbegin",
        roomProductHtml
      );
    }

    if (!data.rentalData) return;
    rentalData.forEach((data) => {
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
          >${data.title} - ${data.price} USD x ${data.days} nights</span
        >
      </td>
      <td>
        <span>$${(data.price * (data.days || 1)).toFixed(2)}</span>
      </td>
      <td>
        <span>${data.quantity}</span>
      </td>
      <td>
        <span>$${(data.price * (data.days || 1) * data.quantity).toFixed(
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

      summaryProductsTableBody.insertAdjacentHTML(
        "beforeend",
        rentalProductHtml
      );
    });
  }

  _renderSummaryCheckout(data) {
    const { reserveRoom, rentalData } = data;
    const summaryCheckoutBody = document.querySelector(
      ".summary_checkout_body_items"
    );
    const summaryCheckoutBodyTotalPrice = document.querySelector(
      ".summary_checkout_body_total_price"
    );

    if (data.reserveRoom && Object.keys(data.reserveRoom).length !== 0) {
      const summaryCheckoutItemRoomHtml = `
      <div class="summary_checkout_body_item summary_checkout_body_item--room">
        <div class="summary_checkout_body_item_name">
          ${reserveRoom.title} x ${reserveRoom.guests} person${
        reserveRoom.guests > 1 ? "s" : ""
      }
        </div>
        <div class="summary_checkout_body_item_price">
          $${Number(reserveRoom.subtotal).toFixed(2)} USD
        </div>
      </div>
    `;

      summaryCheckoutBody.insertAdjacentHTML(
        "afterbegin",
        summaryCheckoutItemRoomHtml
      );
    }

    let subtotal = Number(reserveRoom?.subtotal || 0);

    if (!data.rentalData) return;
    rentalData.forEach((data) => {
      const summaryCheckoutItemHtml = `
      <div class="summary_checkout_body_item" data-id=${data.id}>
        <div class="summary_checkout_body_item_name">
        ${data.title} - ${data.price} USD x ${data.days} nights
        </div>
        <div class="summary_checkout_body_item_price">
          $${(data.price * (data.days || 1) * data.quantity).toFixed(2)} USD
        </div>
      </div>
    `;

      summaryCheckoutBody.insertAdjacentHTML(
        "beforeend",
        summaryCheckoutItemHtml
      );

      subtotal += data.subtotal;
    });

    summaryCheckoutBodyTotalPrice.textContent = `$${(subtotal || 0).toFixed(
      2
    )} USD`;
  }

  _deleteProduct() {
    const summaryCheckoutBody = document.querySelector(
      ".summary_checkout_body_items"
    );

    window.addEventListener("click", (e) => {
      const summaryCheckoutBodyTotalPrice = document.querySelector(
        ".summary_checkout_body_total_price"
      );

      let subtotal = Number(
        summaryCheckoutBodyTotalPrice.textContent.trim().slice(1, -4)
      );

      const clickEl = e.target.closest("td span.cancel");
      if (!clickEl) return;

      let reserveRoom = JSON.parse(
        sessionStorage.getItem("reservePaymentData")
      );
      const rentalData = JSON.parse(sessionStorage.getItem("rentalData"));

      const product = clickEl.closest("tr");
      const indexOfRentalData = rentalData.findIndex(
        (data) => data.id === product.dataset.id
      );

      product.classList.contains("summary_product_room")
        ? (summaryCheckoutBody
            .querySelector(
              ".summary_checkout_body_item.summary_checkout_body_item--room"
            )
            .remove(),
          (subtotal -= Number(reserveRoom.subtotal)),
          (reserveRoom = {}))
        : (summaryCheckoutBody
            .querySelector(
              `.summary_checkout_body_item[data-id="${product.dataset.id}"]`
            )
            .remove(),
          (subtotal -= Number(rentalData[indexOfRentalData].subtotal)),
          rentalData.splice(indexOfRentalData, 1));
      product.remove();

      sessionStorage.setItem("reservePaymentData", JSON.stringify(reserveRoom));
      sessionStorage.setItem("rentalData", JSON.stringify(rentalData));
      summaryCheckoutBodyTotalPrice.textContent = `$${subtotal.toFixed(2)} USD`;
    });
  }

  _goToCheckout() {
    const summaryCheckoutFooterButtons = document.querySelectorAll(
      ".summary_checkout_footer_button"
    );
    const summaryCheckoutBodyWarning = document.querySelectorAll(
      ".summary_checkout_body_warning"
    );

    summaryCheckoutFooterButtons.forEach((button) =>
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const reservationRoom = JSON.parse(
          sessionStorage.getItem("reservePaymentData")
        );
        const rentalData =
          JSON.parse(sessionStorage.getItem("rentalData")) || [];

        if (!reservationRoom.id) {
          summaryCheckoutBodyWarning.forEach((el) =>
            el.classList.remove("summary_checkout_body_warning--hidden")
          );
          return;
        }

        let reservationOrderSubtotal = reservationRoom.subtotal;

        const reservationOrderRoom = {
          id: reservationRoom.id,
          checkInDate: reservationRoom.checkInDate,
          checkOutDate: reservationRoom.checkOutDate,
          guests: reservationRoom.guests,
          title: `${reservationRoom.title} x ${reservationRoom.guests} person${
            reservationRoom.guests > 1 ? "s" : ""
          }`,
          subtotal: reservationRoom.subtotal,
        };

        const reservationOrderRental = [];

        rentalData.forEach((data) => {
          const obj = {
            id: data.id,
            picName: data.picName,
            subtotal: data.subtotal,
            title: `${data.title} - ${data.price * data.days} USD x ${
              data.quantity
            }`,
          };

          reservationOrderSubtotal += data.subtotal;
          reservationOrderRental.push(obj);
        });

        const reservationOrder = {
          id: Date.now().toString().slice(-7),
          subtotal: reservationOrderSubtotal,
          reservationOrderRoom,
          reservationOrderRental,
        };

        sessionStorage.setItem(
          "reservationOrder",
          JSON.stringify(reservationOrder)
        );

        location.href = "./checkout.html";
      })
    );
  }

  init(handler) {
    const data = handler();
    this._renderSummaryProduct(data);
    this._renderSummaryCheckout(data);
    this._deleteProduct();
    this._goToCheckout();
  }
}

export default new CheckoutView();
