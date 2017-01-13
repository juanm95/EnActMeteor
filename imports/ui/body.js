import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import '../api/issues.js';
import '../api/tags.js';


// Template imports
import './body.html';
import './page.html'
import './displayAllIssues.js';
import './ShowIssue.js'

// this.Pages = new Meteor.Pagination(Issues, {homeRoute: "/pages_issues/"});


Template.Page_Template.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set("pagesRequested", 1);
});

const issuesPerPage = 5;
var pagesRequested = 1;

function currentUserIsAdmin() {
  var user = Meteor.user();
    if(user != null){
      return user.username === "admin";
    }
  return false;
}

Template.Page_Template.helpers({
  alltags() {
    var tags;
    Tags.find({}, {_id:0, tags:1}).forEach(function(doc){
      tags = doc.tags;
    });
    if (currentUserIsAdmin() === true) {
      tags.push("public")
    }
    return tags;
  },
  currentUserIsAdmin() {
    var user = Meteor.user();
    if(user != null){
      return user.username === "admin";
    }
    return false;
  },
  posts() {
    //Get the names of all tags that are checked
    //var checkedTags = get_selected_tag_filters(Template.instance);
    const instance = Template.instance();
    var checkedTags = [];
    if (currentUserIsAdmin() !== true) {
      checkedTags.push("public")
    }
    var keysObj = instance.state.all();
    Object.keys(keysObj).forEach(function(key){
      if (key != "pagesRequested" && keysObj[key]){
        checkedTags.push(key);
      }
    });

    
    //Display issues which have all checked tags
    var query = {};
    var settings = { sort: { last_interaction_time: -1 }, limit: issuesPerPage * instance.state.get('pagesRequested')};
    if (checkedTags.length !== 0) {
      query.tags = {$all: checkedTags};
    }
    return Issues.find(query, settings);  
  },
  selected_tag_filters(){
    const instance = Template.instance();
    var checkedTags = [];
    var keysObj = instance.state.all();
    Object.keys(keysObj).forEach(function(key){
      if (key != "pagesRequested" && keysObj[key]){
        checkedTags.push(key);
      }
    });
    return checkedTags;
  },
  uncached() {
    var query = {isCached: false}
    var settings = { sort: { last_interaction_time: -1 }};
    return Issues.find(query, settings);  
  },
  openIssuesCount() {
    return Issues.find({ tags: "open" }).count();
  }
});

Template.Page_Template.events({
  'submit .add-new-tag'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;
    const instance = Template.instance();
 
    // Insert a task into the collection
    Tags.update(
      {_id:"alltags"},
      {$addToSet: {tags: text} }
    );
    //make layout redisplay
    instance.state.set(text, false);
    // Clear form
    target.text.value = '';
  },
  //Handle event of tag boxes being checked
  'change .checkBoxClass input'(event, instance) {
    var tag = event.target.name;
    instance.state.set("pagesRequested", 1);
    instance.state.set(tag, event.target.checked);
  },

  'click #addNewFilterTag'(event, instance) {
    instance.state.set(event.target.name, true);
  },

  'click #deleteFilterTag'(event, instance) {
    instance.state.set(event.target.name, false);
  },

  'click #requestPages'(event, instance) {
    instance.state.set("pagesRequested", instance.state.get("pagesRequested") + 1)
  }
});