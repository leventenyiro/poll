const express = require('express');
const userController = require('../controllers/user-controller');
const auth = require('../middleware/auth');
const router = express.Router();

// router.get('/', userController.getAllUsers);
// router.get('/:id', userController.getUserById);
router.get('/', auth.jwtMiddleware, userController.getUser);
router.post('/', userController.createUser);
router.put('/', auth.jwtMiddleware, userController.updateUser);
router.post('/login', userController.login);
router.put('/password', auth.jwtMiddleware, userController.updatePassword);
router.delete('/', auth.jwtMiddleware, userController.deleteUser);

module.exports = router;
