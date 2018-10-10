/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */




$(document).ready(function() {
  const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];
 function renderTweets(tweetArray) {
    for (tweet of tweetArray) {
      console.log(tweet)
      var $tweet = createTweetElement(tweet)
      $('#tweetsContainer').append($tweet);
    }

  }


  function createTweetElement(tweetData) {
    var $tweet = $("<article>").addClass("tweet")
    $tweet.append(`
        <header>
          <img class="avatar" src=${tweetData.user.avatars.regular}>
          <span class="name"> ${tweetData.user.name} </span>
          <span class="handle"> ${tweetData.user.handle} </span>
        </header>`)
    $tweet.append(`
        <div class="tweetText">
          ${tweetData.content.text}
        </div>`)
    var today = new Date()
    var tweetDay = new Date(tweetData.created_at)
    var daysBack = Math.round((today - tweetDay) / (1000 * 60 * 60 *24))

    $tweet.append(`
        <footer>
          <div class="date"> ${daysBack} Days Ago</div>
          <div class="icons">
            <i class="icon ion-md-heart"></i>
            <i class="icon ion-md-repeat"></i>
            <i class="icon ion-md-flag"></i>
          </div>
        </footer>`)
    return $tweet
  }
  renderTweets(data)

})
