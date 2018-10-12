/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

// attaches the html tweet object to the imdex html
 function renderTweets(tweetArray) {
    $('#tweetsContainer').empty()
    for (tweet of tweetArray) {
      var $tweet = createTweetElement(tweet)
      $('#tweetsContainer').prepend($tweet);
      redHeart(tweet._id)
    }

  }
//creates the html object for each tweet
  function createTweetElement(tweetData) {
    var $text = tweetData.content.text

    var $tweet = $("<article>").addClass("tweet")
    $tweet.append(`
        <header>
          <img class="avatar" src=${tweetData.user.avatars.regular}>
          <span class="name"> ${tweetData.user.name} </span>
          <span class="handle"> ${tweetData.user.handle} </span>
        </header>`)
    $tweet.append(`
        <div class="tweetText">
          <p>
          ${tweetData.content.text}
          </p>
        </div>`)
    var today = new Date()
    var tweetDay = new Date(tweetData.created_at)
    var daysBack = Math.round((today - tweetDay) / (1000 * 60 * 60 *24))

    $tweet.append(`
        <footer>
          <div class="likeCounter">${tweetData.likes} Like(s)</div>
          <div class="date"> ${daysBack} Days Ago</div>
          <div class="icons">
            <i class="icon ion-md-heart" id=${tweetData._id} likes=${tweetData.likes}></i>
            <i class="icon ion-md-repeat"></i>
            <i class="icon ion-md-flag"></i>
          </div>
        </footer>`)
    $(`footer #${tweetData._id}`).data("team", {likes: tweetData.likes})

    return $tweet
  }

// iterates through the database via tweet.js and datahelpers
  function loadTweets () {
    var $tweetData = $.getJSON('/tweets', function (data) {
      var items = []
      $.each( data, function(obj) {
        items.push(data[obj])
      })
      renderTweets(items)
      attachListeners()
    })


  }
//calling the load tweets function on server startup

loadTweets()

// submit the new tweet to the database

  $("section.new-tweet form").on("submit", function(event) {
    event.preventDefault()
    $(this).find("div.errorCatch").empty()
    $(this).find("div.errorCatch").slideUp()

    var inputVal = $(event.target).find("textarea").val()
    var cleanText = escape($(this).find("textarea").val())
    $(this).find("textarea").val(cleanText)
    if (inputVal.length > 1 && inputVal.length < 141) {
      var serTweet = $(this).serialize()
      $.post('/tweets', serTweet).done(loadTweets)
      $(event.target).find("textarea").val("")

       // does this need to be asyc???

    } else if (inputVal.length > 140) {
      $(this).find("div.errorCatch").slideDown()
      $(this).find("div.errorCatch").append("<p>Your Tweet is too long. 140 characters is the max.<p>")
    }
    else {
      $(this).find("div.errorCatch").slideDown()
      $(this).find("div.errorCatch").append("<p>Your Tweet is empty. Add something to tweet!<p>")
    }



  })

// protects us from sneaky users putting js in thier comments

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// adding the listeners after the tweets have been made

function attachListeners () {
  $("footer .ion-md-heart").click( function ()  {
    let tweetID = event.target.id
    let likesOrig = Number($(`#${tweetID}`).attr("likes"))
    if (likesOrig > 0) {
      var likes2 = likesOrig - 1
    } else {
      var likes2 = likesOrig + 1
    }
    let likeObj = {
        tweetID: tweetID,
        likes: likes2
    }
    $.ajax({
      url: `/tweets/${tweetID}`, //this is the problem line
      type: 'PUT',
      dataType: 'JSON',
      data: likeObj
    }).done(loadTweets)



  })

}

// this makes the heart red
function redHeart(tweetID) {
  console.log($(`#${tweetID}`).attr("likes"))
  if( $(`#${tweetID}`).attr("likes") > 0) {
    $(`#${tweetID}`).css("color", "rgb(255,0,0)")
  } else {
    $(`#${tweetID}`).css("color", "rgb(0,0,0)")
  }
}


// this is the sliding function
  var composeUp = 0
  $("#nav-bar div.buttonContainer button#compose").click( function () {
    if (composeUp === 0) {
      composeUp = 1
      $("section.new-tweet").slideUp()
    } else {
      composeUp = 0
      $("section.new-tweet").slideDown()
      $("section.new-tweet form textarea").select()
      window.scrollTo(0,0)
    }
  })

})
