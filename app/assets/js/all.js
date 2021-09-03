AOS.init({
  offset: 100,
  once: true,
});


$(function() {
  resetForm();
  checkSubscriptionValue();


  const tooltipDoms = document.querySelectorAll('.js-tooltip');
  tooltipDoms.forEach(function(dom) {
    const tooltip = new bootstrap.Tooltip(dom);
  });
});