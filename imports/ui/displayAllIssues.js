import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.js';

// Template imports
import './task.js';
import './displayAllIssues.html'
import './ShowIssue.html'

Template.displayAllIssues.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict() // Blaze
})

Template.displayAllIssues.helpers({
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      return Tasks.find({ checked: {$ne: true} }, { sort: {createdAt: -1 } });
    }
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
})

Template.displayAllIssues.events({
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  }
})