"use strict";

var ObjectID = require('mongodb').ObjectID


// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweeter").insertOne(newTweet)
      callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweeter").find({}, (err, results) => {
        if (err) throw err;

        results.toArray((err, resultsArray) => {
          if (err) throw err;

          const sortNewestFirst = (a, b) => a.created_at - b.created_at
          callback(null, resultsArray.sort(sortNewestFirst))
        });
      })
    },

    updateTweet: function(tweetID, newLikes, callback) {
      let id = tweetID // I'm not sure if this will work
      let tweetIDObj = ObjectID(tweetID)
      let filter = {_id: tweetIDObj}
      let updatedData = {
          likes: newLikes
      }
      db.collection("tweeter").updateOne(filter, {$set: updatedData}, (err, result) => {
        if (err) {
          throw err
        }
        callback(null, result)
      })
    }



  };
}
