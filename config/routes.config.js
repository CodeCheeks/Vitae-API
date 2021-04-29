const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller')
const professionalsController = require('../controllers/professionals.controller')
const candidateController = require('../controllers/candidate.controller')
const eldersController = require('../controllers/elders.controller')
const reportsController = require('../controllers/reports.controller')
const activitiesController = require('../controllers/activity.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const upload = require("./storage.config");

//--USERS SECTION--
router.post('/users', authMiddleware.isAuthenticated, usersController.create)
router.get('/users/me', authMiddleware.isAuthenticated, usersController.get)
router.get('/users', authMiddleware.isAuthenticated, usersController.list)
// router.put('/users/:id', usersController.update)
// Auth 
router.post('/login', usersController.authenticate)


//--ELDERS SECTION--
router.get('/elders', authMiddleware.isAuthenticated, eldersController.list)
router.post('/addElder', authMiddleware.isAuthenticated, eldersController.addElder)
router.put('/editElder' , authMiddleware.isAuthenticated, eldersController.editElder)
router.delete('/deleteElder' , authMiddleware.isAuthenticated, eldersController.deleteElder)

//--PROFESSIONALS SECTION--

router.post('/professionals', authMiddleware.isAuthenticated, professionalsController.create)
router.get('/professionals', authMiddleware.isAuthenticated, professionalsController.list) 
router.get('/professionals/me', authMiddleware.isAuthenticated, professionalsController.get)
router.put('/editProfessional', authMiddleware.isAuthenticated, professionalsController.edit)
router.delete('/deleteProfessional', authMiddleware.isAuthenticated, professionalsController.delete)
// Auth 
router.post('/loginProfessionals', professionalsController.authenticate)


//--CANDIDATES SECTION--
router.post('/employ', upload.single("cv"), candidateController.addCandidate)
router.get('/employ', authMiddleware.isAuthenticated, candidateController.listCandidates)
router.delete('/deleteCandidate', authMiddleware.isAuthenticated, candidateController.delete)


//--REPORTS SECTION--
router.post('/reports',authMiddleware.isAuthenticated, reportsController.addReport )
router.get('/reports',authMiddleware.isAuthenticated, reportsController.listReports )
router.get('/reports/:id',authMiddleware.isAuthenticated, reportsController.getReport)
router.put('/editReport/:id',authMiddleware.isAuthenticated, reportsController.editReport )
router.delete('/deleteReport',authMiddleware.isAuthenticated, reportsController.deleteReport )

//--ACTIVITIES SECTION--

router.post('/activities',authMiddleware.isAuthenticated, activitiesController.addActivity )
router.delete('/activity/:id',authMiddleware.isAuthenticated, activitiesController.deleteActivity )
router.get('/activities',authMiddleware.isAuthenticated, activitiesController.listActivities )
router.get('/allActivities',authMiddleware.isAuthenticated, activitiesController.listAllActivities )
router.post('/participants',authMiddleware.isAuthenticated, activitiesController.addParticipants )
router.delete('/participants',authMiddleware.isAuthenticated, activitiesController.deleteParticipants )




//--MESSAGES SECTION--


module.exports = router;