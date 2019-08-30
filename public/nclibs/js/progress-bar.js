function showProgressBar(per) {
  $(".nav-progress-bar").css({"opacity":1,"visibility":"visible","width":per+"%"});
  if (per === 100) {setTimeout(function(){ $(".nav-progress-bar").attr({"style":""}); }, 1600);}
}
