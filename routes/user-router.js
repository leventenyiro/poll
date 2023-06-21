const express = require('express');
const userController = require('../controllers/user-controller');
const auth = require('../middleware/auth');
const router = express.Router();

// router.get('/', userController.getAllUsers);
router.get('/', auth.jwtMiddleware, userController.getUser);
router.post('/', userController.createUser);
router.put('/',auth.jwtMiddleware, userController.updateUser);
router.post('/login', userController.login);
// router.put('/:id', userController.updatePassword); // it will be without id
// router.delete('/', userController.deleteUser);

module.exports = router;
