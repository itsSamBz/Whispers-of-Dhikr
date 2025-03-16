const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))


//  // Initialize Bootstrap popovers
//  document.addEventListener('DOMContentLoaded', function() {
//     var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
//     var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
//       return new bootstrap.Popover(popoverTriggerEl)
//     })
//   });