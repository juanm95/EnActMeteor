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
    console.log("tasks")
    const instance = Template.instance();
    console.log(instance.state)
    if (instance.state.get('hideCompleted')) {
      return Tasks.find({ checked: {$ne: true} }, { sort: {createdAt: -1 } });
    }
    console.log(Tasks.find({}));
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
})

Template.displayAllIssues.events({
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  }
})