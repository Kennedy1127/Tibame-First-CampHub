class MembershipBookingsView {
  _renderBookings(data) {
    const membershipBookings = document.querySelector(".membership_bookings");

    const generateLink = (id) => [
      {
        pic: `./../../src/img/campgrounds/rooms/room-${
          id === "Upper Valley" ? "1" : "2"
        }/room-${id === "Upper Valley" ? "1" : "2"}-1-min.jpg`,
        picMobile: `./../../src/img/campgrounds/rooms/room-${
          id === "Upper Valley" ? "1" : "2"
        }/room-${id === "Upper Valley" ? "1" : "2"}-1-min.webp`,
      },
      {
        pic: `./../../src/img/campgrounds/rooms/room-${
          id === "Upper Valley" ? "1" : "2"
        }/room-${id === "Upper Valley" ? "1" : "2"}-2-min.jpg`,
        picMobile: `./../../src/img/campgrounds/rooms/room-${
          id === "Upper Valley" ? "1" : "2"
        }/room-${id === "Upper Valley" ? "1" : "2"}-2-min.webp`,
      },
      {
        pic: `./../../src/img/campgrounds/rooms/room-${
          id === "Upper Valley" ? "1" : "2"
        }/room-${id === "Upper Valley" ? "1" : "2"}-3-min.jpg`,
        picMobile: `./../../src/img/campgrounds/rooms/room-${
          id === "Upper Valley" ? "1" : "2"
        }/room-${id === "Upper Valley" ? "1" : "2"}-3-min.webp`,
      },
      {
        pic: `./../../src/img/campgrounds/rooms/room-${
          id === "Upper Valley" ? "1" : "2"
        }/room-${id === "Upper Valley" ? "1" : "2"}-4-min.jpg`,
        picMobile: `./../../src/img/campgrounds/rooms/room-${
          id === "Upper Valley" ? "1" : "2"
        }/room-${id === "Upper Valley" ? "1" : "2"}-4-min.webp`,
      },
    ];

    data.forEach((obj) => {
      const links = generateLink(obj.reservationOrderRoom.id);
      let bookingPicHtml = "";
      links.forEach((link) => {
        bookingPicHtml += `
        <div class="membership_booking_pic">
          <picture>
            <source
              media="min-width:1000px"
              srcset="
                ${link.pic}
              "
            />
            <source
              media="min-width:300px"
              srcset="
              ${link.picMobile}
              "
            />
            <img
              src="${link.pic}"
            />
          </picture>
        </div>
        `;
      });

      let bookingProductHtml = "";

      obj.reservationOrderRental.forEach((data) => {
        bookingProductHtml += `
        <div class="membership_booking_info_product">
          <div class="membership_booking_info_product_title">
            <div class="membership_booking_info_product_pic">
              <img
                src="./../../src/img/campgrounds/rental/${data.picName}.png"
                alt="${data.picName}"
              />
            </div>
            <div class="membership_booking_info_product_name">
              ${data.title}
            </div>
          </div>
          <div class="membership_booking_info_product_price">
            $${data.subtotal.toFixed(2)} USD
          </div>
        </div>
      `;
      });

      const bookingHtml = `
        <div class="membership_booking" data-id="${
          obj.reservationOrderRoom.id
        }">
          <div class="membership_booking_gallery">
            ${bookingPicHtml}
          </div>
          <div class="membership_booking_info">
            <h2 class="membership_booking_info_title">${
              obj.reservationOrderRoom.id
            }</h2>

            <div class="membership_booking_info_group">
              <div class="membership_booking_info_date">
                <i class="fa-solid fa-calendar-days"></i>
                <span>${obj.reservationOrderRoom.checkInDate} - </span>
                <span>${obj.reservationOrderRoom.checkOutDate}</span>
              </div>

              <div class="membership_booking_info_guests">
                <i class="fa-solid fa-user"></i>
                <span>${obj.reservationOrderRoom.guests} person${
        obj.reservationOrderRoom.guests > 1 ? "s" : ""
      }</span>
              </div>
            </div>

            <div class="membership_booking_info_product">
              <div class="membership_booking_info_product_title">
                <div class="membership_booking_info_product_pic">
                  <img
                    src="${links[0].picMobile}"
                    alt=""
                  />
                </div>
                <div class="membership_booking_info_product_name">
                ${obj.reservationOrderRoom.title}
                </div>
              </div>
              <div class="membership_booking_info_product_price">
                $${obj.reservationOrderRoom.subtotal.toFixed(2)} USD
              </div>
            </div>

            <div class="membership_booking_info_rental">
              <h2 class="membership_booking_info_rental_title">
                ${bookingProductHtml ? "Rental Gear" : ""}
              </h2>

              <div class="membership_booking_info_products">
                ${bookingProductHtml}          
              </div>
            </div>

            <div class="membership_booking_info_total">
              <span>Subtotal: $${obj.subtotal.toFixed(2)} USD</span>
            </div>

            <div class="membership_booking_info_comment">
              <button class="membership_booking_info_comment_button">
                <i class="fa-regular fa-comment-dots"></i>
                Comment
              </button>
            </div>
          </div>
        </div>
      `;

      membershipBookings.insertAdjacentHTML("beforeend", bookingHtml);
    });
  }

  init(data) {
    this._renderBookings(data);
  }
}

export default new MembershipBookingsView();
