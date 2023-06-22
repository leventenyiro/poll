const bcrypt = require('bcrypt');
const db = require('../models');
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getUser = async (id) => {
    const user = await db.User.findOne({
        where: { id },
        attributes: ['username', 'email']
    });

    return user;
};

exports.login = async (userData) => {
    const { usernameEmail, password } = userData;

    try {
        const user = await db.User.findOne({
            where: {
                [Op.or]: [{ username: usernameEmail }, { email: usernameEmail }],
            },
        });

        if (!user) {
            throw new Error('Unable to login');
        }
        
        await isPasswordValid(password, user.password);


        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '168h' });

        return token;
    } catch (error) {
        throw new Error('Unable to login');
    }
};

exports.createUser = async (userData) => {
    const { username, email, password, passwordAgain } = userData;

    const hashedPassword = await createPassword(password, passwordAgain);

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
        const user = await db.User.findByPk(id);

        if (!user) {
            throw new Error('User not found!');
        }

        user.username = userData.username || user.username;
        user.email = userData.email || user.email;

        await user.save();

        return "";
    } catch (error) {
        throw new Error('Failed to update user!');
    }
};

exports.updatePassword = async (id, userData) => {
    const { passwordOld, password, passwordAgain } = userData;

    try {
        const user = await db.User.findByPk(id);

        if (!user) {
            throw new Error('User not found!');
        }

        await isPasswordValid(passwordOld, user.password);

        const hashedPassword = await createPassword(password, passwordAgain);

        user.password = hashedPassword || user.password;

        await user.save();

        return "";
    } catch (error) {
        throw new Error('Failed to update password!');
    }
};

exports.deleteUser = async (id) => {
    try {
        const user = await db.User.findByPk(id);

        if (!user) {
            throw new Error('User not found!');
        }

        user.destroy();

        return user;
    } catch (error) {
        throw new Error('Failed to update user!');
    }
};

async function createPassword(password, passwordAgain) {
    if (password !== passwordAgain) {
        throw new Error('Passwords do not match!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

async function isPasswordValid(password, userPassword) {
    const isPasswordValid = await bcrypt.compare(password, userPassword);

    if (!isPasswordValid) {
        throw new Error('Unable to login');
    }
}
