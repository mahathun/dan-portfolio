
function toggleSocialBar(){
  var topValueForShow = '35%';
  var topValueForHide = '95%'
  var social_bar = $('div.social-icon-bar');
  var toggle_button = $('.social-icon-bar-toggle');

  if($(toggle_button).hasClass('fa-chevron-circle-down')){
    $(social_bar).css('top',topValueForHide);
    $('#social-icon-bar-toggle').attr('title','Get Me Outta here !!!');
  }else{
    $(social_bar).css('top',topValueForShow);
    $('#social-icon-bar-toggle').attr('title',"Hide Me :'(");

  }

  $(toggle_button).toggleClass('fa-chevron-circle-up');
  $(toggle_button).toggleClass('fa-chevron-circle-down');

}
