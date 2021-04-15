const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller')
const authMiddleware = require('../middlewares/auth.middleware')


//user user
router.post('/users', authMiddleware.isAuthenticated, usersController.create)
router.get('/users/me', authMiddleware.isAuthenticated, usersController.get)
router.get('/users', authMiddleware.isAuthenticated, usersController.list)


// Auth routes
router.post('/login', usersController.authenticate)


// router.delete('/users/:id', usersController.delete)
// router.put('/users/:id', usersController.update)


module.exports = router;