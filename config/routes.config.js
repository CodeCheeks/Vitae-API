const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller')
const professionalsController = require('../controllers/professionals.controller')
const candidateController = require('../controllers/candidate.controller')
const eldersController = require('../controllers/elders.controller')
const reportsController = require('../controllers/reports.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const upload = require("./storage.config");

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
router.post('/addElder', authMiddleware.isAuthenticated, eldersController.addElder)

//REPORTS
router.post('/reports',authMiddleware.isAuthenticated, reportsController.addReport )
router.get('/reports',authMiddleware.isAuthenticated, reportsController.listReports )

//PROFESSIONALS SECTION

router.post('/professionals', authMiddleware.isAuthenticated, professionalsController.create)
router.get('/professionals', authMiddleware.isAuthenticated, professionalsController.list) 
router.get('/professionals/me', authMiddleware.isAuthenticated, professionalsController.get)

router.post('/employ', upload.single("cv"), candidateController.addCandidate)
router.get('/employ', authMiddleware.isAuthenticated, candidateController.listCandidates)

// Auth routes
router.post('/loginProfessionals', professionalsController.authenticate)

module.exports = router;