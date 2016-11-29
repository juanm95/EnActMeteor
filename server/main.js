import '../imports/api/issues.js'
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  if( Meteor.users.find({username: "admin"}).count() === 0) {
    var options = {
      username: "admin", 
      password: "cgnetswara8", 
    };
    Accounts.createUser(options);
  }
});
