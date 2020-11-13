$(document).ready(function() {
  function init() {
    openModal();
  }
  function openModal() {
    
    $('.btn-modal').on('click', function (e) {
      if(e) {e.preventDefault();}
      var target = $(this).attr('href');
      
      $(target).show();
      $('body').addClass("modal-overflow");
    })
    
    $('.modal__close').on('click', function (e) {
      if(e) {e.preventDefault();}
      
      $(this).parents('.modal').hide();
      $('body').removeClass("modal-overflow");
    })
    
    $('.modal').on('click', function(e) {
      if(e.target == $(this)[0]) {
        $(this).hide(); // or hide()
        $('body').removeClass("modal-overflow");
      }
    });
    
    
  }
  init();
});