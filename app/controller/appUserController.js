'use strict';

var User = require('../model/appUserModel');

exports.list_all_Users = function(req, res) {
  User.getAllUser(function(err, User) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', User);
    res.send(User);
  });
};



exports.create_a_User = function(req, res) {
  var new_User = new User(req.body);
  User.createUser(new_User, function(err, User) {
    if (err)
    res.send(err);
    res.json(User);

})
};


exports.read_a_User = function(req, res) {
  User.getUserById(req.params.Username,req.params.Password, function(err, User) {
    if (err)
      res.send(err);
    res.json(User);
  });
};


exports.update_a_User = function(req, res) {
  User.updateById(req.params.UserId, new User(req.body), function(err, User) {
    if (err)
      res.send(err);
    res.json(User);
  });
};


exports.delete_a_User = function(req, res) {


  User.remove( req.params.UserId, function(err, User) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};