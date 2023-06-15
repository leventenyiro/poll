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

exports.updateUser = async (id, userData) => {
    try {
        const user = await db.User.findByPk();

        if (!user) {
            throw new Error('User not found!');
        }

        user.name = userData.name || user.name;
        user.email = userData.email || user.email;

        await user.save();

        return user;
    } catch (error) {
        throw new Error('Failed to update user!');
    }
};
