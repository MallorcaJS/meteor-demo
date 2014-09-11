Meteor.startup(function () {
  if (People.find().count() === 0 ) {
    console.log('no one is there');

    HTTP.get('https://api.meetup.com/2/rsvps?&sign=true&photo-host=public&event_id=206162542&key=7664637d327eb3c1d7351168645137',
      function(err,res){

        var people = _.chain(res.data.results).map(function(person){return person.member.name}).value();


        _.each(people, function(name){
          People.insert({
            name: name,
            voteCount: 0,
            voters: []

          });
        })
      }
    );
  }
});



Meteor.methods({
  vote: function (id) {
    var person = People.findOne(id);

    if(_.contains(person.voters, Meteor.user()._id))
      return;

    People.update(id, {$inc: {voteCount:1}, $addToSet:{voters: Meteor.user()._id}, $set: {lastvote: new Date()}} ) ;
  }
});