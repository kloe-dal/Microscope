Meteor.publish('somePosts', function () {
  return Posts.find();
});