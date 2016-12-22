import '../imports/api/issues.js'
import '../imports/api/tags.js'
import {
  Meteor
}
from 'meteor/meteor';

function getCommentsAsync(parameters, callback) {
  return FB.api('/' + post._id + '/comments', 'GET', params)
}

function getCommentsOfEachPost(unlimitedPageAccessToken) {
  var posts = Issues.find({})
  posts.forEach(function (post) {
//    console.log("For post: " + post.url);
    var getCommentsSynchronous = Meteor.wrapAsync(FB.api, FB);
    try {
      var response = getCommentsSynchronous('/' + post._id + '/comments', 'GET', {
        access_token: unlimitedPageAccessToken,
        summary: 'true',
        order: 'reverse_chronological'
      });
    } catch (error) {
      response = error
      if (response && !response.error) {
//        console.log("----------------------########################-------------------------")
//        console.log(response.data[0])
//        if (response.data[0] === undefined) {
//          console.log(response)
//        }
        for (i = 0; i < response.data.length; i++) {
          var message = response.data[i].message
          Issues.update({
            _id: post._id
          }, {
            $addToSet: {
              comments: message
            }
          });
        }
      }
    }
    //    var id = post._id
    //    FB.api(
    //      '/' + id + '/comments', 'GET', {
    //        access_token: unlimitedPageAccessToken,
    //        summary: 'true',
    //        order: 'reverse_chronological'
    //      },
    //      Meteor.bindEnvironment(function (response) {
    //        if (response && !response.error) {
    //          console.log("----------------------########################-------------------------")
    //          console.log(response.data[0])
    //          for (i = 0; i < response.data.length; i++) {
    //            var message = response.data[i].message
    //            Issues.update({
    //              _id: id
    //            }, {
    //              $addToSet: {
    //                comments: message
    //              }
    //            });
    //          }
    //        }
    //      })
    //    );
  });
}

function getOriginTag(message){
  if(message.includes("cgnetswara.org")){
    return "on cgnetswara.org";
  }
  return null;
}

var FB = require('fb');
Meteor.startup(() => {

  Tags.update(
    {_id : "alltags"},
    {$setOnInsert :
      {tags: ['open', 'closed', 
        'coal mining', 'ration', 'food', 'forest', 'land',
        'teacher', 'school',
        'handpump', 'water', 'nrega', 'electricity',
        'Hindi', 'Gondi', 
        'Madhya Pradesh', 'Chhattisgarh',
        'featured', 'on cgnetswara.org']
      }
    },
    {upsert: true}
  );

  Comments = new Meteor.EnvironmentVariable;
  const unlimitedPageAccessToken = 'EAASYhfO68sgBANUSnleUD0JXcFMU3KwyrpBI96BQG9LKuXGTIWcWe4lZBxjlcOYQjYdZCPGWaMkg94o2REH22YHPhvnJZCTUsvPpbnhPyFlelijZAK42c5X1m230bkpQ2OKMz6MHYZAmc9e3vs5a1IuxKmQC24HyV1CB2Eqy7LAZDZD'
  FB.setAccessToken(unlimitedPageAccessToken);
  Meteor.setInterval(function () {
      FB.api('/108247265894675/feed?fields=message, object_id, permalink_url, created_time, updated_time',
        'GET', {
          access_token: unlimitedPageAccessToken
        },
        Meteor.bindEnvironment(function (response) {
          if (response && !response.error) {
            for (i = 0; i < response.data.length; i++) {
              var originTag = getOriginTag(response.data[i].message);
              Issues.update({
                _id: response.data[i].id
              }, {
                $set: {
                  message: response.data[i].message,
                  object_id: response.data[i].object_id,
                  url: response.data[i].permalink_url,
                  created_time: response.data[i].created_time,
                  last_interaction_time: response.data[i].updated_time,
                  comments: []
                },
                $setOnInsert: {
                  tags: ["open", originTag],
                  isCached: false
                }
              }, {
                upsert: true
              });
            }
          }
        })
      );
      getCommentsOfEachPost(unlimitedPageAccessToken);
    }, 120 * 1000)
    // code to run on server at startup
  if (Meteor.users.find({
      username: "admin"
    }).count() === 0) {
    var options = {
      username: "admin",
      password: "cgnetswara8",
    };
    Accounts.createUser(options);
  }
});