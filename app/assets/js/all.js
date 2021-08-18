const jsSwiper = document.querySelector('.js-swiper');
if (jsSwiper) {
  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    breakpoints: {
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
  };
}

AOS.init({
  once: true,
});


$(function() {
  const signInModal = new bootstrap.Modal($('.js-sign-in-modal'));
  const signUpModal = new bootstrap.Modal($('.js-sign-up-modal'));
  const videoModal = new bootstrap.Modal($('.js-video-modal'));

  $('.js-sign-in-modal-btn').on('click', () => {
    signInModal.show();
    signUpModal.hide();
  });
  $('.js-sign-up-modal-btn').on('click', () => {
    signInModal.hide();
    signUpModal.show();
  });


  $('.js-video-modal-btn').on('click', () => {
    videoModal.show();
  });


  $('.js-btn-close-video').on('click',function(){
    $('iframe',).attr('src',     
      $('iframe').attr('src'));
  });
});