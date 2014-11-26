Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function () {return Meteor.subscribe('somePosts'); }
});

Router.map(function () {
  this.route('postsList', {path: '/'});
  
  this.route('postPage', {
    path: '/posts/:_id',
    data: function () {return Posts.findOne(this.params._id); }
  });
  
  this.route('postSubmit', {
    path: '/submit'
  });
});

var requireLogin = function () {
    if (!Meteor.user()) {
      if (Meteor.loggingIn()) {
  this.render(this.loadingTemplate);
    } else {
       this.render('accessDenied');
    }
    } else {
  this.next();
 }
}

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only:'postSubmit'});