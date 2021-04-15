const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller')


// Users routes
router.post('/users', usersController.create)
router.get('/users', usersController.list)
router.get('/users/:id', usersController.get)
// router.delete('/users/:id', usersController.delete)
// router.put('/users/:id', usersController.update)

router.post('/login', usersController.authenticate)

module.exports = router;