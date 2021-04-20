const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller')
const professionalsController = require('../controllers/professionals.controller')
const eldersController = require('../controllers/elders.controller')
const authMiddleware = require('../middlewares/auth.middleware')

//RELATIVES SECTION
//user user
router.post('/users', authMiddleware.isAuthenticated, usersController.create)
router.get('/users/me', authMiddleware.isAuthenticated, usersController.get)
router.get('/users', authMiddleware.isAuthenticated, usersController.list)


// Auth routes
router.post('/login', usersController.authenticate)


// router.delete('/users/:id', usersController.delete)
// router.put('/users/:id', usersController.update)
//ELDERS SECTION
router.get('/elders', authMiddleware.isAuthenticated, eldersController.list)

//PROFESSIONALS SECTION

router.post('/professionals', authMiddleware.isAuthenticated, professionalsController.create)
router.get('/professionals', authMiddleware.isAuthenticated, professionalsController.list) 
router.get('/professionals/me', authMiddleware.isAuthenticated, professionalsController.get)

// Auth routes
router.post('/loginProfessionals', professionalsController.authenticate)

module.exports = router;