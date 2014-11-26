Template.postsList.helpers({
  posts: function () {
  return Posts.find({}, {sort: {submitted: -1}});
  }
});

Meteor.startup(function () {
  Deps.autorun(function () {
    console.log('There are ' + Posts.find().count() + ' posts');
  });
});