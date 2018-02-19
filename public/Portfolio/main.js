$(".scrolldown").on("click", function() {
  $("html, body").animate(
    {
      scrollTop: $(".section-part2").offset().top
    },
    1000
  );
});

$(".panel").hover(
  function() {
    $(this).addClass("highlighted");
  },
  function() {
    $(this).removeClass("highlighted");
  }
);

$('.landing').hide()

$(document).ready( function() {
  $(".landing").fadeIn(1000);
});


