Meteor.startup(function () {
  FastClick.attach(document.body);
});


Template.table.helpers({

  // Return Cursor of Peoples Collection
  people: function(){
    return People.find({}, {sort: {voteCount: -1}});
  },

  // Get the number of people in our People's Collection
  numberOfPeople: function () {
    // ...
    return People.find({}).count();
  },

  // Get the voteCount for each user
  voteCount: function() {
    return this.voteCount || 0;
  },

  // Get the last time some voted for this user
  lastVoted: function(){
    if (this.lastvote)
      return moment(this.lastvote).fromNow();
    return 'never';
  },

  // Disable the vote button if the user already vote this person

  disabled: function(){
    return _.contains(this.voters, Meteor.user()._id) ? "disabled" : '';
  },

  // returns css class 'selected ' if matches

  selected: function(){
    return Session.equals('selected', this._id) ? "selected" : '';
  }



});


Template.table.events({
  'click button': function () {
    // console.log(this);
    Meteor.call('vote', this._id );
  },

  'click tbody tr': function() {
    Session.set('selected', this._id);
    console.log(this._id);
  }
});