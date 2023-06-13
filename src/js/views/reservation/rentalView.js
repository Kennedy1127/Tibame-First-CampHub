class RentalView {
  renderRentalCards(data) {
    const rentalContentCards = document.querySelector(".rental_content_cards");

    data.forEach((card) => {
      const html = `
      <div class="myCarousel_slide myCarousel_slide--2" >
        <div class="rental_content_card" data-card-id="${card.id}">
          <div class="rental_content_card_header">
            <div class="rental_content_card_pic">
              <picture>
                <source
                  media="(min-width:1000px)"
                  srcset="
                    ${card.pic}
                  "
                />
                <source
                  media="(min-width:300px)"
                  srcset="
                    ${card.pic}
                  "
                />
                <img
                  src="${card.pic}"
                  alt=""
                />
              </picture>
            </div>
          </div>

          <div class="rental_content_card_content">
            <h3 class="rental_content_card_title">
              ${card.title}
            </h3>
            <p class="rental_content_card_text">
              ${card.text}
            </p>
            <div class="rental_content_card_rent">
              <div class="rental_content_card_rent_group">
                <div class="rental_content_card_rent_price">
                $${card.price}<span>/day</span>
                </div>
                <div class="rental_content_card_rent_quantity">
                  <button
                    class="rental_content_card_rent_quantity_button rental_content_card_rent_quantity_button--plus"
                  >
                  +
                  </button>
                  <input type="number" class="rental_content_card_rent_quantity_number" value = 1>
                  <button
                    class="rental_content_card_rent_quantity_button rental_content_card_rent_quantity_button--minus"
                  >
                  -
                  </button>
                </div>
              </div>
              <div class="rental_content_card_rent_button">Rent</div>
            </div>
          </div>
        </div>
      </div>
    `;
      rentalContentCards.insertAdjacentHTML("beforeend", html);
    });
  }

  createRentalCarousel() {
    const slider = document.querySelector(".myCarousel_slider");
    const slides = slider.querySelectorAll(".myCarousel_slide");
    let currentIndex = 0;

    const carouselTask = (currentIndex, transitionMS = 500) => {
      slider.style.transitionDuration = `${transitionMS}ms`;
      slider.style.transform = `translateX(${
        (-currentIndex - 1) *
        (Number(slides[0].getBoundingClientRect().width.toFixed(3)) + 20)
      }px)`;

      if (transitionMS === 0) {
        setTimeout(() => {
          slider.style.transitionDuration = "500ms";
        }, 1);
      }
    };

    const prev = () => {
      if (currentIndex === -1) return;
      currentIndex--;
      carouselTask(currentIndex);
    };

    const next = () => {
      if (currentIndex === slides.length) return;
      currentIndex++;
      carouselTask(currentIndex);
    };

    const setupCarousel = () => {
      slider.append(slides[0].cloneNode(true));
      slider.append(slides[1].cloneNode(true));
      slider.append(slides[2].cloneNode(true));
      slider.append(slides[3].cloneNode(true));

      slider.prepend(slides[slides.length - 1].cloneNode(true));
      carouselTask(0);
    };

    const setupCarouselArrows = () => {
      const arrows = document.querySelectorAll(".myCarousel_arrow");
      arrows[0].addEventListener("click", () => {
        prev();
      });

      arrows[1].addEventListener("click", () => {
        next();
      });
    };

    const setupInfiniteCarousel = () => {
      slider.addEventListener("transitionend", () => {
        if (currentIndex === slides.length) {
          currentIndex = 0;
          carouselTask(currentIndex, 0);
        }

        if (currentIndex === -1) {
          currentIndex = slides.length - 1;
          carouselTask(currentIndex, 0);
        }
      });
    };

    const setupCarouselDrag = () => {
      const sensor = document.querySelector(".rental_content_arrows");
      // const myCarousel = slider.closest(".myCarousel");
      let pressed = false;
      let startX;
      let distance;

      ["touchstart"].forEach((event) =>
        sensor.addEventListener(event, (e) => {
          pressed = true;
          startX = e.touches[0].clientX;
        })
      );

      ["touchend"].forEach((event) =>
        sensor.addEventListener(event, () => {
          pressed = false;

          if (Math.abs(distance) < 15) {
            distance = null;
            return carouselTask(currentIndex);
          }

          if (distance >= 15) {
            distance = null;
            if (currentIndex === -1) return;

            currentIndex--;
            return carouselTask(currentIndex);
          }

          if (distance <= 15) {
            distance = null;
            if (currentIndex === slides.length) return;

            currentIndex++;
            return carouselTask(currentIndex);
          }
        })
      );

      ["touchmove"].forEach((event) =>
        sensor.addEventListener(event, (e) => {
          if (!pressed || currentIndex === slides.length || currentIndex === -1)
            return;

          distance = e.touches[0].clientX - startX;

          slider.style.transform = `translateX(${
            (-currentIndex - 1) *
              (Number(slides[0].getBoundingClientRect().width.toFixed(3)) +
                20) -
            (distance > 0 ? -60 : 60)
          }px)`;
        })
      );
    };

    setupCarousel();
    setupCarouselArrows();
    setupInfiniteCarousel();
    setupCarouselDrag();
  }

  updateRentalProductQuantity() {
    window.addEventListener("click", (e) => {
      const rentalContentCardRentQuantityButton = e.target.classList.contains(
        "rental_content_card_rent_quantity_button"
      )
        ? e.target
        : null;
      if (!rentalContentCardRentQuantityButton) return;
      const inputNumber = rentalContentCardRentQuantityButton
        .closest(".rental_content_card_rent_group")
        .querySelector(".rental_content_card_rent_quantity_number");

      rentalContentCardRentQuantityButton.classList.contains(
        "rental_content_card_rent_quantity_button--plus"
      )
        ? inputNumber.value++
        : inputNumber.value === "1"
        ? ""
        : inputNumber.value--;
    });
  }

  submitRentalCard(data) {
    const tableBody = document.querySelector(".summary_products_table_body");
    const rentalContentCardRentButtons = document.querySelectorAll(
      ".rental_content_card_rent_button"
    );
    const summaryCheckoutBody = document.querySelector(
      ".summary_checkout_body_items"
    );

    rentalContentCardRentButtons.forEach((button) =>
      button.addEventListener("click", (e) => {
        const summaryCheckoutBodyTotalPrice = document.querySelector(
          ".summary_checkout_body_total_price"
        );
        const card = e.target.closest(".rental_content_card");
        if (!card) return;

        let { days, subtotal = 0 } = JSON.parse(
          sessionStorage.getItem("reservePaymentData")
        ) || { days: 1, subtotal: 0 };

        const rentalProduct = data[card.dataset.cardId - 1];
        const rentalProductQuantity = card.querySelector(
          ".rental_content_card_rent_quantity_number"
        );

        const rentalProductHtml = `
          <tr class="summary_product_rental" data-id=${rentalProduct.id}>
            <td>
              <div class="summary_product_pic">
                <picture>
                  <source
                    media="(min-width:1000px)"
                    srcset="
                      ${rentalProduct.pic}
                    "
                  />
                  <source
                    media="min-width:300px"
                    srcset="
                    ${rentalProduct.pic}
                    "
                  />
                  <img
                    src=" ${rentalProduct.pic}"
                    alt=""
                  />
                </picture>
              </div>
              <span
                >${rentalProduct.title} - ${rentalProduct.price} USD x ${
          days || 1
        } nights</span
              >
            </td>
            <td>
              <span>$${(rentalProduct.price * (days || 1)).toFixed(2)}</span>
            </td>
            <td>
              <span>${rentalProductQuantity.value}</span>
            </td>
            <td>
              <span>$${(
                rentalProduct.price *
                (days || 1) *
                rentalProductQuantity.value
              ).toFixed(2)}</span>
            </td>
            <td>
              <span class="cancel">
                <i class="fa-solid fa-xmark"></i>
              </span>
            </td>
          </tr>
        `;

        const summaryCheckoutItemHtml = `
          <div class="summary_checkout_body_item" data-id=${rentalProduct.id}>
            <div class="summary_checkout_body_item_name">
            ${rentalProduct.title} - ${days || 1} night${
          days > 1 ? "s" : ""
        } x ${rentalProductQuantity.value} 
            </div>
            <div class="summary_checkout_body_item_price">
              $${(
                rentalProduct.price *
                (days || 1) *
                rentalProductQuantity.value
              ).toFixed(2)} USD
            </div>
          </div>
        `;

        const rentalProductRows = tableBody.querySelectorAll(
          ".summary_product_rental"
        );
        const checkoutItems = document.querySelectorAll(
          ".summary_checkout_body_item"
        );

        const indexOfRentalProductRow = [...rentalProductRows].findIndex(
          (row) => row.dataset.id === rentalProduct.id
        );
        const indexOfCheckoutItem = [...checkoutItems].findIndex(
          (item) => item.dataset.id === rentalProduct.id
        );

        indexOfRentalProductRow === -1
          ? tableBody.insertAdjacentHTML("beforeend", rentalProductHtml)
          : (rentalProductRows[indexOfRentalProductRow].innerHTML =
              rentalProductHtml);

        indexOfCheckoutItem === -1
          ? summaryCheckoutBody.insertAdjacentHTML(
              "beforeend",
              summaryCheckoutItemHtml
            )
          : (checkoutItems[indexOfCheckoutItem].innerHTML = `            
            <div class="summary_checkout_body_item_name">
              ${rentalProduct.title} - ${days || 1} night${
              days > 1 ? "s" : ""
            } x ${rentalProductQuantity.value} 
              </div>
              <div class="summary_checkout_body_item_price">
                $${(
                  rentalProduct.price *
                  (days || 1) *
                  rentalProductQuantity.value
                ).toFixed(2)} USD
            </div>
          `);

        const rentalData =
          JSON.parse(sessionStorage.getItem("rentalData")) || [];

        const rentalDataObj = {
          days,
          id: rentalProduct.id,
          pic: rentalProduct.pic,
          picName: rentalProduct.picName,
          title: `${rentalProduct.title}`,
          price: rentalProduct.price,
          quantity: rentalProductQuantity.value,
          subtotal:
            rentalProduct.price * rentalProductQuantity.value * (days || 1),
        };

        const indexOfRentalDataObj = rentalData.findIndex(
          (obj) => obj.id === rentalDataObj.id
        );

        indexOfRentalDataObj === -1
          ? rentalData.push(rentalDataObj)
          : (rentalData[indexOfRentalDataObj] = rentalDataObj);

        sessionStorage.setItem("rentalData", JSON.stringify(rentalData));

        rentalData.forEach((data) => (subtotal += data.subtotal));
        summaryCheckoutBodyTotalPrice.textContent = `$${subtotal.toFixed(
          2
        )} USD`;
      })
    );
  }
}

export default new RentalView();
