FlowRouter.route('/', {
  name: 'Issues.all',
  action(params, queryParams) {
    BlazeLayout.render('Page_Template', { main: 'ListOfIssues'});
  }
});

FlowRouter.route('/issue/:_id', {
  name: 'Issues.show',
  action(params, queryParams) {
    BlazeLayout.render('Page_Template', {main: 'ShowIssue'});
  }
});