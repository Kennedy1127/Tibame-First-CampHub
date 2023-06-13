class ReservationView {
  renderRoomData(data) {
    const landing = document.querySelector(".landing");
    const reserveIntroHeaderTitle = document.querySelector(
      ".reserve_intro_header_title"
    );
    const reserveIntroContentFeatures = document.querySelector(
      ".reserve_intro_content_features"
    );
    const reservePaymentHeaderPrice = document.querySelector(
      ".reserve_payment_header_price"
    );
    const reservePaymentHeaderRate = document.querySelector(
      ".reserve_payment_header_rate"
    );

    data.imgs.forEach((img, i) => {
      const html = `
      <div class="landing_pic landing_pic--${i + 1}">
        <picture>
            <source
              media="min-width:1000px"
              srcset="
                ${img.pic}
              "
            />
            <source
              media="min-width:300px"
              srcset="
              ${img.picMobile}
              "
            />
            <img
              src=" ${img.pic}"
              alt="room-1-1"
            />
          </picture>
     </div>`;

      landing.insertAdjacentHTML("beforeend", html);
    });

    data.features.forEach((feature) => {
      const html = `
        <div class="reserve_intro_content_feature">
          <div class="reserve_intro_content_feature_icon">
            <img
              src="${feature.icon}"
              alt="${feature.alt}"
            />
          </div>
          <span class="reserve_intro_content_feature_text">
            ${feature.text}
          </span>
        </div>
      `;

      reserveIntroContentFeatures.insertAdjacentHTML("beforeend", html);
    });

    reserveIntroHeaderTitle.textContent = data.title;
    reservePaymentHeaderPrice.innerHTML = `$${data.price} <span>/ night</span>`;
    reservePaymentHeaderRate.innerHTML = `
    <i class="fa-solid fa-star"></i> ${data.rate}
    <span>- ${data.reviews} reviews</span>`;
  }
}

export default new ReservationView();
