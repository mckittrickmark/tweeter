"use strict";

$(document).ready(function() {


  $(".new-tweet form textarea").bind("keyup", function(event) {
    let counter = 140 - this.value.length
    let counterObj = $(this).parent().children(".counter")
    counterObj.prepend()
    counterObj.text(counter)
    if (counter < 0) {
      counterObj.css("color","red")
    } else {
      counterObj.css("color","black")
    }
  })
});

