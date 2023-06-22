const express = require('express');
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middleware/auth-middleware');
const router = express.Router();

// router.get('/', userController.getAllUsers);
// router.get('/:id', userController.getUserById);
router.get('/', authMiddleware.jwtMiddleware, userController.getUser);
router.post('/', userController.createUser);
router.put('/', authMiddleware.jwtMiddleware, userController.updateUser);
router.post('/login', userController.login);
router.put('/password', authMiddleware.jwtMiddleware, userController.updatePassword);
router.delete('/', authMiddleware.jwtMiddleware, userController.deleteUser);

module.exports = router;
