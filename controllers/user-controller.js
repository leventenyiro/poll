const db = require('../models');
const userService = require('../services/user-service');

/*exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};*/

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.User.findOne({
      where: { id },
      attributes: ['name', 'email']
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createUser = async (req, res) => {
  const { name, email, password, passwordAgain } = req.body;

  try {
    const newUser = await userService.createUser({ name, email, password, passwordAgain });
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updatedUser = await userService.updateUser(id, { name, email });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
