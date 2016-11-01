import { Issues } from '../api/issues.js';

import './ShowIssue.html'


Template.ShowIssue.onCreated(function listsShowPageOnCreated() {
  this.getListId = () => FlowRouter.getParam('_id');

  // this.autorun(() => {
  //   this.subscribe('todos.inList', { listId: this.getListId() });
  // });
});

Template.ShowIssue.helpers({
  issues() {
    const instance = Template.instance();
    const listId = instance.getListId();
    issue = Issues.find( { _id: listId } );
    return issue
  },
  steps() {
    const instance = Template.instance();
    const listId = instance.getListId();
    issue = Issues.findOne( { _id: listId } );
    return issue.steps
  }
});

Template.ShowIssue.events({
  'submit .new-step'(event) {
    event.preventDefault();
    stepObject = $("[name='new-step']");
    const stepText = stepObject.val();
    const instance = Template.instance();
    const listId = instance.getListId();
    Issues.update({
      _id: listId
    },
    { $addToSet: {steps: {text: stepText, createdAt: new Date(), username: Meteor.user().username}}},
    {}
    );
    stepObject.val("");
  }
})