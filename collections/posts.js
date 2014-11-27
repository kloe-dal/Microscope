Posts = new Meteor.Collection('posts');

Meteor.methods({
  post: function (postAttributes) {
    var user = Meteor.user(),
      postWithSameLink = Posts.findOne({url: postAttributes.url});

    // assurons-nous que l'utilisateur est authentifié
    if (!user)
      throw new Meteor.Error(401, "You need to login to post new stories");

    // que le post a un titre
    if (!postAttributes.title)
      throw new Meteor.Error(422, 'Please fill in a headline');

    // vérifions qu'il n'y pas d'autre post avec le même lien
    if (postAttributes.url && postWithSameLink) {
      throw new Meteor.Error(302, 'This link has already been posted', postWithSameLink._id);
    }

    // filtrons pour prendre les attributs attendus
    var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
      title: postAttributes.title + (this.isSimulation ? '(client)' : '(server)'),
      userId: user._id, 
      author: user.username, 
      submitted: new Date().getTime()
    });
    
    if (! this.isSimulation) { 
      var Future = Npm.require('fibers/future');      
      var future = new Future();      
      Meteor.setTimeout(function() {        
        future.return();      
      }, 5 * 1000);      
      future.wait();    }

    var postId = Posts.insert(post);

    return postId;
  }
});