
import './ShowIssue.html'


Template.ShowIssue.onCreated(function listsShowPageOnCreated() {
  this.getListId = () => FlowRouter.getParam('_id');

  // this.autorun(() => {
  //   this.subscribe('todos.inList', { listId: this.getListId() });
  // });
});

Template.ShowIssue.helpers({
  // We use #each on an array of one item so that the "list" template is
  // removed and a new copy is added when changing lists, which is
  // important for animation purposes.
  listIdArray() {
    const instance = Template.instance();
    const listId = instance.getListId();
    return listId
  },
  // listArgs(listId) {
  //   const instance = Template.instance();
  //   // By finding the list with only the `_id` field set, we don't create a dependency on the
  //   // `list.incompleteCount`, and avoid re-rendering the todos when it changes
  //   const list = Lists.findOne(listId, { fields: { _id: true } });
  //   const todos = list && list.todos();
  //   return {
  //     todosReady: instance.subscriptionsReady(),
  //     // We pass `list` (which contains the full list, with all fields, as a function
  //     // because we want to control reactivity. When you check a todo item, the
  //     // `list.incompleteCount` changes. If we didn't do this the entire list would
  //     // re-render whenever you checked an item. By isolating the reactiviy on the list
  //     // to the area that cares about it, we stop it from happening.
  //     list() {
  //       return Lists.findOne(listId);
  //     },
  //     todos,
  //   };
  // },
});