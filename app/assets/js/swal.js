function swalFn(msg) {
  Swal.fire({
    position: 'top',
    icon: 'success',
    title: msg,
    toast: true,
    showConfirmButton: false,
    timer: 1800,
  });
}