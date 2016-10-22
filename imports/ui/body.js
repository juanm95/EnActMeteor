import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.js';

// Template imports
import './body.html';
import './displayAllIssues.js';
import './ShowIssue.js'

Template.ShowIssue.onCreated(function listsShowPageOnCreated() {
  this.getListId = () => FlowRouter.getParam('_id');
});

Template.Page_Template.events({
  'submit .new-task'(event) {
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;

    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });

    target.text.value = '';
  }
})