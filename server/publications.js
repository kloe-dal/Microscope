Meteor.publish('posts', function (options) {  
  return Posts.find({}, options);
});

Meteor.publish('comments', function(postID) {  
  return Comments.find({postID:postID});
}); 

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});

Meteor.publish('singlePost', function(id) {
  return id && Posts.find(id);
});
