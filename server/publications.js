Meteor.publish('somePosts', function () {
  return Posts.find();
});

Meteor.publish('comments', function(postID) {  
  return Comments.find({postID:postID});
}); 