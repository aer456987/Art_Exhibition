const signInModal = new bootstrap.Modal($('.js-sign-in-modal'));
const signUpModal = new bootstrap.Modal($('.js-sign-up-modal'));
const videoModal = new bootstrap.Modal($('.js-video-modal'));
resetForm();
validationForm();

$('.js-sign-in-modal-btn').on('click', () => {
  resetForm();
  signInModal.show();
  signUpModal.hide();
});
$('.js-sign-up-modal-btn').on('click', () => {
  resetForm();
  signInModal.hide();
  signUpModal.show();
});

$('.js-video-modal-btn').on('click', () => {
  const videoUrl = 'https://www.youtube-nocookie.com/embed/hwv4-ayS_7k?rel=0';
  $('iframe').attr('src', videoUrl);
  videoModal.show();
});
$('.js-btn-close-video').on('click', () => {
  $('iframe').attr('src', '');
});


$('.js-modal-login-check').on('submit', function(event) {
  event.preventDefault();
  signInModal.hide();
  swalFn('登入成功');
});
$('.js-modal-sign-up-check').on('submit', function(event) {
  event.preventDefault();
  signUpModal.hide();
  swalFn('註冊成功');
});