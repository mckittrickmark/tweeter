"use strict";

$(document).ready(function() {
  console.log("This should be working now")

  $(".new-tweet form textarea").bind("keyup", function(event) {
    console.log(140 - this.value.length)
    let counter = 140 - this.value.length
    let counterObj = $(this).parent().children(".counter")
    counterObj.text(counter)
    if (counter < 0) {
      counterObj.css("color","red")
    } else {
      counterObj.css("color","black")
    }
  })
});

