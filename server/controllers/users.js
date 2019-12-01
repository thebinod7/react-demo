const UserModel = require("../models/users");

const save = (payload) => {
  let obj = UserModel(payload);
  return obj.save();
}

const list = () => {
  return UserModel.find({});
}

const get = (userId) => {
  return UserModel.findById(userId);
}

const update = (userId, payload) => {
  return UserModel.findByIdAndUpdate(userId, { $set: payload }, {new: true});
}

module.exports = {
  save,
  list,
  get,
  update
}