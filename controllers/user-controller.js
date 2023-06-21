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

exports.getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

exports.login = async (req, res) => {
  const { usernameEmail, password } = req.body;

  try {
    const jwt = await userService.login({ usernameEmail, password });
    res.status(202).send(jwt);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

exports.createUser = async (req, res) => {
  const { username, email, password, passwordAgain } = req.body;

  try {
    await userService.createUser({ username, email, password, passwordAgain });
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateUser = async (req, res) => {
  const { username, email } = req.body;

  try {
    await userService.updateUser(req.userId, { username, email });
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updatePassword = async (req, res) => {
  const { passwordOld, password, passwordAgain } = req.body;

  try {
    await userService.updatePassword(req.userId, { passwordOld, password, passwordAgain });
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await userService.deleteUser(id);
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
