'use strict';

var Estate = require('../model/appEstateModel');

exports.list_all_Estates = function(req, res) {
    Estate.getAllEstate(function(err, User) {
      console.log('controller')
      if (err)
        res.send(err);
        console.log('res', Estate);
      res.send(User);
    });
  };



exports.create_a_Estate = function(req, res) {
  var new_Estate = new Estate(req.body);
  Estate.createEstate(new_Estate, function(err, Estate) {
    if (err)
    res.send(err);
    res.json(Estate);

})
};


exports.read_a_Estate = function(req, res) {
  Estate.getEstateById(req.params.owner, function(err, Estate) {
    if (err)
      res.send(err);
    res.json(Estate);
  });
};
exports.update_a_Estate = function(req, res) {
  Estate.updateById(new Estate(req.body), function(err, Estate) {
    if (err)
      res.send(err);
    res.json(Estate);
  });
};
exports.delete_a_Estate = function(req, res) {


  Estate.remove( req.params.name, function(err, Estate) {
    if (err)
      res.send(err);
    res.json({ message: 'Estate successfully deleted' });
  });
};