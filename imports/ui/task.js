import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../api/tasks.js';

import './task.html'

Template.task.events({
  'click .toggle-checked'() {
    Tasks.update(this._id, {
      $set: { checked: !this.checked }
    });
  },
  'click .delete'() {
    Tasks.remove(this._id);
  },
})