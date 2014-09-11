People = new Meteor.Collection('people');


People.allow({
  insert: function (userId, doc) {
    //...
  },
  update: function (userId, doc, fields, modifier) {
    //...
  },
  remove: function (userId, doc) {
    //...
  },
  fetch: ['owner'],
  transform: function () {
    //...
  }
});