function resetForm() {
  const allInputs = document.querySelectorAll('input');
  const allErrorMsg = document.querySelectorAll('.js-validate-msg');
  const classStyle = ['border-danger', 'animate__animated', 'animate__headShake'];

  allErrorMsg.forEach((msg) => {
    $(msg).text('');
    $(msg).removeClass('d-block');
  });

  allInputs.forEach((input) => {
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
  const data = {
    inputs: document.querySelectorAll('.js-user-email'),
    rule: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
    msg: '格式錯誤',
  };
  validationAllInputsFn(data);
}
function validationPassword() {
  const data = {
    inputs: document.querySelectorAll('.js-user-password'),
    rule: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&]{1})[A-Za-z\d@#$!%*?&]{8,}$/,
    msg: '須 8 碼以上含大、小寫英文、數字和特殊符號',
  };
  validationAllInputsFn(data);
}
function validationUserName() {
  const userNameInputs = document.querySelectorAll('.js-user-name');

  userNameInputs.forEach((input) => {
    $(input).on('input propertychange', function() {
      const errorName =  $(input).attr('name');
      const inputDatas = {
        input: $(this),
        inputValue: $(this).val(),
        rule: /^^[a-zA-Z\s\d]+$/,
        errorName: errorName,
      }
      checkUserName(inputDatas);
    });
  });
}
function validationPhone() {
  const data = {
    inputs: document.querySelectorAll('.js-user-phone'),
    rule: /^09\d{8}$/,
    msg: '格式錯誤，須為 09 開頭的 10 碼數字',
  };
  validationAllInputsFn(data);
}
function validationCreditCardNumber() {
  const data = {
    inputs: $('.js-credit-card-number'),
    rule: /^[\d]{4}-[\d]{4}-[\d]{4}-[\d]{4}$/,
    msg: '須為數字，格式為 0123-4567-8900',
  };
  validationInputFn(data);
}
function validationCreditCardDate() {
  const data = {
    inputs: $('.js-credit-card-date'),
    rule: /^\d{4}-[0-1]{1}\d{1}$/,
    msg: '須為數字，格式為 2021-12',
  };
  validationInputFn(data);
}
function validationCreditCardPassword() {
  const data = {
    inputs: $('.js-credit-card-password'),
    rule: /^\d{3}$/,
    msg: '須為 3 碼數字',
  };
  validationInputFn(data);
}


function validationAllInputsFn(data) {
  const { inputs, rule, msg } = data;

  inputs.forEach((input) => {
    $(input).on('input propertychange', function() {
      const errorName =  $(input).attr('name');
      const inputDatas = {
        input: $(this),
        inputValue: $(this).val(),
        rule: rule,
        errorName: errorName,
        errorCustomMsg: `${errorName}${msg}`,
      }
      checkInputDate(inputDatas);
    });
  });
}
function validationInputFn(data) {
  const { inputs, rule, msg } = data;

  $(inputs).on('input propertychange', function() {
    const errorName =  $(inputs).attr('name');
    const inputDatas = {
      input: $(this),
      inputValue: $(this).val(),
      rule: rule,
      errorName: errorName,
      errorCustomMsg: `${errorName}${msg}`,
    }
    checkInputDate(inputDatas);
  });
}

function checkInputDate(obj) {
  const borderStyle = ['border-danger', 'animate__animated', 'animate__headShake'];
  const { input, inputValue, rule, errorName, errorCustomMsg } = obj;
  const errorMsg = $(input).next();

  if(!rule.test(inputValue)) {
    input.addClass(borderStyle);
    $(errorMsg).addClass('d-block');

    if (inputValue === '') {
      $(errorMsg).text(`${errorName}為必填`);
    } else {
      $(errorMsg).text(errorCustomMsg);
    }
  } else {
    input.removeClass(borderStyle);
    $(errorMsg).removeClass('d-block');
  }
}
function checkUserName(obj) {
  const borderStyle = ['border-danger', 'animate__animated', 'animate__headShake'];
  const { input, inputValue, rule, errorName } = obj;
  const errorMsg = $(input).next();

  if (!rule.test(inputValue)) {
    input.addClass(borderStyle);
    $(errorMsg).addClass('d-block');

    if(inputValue === '') {
      $(errorMsg).text(`${errorName}為必填`);
    } else {
      $(errorMsg).text(`${errorName}不得含特殊符號`);
    }

  } else if (inputValue.length >= 2) {
    input.removeClass(borderStyle);
    $(errorMsg).removeClass('d-block');
  } else {
    input.addClass(borderStyle);
    $(errorMsg).addClass('d-block');
    $(errorMsg).text(`${errorName}須超過兩個字以上`);
  }
}