// $(function() {

// });

const swiper = new Swiper('.swiper-container', {
  // slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },
  breakpoints: {
    480: {
      slidesPerView: 3,
    },
    767: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 30,
    }
  },
  direction: getDirection(),
  on: {
    resize: function () {
      swiper.changeDirection(getDirection());
    },
  },
});

function getDirection() {
  const windowWidth = window.innerWidth;
  const direction = window.innerWidth <= 767 ? 'vertical' : 'horizontal';

  return direction;
}