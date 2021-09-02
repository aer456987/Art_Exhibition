"use strict";

var jsSwiper = document.querySelector('.js-swiper');

if (jsSwiper) {
  var getDirection = function getDirection() {
    var windowWidth = window.innerWidth;
    var direction = window.innerWidth <= 767 ? 'vertical' : 'horizontal';
    return direction;
  };

  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3500,
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
  ;
}

AOS.init({
  offset: 100,
  once: true
});
$(function () {
  var signInModal = new bootstrap.Modal($('.js-sign-in-modal'));
  var signUpModal = new bootstrap.Modal($('.js-sign-up-modal'));
  var videoModal = new bootstrap.Modal($('.js-video-modal'));
  resetForm();
  validationForm();
  $('.js-sign-in-modal-btn').on('click', function () {
    resetForm();
    signInModal.show();
    signUpModal.hide();
  });
  $('.js-sign-up-modal-btn').on('click', function () {
    resetForm();
    signInModal.hide();
    signUpModal.show();
  });
  $('.js-video-modal-btn').on('click', function () {
    var videoUrl = 'https://www.youtube-nocookie.com/embed/hwv4-ayS_7k?rel=0';
    $('iframe').attr('src', videoUrl);
    videoModal.show();
  });
  $('.js-btn-close-video').on('click', function () {
    $('iframe').attr('src', '');
  });

  function resetForm() {
    var allInputs = document.querySelectorAll('input');
    var allErrorMsg = document.querySelectorAll('.js-validate-msg');
    var classStyle = ['border-danger', 'animate__animated', 'animate__headShake'];
    allErrorMsg.forEach(function (msg) {
      $(msg).text('');
      $(msg).removeClass('d-block');
    });
    allInputs.forEach(function (input) {
      $(input).val('');
      $(input).removeClass(classStyle);
    });
  }

  function validationForm() {
    validationEmail();
    validationPassword();
    validationUserName();
    validationPhone();
    validationCreditCardNumber();
    validationCreditCardDate();
    validationCreditCardDate();
    validationCreditCardPassword();
  }

  function validationEmail() {
    var data = {
      inputs: document.querySelectorAll('.js-user-email'),
      rule: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
      msg: '格式錯誤'
    };
    validationAllInputsFn(data);
  }

  function validationPassword() {
    var data = {
      inputs: document.querySelectorAll('.js-user-password'),
      rule: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&]{1})[A-Za-z\d@#$!%*?&]{8,}$/,
      msg: '須 8 碼以上含大、小寫英文、數字和特殊符號'
    };
    validationAllInputsFn(data);
  }

  function validationUserName() {
    var userNameInputs = document.querySelectorAll('.js-user-name');
    userNameInputs.forEach(function (input) {
      $(input).on('input propertychange', function () {
        var errorName = $(input).attr('name');
        var inputDatas = {
          input: $(this),
          inputValue: $(this).val(),
          rule: /^^[a-zA-Z\s\d]+$/,
          errorName: errorName
        };
        checkUserName(inputDatas);
      });
    });
  }

  function validationPhone() {
    var data = {
      inputs: document.querySelectorAll('.js-user-phone'),
      rule: /^09\d{8}$/,
      msg: '格式錯誤，須為 09 開頭的 10 碼數字'
    };
    validationAllInputsFn(data);
  }

  function validationCreditCardNumber() {
    var data = {
      inputs: $('.js-credit-card-number'),
      rule: /^[\d]{4}-[\d]{4}-[\d]{4}-[\d]{4}$/,
      msg: '須為數字，格式為 0123-4567-8900'
    };
    validationInputFn(data);
  }

  function validationCreditCardDate() {
    var data = {
      inputs: $('.js-credit-card-date'),
      rule: /^\d{4}-[0-1]{1}\d{1}$/,
      msg: '須為數字，格式為 2021-12'
    };
    validationInputFn(data);
  }

  function validationCreditCardPassword() {
    var data = {
      inputs: $('.js-credit-card-password'),
      rule: /^\d{3}$/,
      msg: '須為 3 碼數字'
    };
    validationInputFn(data);
  }

  function validationAllInputsFn(data) {
    var inputs = data.inputs,
        rule = data.rule,
        msg = data.msg;
    inputs.forEach(function (input) {
      $(input).on('input propertychange', function () {
        var errorName = $(input).attr('name');
        var inputDatas = {
          input: $(this),
          inputValue: $(this).val(),
          rule: rule,
          errorName: errorName,
          errorCustomMsg: "".concat(errorName).concat(msg)
        };
        checkInputDate(inputDatas);
      });
    });
  }

  function validationInputFn(data) {
    var inputs = data.inputs,
        rule = data.rule,
        msg = data.msg;
    $(inputs).on('input propertychange', function () {
      var errorName = $(inputs).attr('name');
      var inputDatas = {
        input: $(this),
        inputValue: $(this).val(),
        rule: rule,
        errorName: errorName,
        errorCustomMsg: "".concat(errorName).concat(msg)
      };
      checkInputDate(inputDatas);
    });
  }

  function checkInputDate(obj) {
    var borderStyle = ['border-danger', 'animate__animated', 'animate__headShake'];
    var input = obj.input,
        inputValue = obj.inputValue,
        rule = obj.rule,
        errorName = obj.errorName,
        errorCustomMsg = obj.errorCustomMsg;
    var errorMsg = $(input).next();

    if (!rule.test(inputValue)) {
      input.addClass(borderStyle);
      $(errorMsg).addClass('d-block');

      if (inputValue === '') {
        $(errorMsg).text("".concat(errorName, "\u70BA\u5FC5\u586B"));
      } else {
        $(errorMsg).text(errorCustomMsg);
      }
    } else {
      input.removeClass(borderStyle);
      $(errorMsg).removeClass('d-block');
    }
  }

  function checkUserName(obj) {
    var borderStyle = ['border-danger', 'animate__animated', 'animate__headShake'];
    var input = obj.input,
        inputValue = obj.inputValue,
        rule = obj.rule,
        errorName = obj.errorName;
    var errorMsg = $(input).next();

    if (!rule.test(inputValue)) {
      input.addClass(borderStyle);
      $(errorMsg).addClass('d-block');

      if (inputValue === '') {
        $(errorMsg).text("".concat(errorName, "\u70BA\u5FC5\u586B"));
      } else {
        $(errorMsg).text("".concat(errorName, "\u4E0D\u5F97\u542B\u7279\u6B8A\u7B26\u865F"));
      }
    } else if (inputValue.length >= 2) {
      input.removeClass(borderStyle);
      $(errorMsg).removeClass('d-block');
    } else {
      input.addClass(borderStyle);
      $(errorMsg).addClass('d-block');
      $(errorMsg).text("".concat(errorName, "\u9808\u8D85\u904E\u5169\u500B\u5B57\u4EE5\u4E0A"));
    }
  }
});
//# sourceMappingURL=all.js.map
