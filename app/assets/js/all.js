$(function() {
  AOS.init({
    offset: 100,
    once: true,
  });
  

  resetForm();
  checkSubscriptionValue();

  const tooltipDoms = document.querySelectorAll('.js-tooltip');
  tooltipDoms.forEach(function(dom) {
    const tooltip = new bootstrap.Tooltip(dom);
  });

  $('.js-subscription-btn').on('click', function() {
    $('.js-subscription-input').val('');
    $(this).prop('disabled', true);
    swalFn('成功訂閱');
  });

  $('.js-collect-btn').on('click', function() {
    const btnContent = $(this).text()
    swalFn('已加入收藏');

    if (btnContent === '收藏展覽') {
      console.log(btnContent);
      $(this).text('展覽已收藏').removeClass('btn-outline-primary').addClass('btn-secondary');
    } else {
      console.log(btnContent);
      $(this).text('收藏展覽').removeClass('btn-secondary').addClass('btn-outline-primary');
    }
  })
  
  $('.js-add-cart').on('click', function() {
    swalFn('展覽已加入購物車');
  });


  $('.js-modal-sign-up-check').on('submit', function(event) {
    event.preventDefault();
    signUpModal.hide();
    swalFn('註冊成功');
  });

  $('.js-order-form-check').on('submit', function(event) {
    event.preventDefault();
    location.href='./payment.html';
  });
  $('.js-payment-form-check').on('submit', function(event) {
    event.preventDefault();
    location.href='./established.html';
  });

  $('.js-ticket-type').on('click', function() {
    const checkedClass = 'border__bottom__hover--checked';

    $('.js-ticket-type').removeClass(checkedClass);
    $(this).addClass(checkedClass);
  });
});