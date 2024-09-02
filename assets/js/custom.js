$(document).ready(function () {
  var instance = $(".book-box");
  $.each(instance, function (key, value) {
    var arrows = $(instance[key]).find(".arrow"),
      prevArrow = arrows.filter(".arrow-prev"),
      nextArrow = arrows.filter(".arrow-next"),
      card = $(instance[key]).find(".slider"),
      x = 0,
      mx = 0,
      maxScrollWidth =
        card[0].scrollWidth - card[0].clientWidth / 2 - card.width() / 2;

    $(arrows).on("click", function () {
      if ($(this).hasClass("arrow-next")) {
        x = card.width() / 2 + card.scrollLeft() - 10;
        card.animate({
          scrollLeft: x,
        });
      } else {
        x = card.width() / 2 - card.scrollLeft() - 10;
        card.animate({
          scrollLeft: -x,
        });
      }
    });

    $(card).on({
      mousemove: function (e) {
        var mx2 = e.pageX - this.offsetLeft;
        if (mx) this.scrollLeft = this.sx + mx - mx2;
      },
      mousedown: function (e) {
        this.sx = this.scrollLeft;
        mx = e.pageX - this.offsetLeft;
      },
      scroll: function () {
        toggleArrows();
      },
    });

    $(document).on("mouseup", function () {
      mx = 0;
    });

    function toggleArrows() {
      if (card.scrollLeft() > maxScrollWidth - 10) {
        nextArrow.addClass("disabled");
      } else if (card.scrollLeft() < 10) {
        prevArrow.addClass("disabled");
      } else {
        nextArrow.removeClass("disabled");
        prevArrow.removeClass("disabled");
      }
    }
  });
});
