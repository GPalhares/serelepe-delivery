const md5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../database/models');

const userRegister = async (data, role = 'costumer') => {
  const { name, email, password } = data;
console.log(data);
  const user = await User.findOne({ where: { 
    [Op.or]: [
      { email },
      { name },
    ],
  } });

  if (user) throw new Error('User already exist');
  
  const encryptedPassword = md5(password);
  await User.create({
    name,
    email,
    password: encryptedPassword,
    role,
  });

  return { name, email, role };
};

module.exports = {
  userRegister,
};
