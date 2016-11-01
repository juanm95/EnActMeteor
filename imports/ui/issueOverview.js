import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Meteor } from 'meteor/meteor';
import { Issues } from '../api/issues.js';

import './issueOverview.html'

Template.issueOverview.events({
  'click .toggle-checked'() {
    Issues.update(this._id, {
      $set: { checked: !this.checked }
    });
  },
  'click .delete'() {
    Issues.remove(this._id);
  },
})