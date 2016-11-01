import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Issues } from '../api/issues.js';

// Template imports
import './body.html';
import './displayAllIssues.js';
import './ShowIssue.js'

Template.Page_Template.helpers({
  currentUserIsAdmin() {
    doc = Meteor.users.findOne()
    if (doc === undefined) {
      return false;
    }
    console.log(doc)
    return doc.admin === "true";
  }
});

Template.Page_Template.events({
  'submit .new-issue'(event) {
    event.preventDefault();
    const textBox = event.target
    const text = textBox.text.value;
    Issues.insert({
      subject: "SUBJECT",
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
    textBox.text.value = '';
  }
})