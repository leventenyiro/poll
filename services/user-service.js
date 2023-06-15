const bcrypt = require('bcrypt');
const db = require('../models');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const { Op } = require('sequelize');

exports.login = async (userData) => {
    const { usernameEmail, password } = userData;

    try {
        const user = await db.User.findOne({
          where: {
            [Op.or]: [{ username: usernameEmail }, { email: usernameEmail }],
          },
        });
    
        if (!user) {
          return null;
        }
    
        // const isPasswordValid = await user.comparePassword(password);
    
        // if (!isPasswordValid) {
        //   return null;
        // }
    
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log(token);
    
        return token;
      } catch (error) {
        throw new Error('Unable to login');
      }
};

exports.createUser = async (userData) => {
    const { username, email, password, passwordAgain } = userData;

    if (password !== passwordAgain) {
        throw new Error('Passwords do not match!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

    const newUser = await db.User.create({
        id: id,
        username,
        email,
        password: hashedPassword,
    });

    return newUser;
};

exports.updateUser = async (id, userData) => {
    try {
        const user = await db.User.findByPk();

        if (!user) {
            throw new Error('User not found!');
        }

        user.username = userData.username || user.username;
        user.email = userData.email || user.email;

        await user.save();

        return user;
    } catch (error) {
        throw new Error('Failed to update user!');
    }
};
