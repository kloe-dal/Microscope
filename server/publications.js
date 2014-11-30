Meteor.publish('somePosts', function () {
  return Posts.find();
});

Meteor.publish('comments', function() {  return Comments.find();});