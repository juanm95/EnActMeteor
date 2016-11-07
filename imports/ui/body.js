import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import '../api/issues.js';

// Template imports
import './body.html';
import './displayAllIssues.js';
import './ShowIssue.js'

Template.Page_Template.helpers({
  addissues() {
    console.log("add")
    //console.log(issues)
  },
  currentUserIsAdmin() {
    doc = Meteor.users.findOne()
    if (doc === undefined) {
      return false;
    }
    console.log(doc)
    return doc.admin === "true";
  },
  posts() {
    return Issues.find({});
  }
});

Template.Page_Template.events({
  'submit .new-issue'(event) {
    event.preventDefault();
    subjectObject = $(".new-issue [name='Subject']");
    detailsObject = $(".new-issue [name='Details']");
    const subjectText = subjectObject.val();
    const detailsText = detailsObject.val();
    console.log(subjectText)
    console.log(detailsText)
    Issues.insert({
      subject: subjectText,
      details: detailsText,
      steps: [],
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
    detailsObject.val("");
    subjectObject.val("");
  }
});