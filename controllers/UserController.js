
var mongoose = require('mongoose'),

UserModel = require('../models/User');

//will fetch all current users
exports.getUsers = (req, res) => {
  UserModel.find({}, (err, UserModel) => {
    if (err)
      res.send(err);
    res.json(UserModel);
  });
};


//addition in user collection
exports.addUser = (req, res) => {
  var new_car = new UserModel(req.body);
  new_car.save((err, UserModel)=> {
    if (err)
      res.send(err);
    res.json(UserModel);
  });
};

//updating user information based on given user id
exports.updateUserInfo = (req, res) => {
  var id = mongoose.Types.ObjectId(req.params.Carid);
  UserModel.findOneAndUpdate({_id: id}, req.body, {new: true}, (err, UserModel) => {
    if (err)
      res.send(err);
    res.json(UserModel);
  });
};


//deleting user information
exports.deleteUser = (req, res)=> {
  var id = mongoose.Types.ObjectId(req.params.Carid);
  UserModel.remove({
    _id: id
  }, (err, UserModel) => {
    if (err)
      res.send(err);
    res.json({message : 'User details successfully deleted'});
  });
};