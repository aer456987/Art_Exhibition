"use strict";

AOS.init({
  offset: 100,
  once: true
});
$(function () {
  resetForm();
  checkSubscriptionValue();
  var tooltipDoms = document.querySelectorAll('.js-tooltip');
  tooltipDoms.forEach(function (dom) {
    var tooltip = new bootstrap.Tooltip(dom);
  });
  $('.js-subscription-btn').on('click', function () {
    $('.js-subscription-input').val('');
    $(this).prop('disabled', true);
    swalFn('成功訂閱');
  });
  $('.js-collect-btn').on('click', function () {
    var btnContent = $(this).text();
    swalFn('已加入收藏');

    if (btnContent === '收藏展覽') {
      console.log(btnContent);
      $(this).text('展覽已收藏').removeClass('btn-outline-primary').addClass('btn-secondary');
    } else {
      console.log(btnContent);
      $(this).text('收藏展覽').removeClass('btn-secondary').addClass('btn-outline-primary');
    }
  });
  $('.js-add-cart').on('click', function () {
    swalFn('展覽已加入購物車');
  });
  $('.js-modal-sign-up-check').on('submit', function (event) {
    event.preventDefault();
    signUpModal.hide();
    swalFn('註冊成功');
  });
  $('.js-order-form-check').on('submit', function (event) {
    event.preventDefault();
    location.href = './payment.html';
  });
  $('.js-payment-form-check').on('submit', function (event) {
    event.preventDefault();
    location.href = './established.html';
  });
  $('.js-ticket-type').on('click', function () {
    var checkedClass = 'border__bottom__hover--checked';
    $('.js-ticket-type').removeClass(checkedClass);
    $(this).addClass(checkedClass);
  });
});
"use strict";

function resetForm() {
  var allInputs = document.querySelectorAll('input');
  var allErrorMsg = document.querySelectorAll('.js-validate-msg');
  var allSubmitBtn = document.querySelectorAll('.js-form-submit-btn');
  var classStyle = ['border-danger', 'animate__animated', 'animate__headShake'];
  allInputs.forEach(function (input) {
    $(input).val('');
    $(input).removeClass(classStyle);
  });
  allErrorMsg.forEach(function (msg) {
    $(msg).text('');
    $(msg).removeClass('d-block');
  });
  allSubmitBtn.forEach(function (btn) {
    $(btn).siblings('.disabled-style').removeClass('d-none');
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
  var dom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.js-user-email';
  var data = {
    inputs: document.querySelectorAll(dom),
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
    msg: '須為數字，格式為 0123-4567-8910-1112'
  };
  validationInputFn(data);
}

function validationCreditCardDate() {
  var data = {
    inputs: $('.js-credit-card-date'),
    rule: /^\d{4}\/[0-1]{1}\d{1}$/,
    msg: '須為數字，格式為 2021/12'
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

$('.js-form-check').on('change', function () {
  var formInputs = document.querySelectorAll('.js-form-input');
  checkFormValue(formInputs);
});
$('.js-modal-login-check').on('change', function () {
  var formInputs = document.querySelectorAll('.js-modal-login-input');
  checkFormValue(formInputs);
});
$('.js-modal-sign-up-check').on('change', function () {
  var formInputs = document.querySelectorAll('.js-modal-sign-up-input');
  checkFormValue(formInputs);
});

function checkFormValue(inputs) {
  var submitBtn = $('.js-form-submit-btn');
  var inputValueTrue = 0;
  inputs.forEach(function (input) {
    if (input.value !== '') {
      inputValueTrue += 1;
    }
  });

  if (inputValueTrue === inputs.length) {
    $(submitBtn).siblings('.disabled-style').addClass('d-none');
  } else {
    $(submitBtn).siblings('.disabled-style').removeClass('d-none');
  }
}

;
$('.js-subscription-input').on('input propertychange', function () {
  var borderStyle = ['border-danger', 'border-2', 'animate__animated', 'animate__headShake'];
  var inputValue = $(this).val();
  var rule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
  var errorName = $(this).attr('name');
  var errorMsg = $('.js-subscription-msg');
  var errorCustomMsg = "".concat(errorName, " \u683C\u5F0F\u932F\u8AA4");

  if (inputValue === '') {
    $(this).removeClass(borderStyle);
    $(errorMsg).removeClass('d-block');
    $('.js-subscription-btn').prop('disabled', true);
  } else if (!rule.test(inputValue)) {
    $(this).addClass(borderStyle);
    $(errorMsg).addClass('d-block');
    $(errorMsg).text(errorCustomMsg);
    $('.js-subscription-btn').prop('disabled', true);
  } else {
    $(this).removeClass(borderStyle);
    $(errorMsg).removeClass('d-block');
    $('.js-subscription-btn').prop('disabled', false);
  }
});

function checkSubscriptionValue() {
  var errorMsg = $('.js-subscription-msg');

  if ($('.js-subscription-input').val() === '') {
    $('.js-subscription-btn').prop('disabled', true);
    $(errorMsg).removeClass('d-block');
  }
}
"use strict";

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
$('.js-modal-login-check').on('submit', function (event) {
  event.preventDefault();
  signInModal.hide();
  swalFn('登入成功');
});
$('.js-modal-sign-up-check').on('submit', function (event) {
  event.preventDefault();
  signUpModal.hide();
  swalFn('註冊成功');
});
"use strict";

function swalFn(msg) {
  Swal.fire({
    position: 'top',
    icon: 'success',
    title: msg,
    toast: true,
    showConfirmButton: false,
    timer: 1800
  });
}
"use strict";

$(function () {
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
});
//# sourceMappingURL=all.js.map
