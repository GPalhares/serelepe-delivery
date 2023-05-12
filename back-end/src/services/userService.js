const { User } = require('../database/models');

const getUserId = async (data) => {
    const { userEmail } = data;
    const getUser = await User.findOne({ where: { email: userEmail } });
    return getUser;
};
module.exports = { getUserId };
