"use strict";

// $(function() { });
var swiper = new Swiper('.swiper-container', {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 35000,
    disableOnInteraction: false
  },
  breakpoints: {
    767: {
      slidesPerView: 2
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 30
    }
  },
  direction: getDirection(),
  on: {
    resize: function resize() {
      swiper.changeDirection(getDirection());
    }
  }
});

function getDirection() {
  var windowWidth = window.innerWidth;
  var direction = window.innerWidth <= 767 ? 'vertical' : 'horizontal';
  return direction;
}
//# sourceMappingURL=all.js.map
