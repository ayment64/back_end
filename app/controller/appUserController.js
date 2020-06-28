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
exports.create_a_Bid = function(req, res) {

  User.createBid(req.body.Username,req.body.image_url,req.body.the_bid,req.body.house_name, function(err, User) {
    if (err)
    res.send(err);
    res.json(User);

})
};


exports.list_all_Bidding = function(req, res) {
  User.getAllBiding(req.params.house_name, function(err, User) {
    if (err)
      res.send(err);
    res.json(User);
  });
};
exports.list_all_pics = function(req, res) {
  User.getAllpics(req.params.house_name, function(err, User) {
    if (err)
      res.send(err);
    res.json(User);
  });
};

exports.read_a_User = function(req, res) {
  User.getUserById(req.params.Username,req.params.Password, function(err, User) {
    if (err)
      res.send(err);
    res.json(User);
  });
};

exports.read_A_User = function(req, res) {
  User.getUserByEmail(req.params.Email, function(err, User) {
    if (err)
      res.send(err);
    res.json(User);
  });
};


exports.update_a_User = function(req, res) {
  User.updateByUsername(new User(req.body), function(err, User) {
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