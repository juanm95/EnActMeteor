import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import '../api/issues.js';


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

Template.Page_Template.helpers({
  alltags: [
    'open', 'closed', 
    'coal mining', 'ration', 'food', 'forest', 'land',
    'teacher', 'school',
    'handpump', 'water', 'nrega', 'electricity',
    'Hindi', 'Gondi', 
    'Madhya Pradesh', 'Chhattisgarh',
    'featured'
  ],
  addissues() {
    console.log("add")
    //console.log(issues)
  },
  currentUserIsAdmin() {
    var user = Meteor.user()
    if(user != null){
      return user.username === "admin"
    }
    return false
  },
  posts() {
    const instance = Template.instance();

    //Mark tags which are checked
    var checkedTags = []
    if (instance.state.get('showOpen')) {checkedTags.push("open")}
    if (instance.state.get('showClosed')) {checkedTags.push("closed")}
    if (instance.state.get('showCoalMining')) {checkedTags.push("coalmining")}
    if (instance.state.get('showRation')) {checkedTags.tags += "ration"}
    if (instance.state.get('showFood')) {checkedTags.tags += "food"}
    if (instance.state.get('showForest')) {checkedTags.tags += "forest"}
    if (instance.state.get('showLand')) {checkedTags.tags += "land"}
    if (instance.state.get('showTeacher')) {checkedTags.tags += "teacher"}
    if (instance.state.get('showSchool')) {checkedTags.tags += "school"}
    if (instance.state.get('showHandpump')) {checkedTags.tags += "handpump"}
    if (instance.state.get('showWater')) {checkedTags.tags += "water"}
    if (instance.state.get('showNrega')) {checkedTags.tags += "nrega"}
    if (instance.state.get('showElectricity')) {checkedTags.tags += "electricity"}
    if (instance.state.get('showHindi')) {checkedTags.tags += "hindi"}
    if (instance.state.get('showGondi')) {checkedTags.tags += "gondi"}
    if (instance.state.get('showMadhyaPradesh')) {checkedTags.tags += "madhyapradesh"}
    if (instance.state.get('showChhattisgarh')) {checkedTags.tags += "chatisghar"}
    if (instance.state.get('showFeatured')) {checkedTags.tags += "featured"}
    
    console.log(checkedTags)
    //Display issues which have all checked tags
    var query = {}
    var settings = { sort: { last_interaction_time: -1 }, limit: issuesPerPage * instance.state.get('pagesRequested')};
    if (checkedTags.length !== 0) {
      query.tags = {$all: checkedTags};
    }
    return Issues.find(query, settings);  
  },
  openIssuesCount() {
    return Issues.find({ tags: "open" }).count();
  }
});

Template.Page_Template.events({
  //Handle event of tag boxes being checked
  'change .checkBoxClass input'(event, instance) {
    var tag = event.target.name

    //Capitalize each word and take out spaces
    var formattedTag = tag.replace(/\w+/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1);
    }).replace(/\s/g, '');

    var showTaggedIssues = "show" + formattedTag
    console.log(showTaggedIssues)

    //Instance state for showing each tag corresponds to value of checkbox
    instance.state.set(showTaggedIssues, event.target.checked)
  },

  'click #requestPages'(event, instance) {
    console.log("content requested");
    instance.state.set("pagesRequested", instance.state.get("pagesRequested") + 1)
  }
});