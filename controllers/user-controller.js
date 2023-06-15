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

/*exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.User.findOne({
      where: { id },
      attributes: ['username', 'email']
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
};*/

exports.createUser = async (req, res) => {
  const { username, email, password, passwordAgain } = req.body;

  try {
    await userService.createUser({ username, email, password, passwordAgain });
    res.json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
    const updatedUser = await userService.updateUser(id, { username, email });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
