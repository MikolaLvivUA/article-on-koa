const { UserModel } = require('../../database');

module.exports = {
  createTokenPair: async (tokenObject, userUuid) => {
    await UserModel.findOneAndUpdate({ uuid: userUuid },
      {
        $push: {
          authTokens: tokenObject
        }
      });
  },

  findUserByToken: async (findObject) => {
    const user = await UserModel.findOne({ 'authTokens': { $elemMatch: { 'accessToken': findObject } } });

    return user;
  },

  deleteTokenPairByAccessToken: async (findObject) => {
    await UserModel.findOneAndUpdate({ 'authTokens': { $pull: { 'accessToken': findObject } } });
  },

  updateTokenPairByRefreshToken: async (findObject, updateObject) => {
    // eslint-disable-next-line max-len
    const newTokenPair = await UserModel.findOneAndUpdate({ 'authTokens': { $elemMatch: { 'refreshToken': findObject } } }, { $set: { updateObject } }, { new: true });

    return newTokenPair;
  }
};
