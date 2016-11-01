import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Issues } from '../api/issues.js';

// Template imports
import './issueOverview.js';
import './displayAllIssues.html'
import './ShowIssue.html'

Template.displayAllIssues.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict() // Blaze
})

Template.displayAllIssues.helpers({
  issues() {
    console.log("issues is called.")
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      return Issues.find({ checked: {$ne: true} }, { sort: {createdAt: -1 } });
    }
    return Issues.find({}, { sort: { createdAt: -1 } });
  },
})

Template.displayAllIssues.events({
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  }
})