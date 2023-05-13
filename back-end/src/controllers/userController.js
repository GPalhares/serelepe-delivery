const userService = require('../services/userService');

const getUserId = async (req, res, next) => {
  console.log(req.body, 'AAAAAAAAAAAAA');
    try {
      const userId = await userService.getUserId(req.body);
      return res.status(200).json({ userId });
    } catch (error) {
      next(error);
    }
  };
  module.exports = {
    getUserId,
  };
