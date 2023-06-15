const bcrypt = require('bcrypt');
const db = require('../models');
const { v4: uuidv4 } = require('uuid');

exports.createUser = async (userData) => {
  const { name, email, password, passwordAgain } = userData;

  if (password !== passwordAgain) {
    throw new Error('Passwords do not match!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const id = uuidv4();

  const newUser = await db.User.create({
    id: id,
    name,
    email,
    password: hashedPassword,
  });

  return newUser;
};
