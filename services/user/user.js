const { UserModel } = require('../../database');

module.exports = {
  createUser: async (user) => {
    const newUserModel = new UserModel(user);

    const newUser = await newUserModel.save();

    return newUser;
  },

  findUserByParams: async (findObject) => {
    const user = await UserModel.findOne(findObject);

    return user;
  },

  deleteUserByParams: async (findObject) => {
    await UserModel.findOneAndDelete(findObject);
  }
};
