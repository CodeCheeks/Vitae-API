const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller')
const professionalsController = require('../controllers/professionals.controller')
const candidateController = require('../controllers/candidate.controller')
const eldersController = require('../controllers/elders.controller')
const reportsController = require('../controllers/reports.controller')
const activitiesController = require('../controllers/activity.controller')
const authController = require('../controllers/auth.controller')
const messagesController = require('../controllers/message.controller')
const picturesController = require('../controllers/pictures.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const upload = require("./storage.config");
const uploadImg = require("./storageImage.config");

//--USERS SECTION--
router.post('/users', authMiddleware.isAuthenticated, usersController.create)
router.get('/users/me', authMiddleware.isAuthenticated, usersController.get)
router.get('/users', authMiddleware.isAuthenticated, usersController.list)

//Auth 
router.post('/login', usersController.authenticate)
//Activate account
router.post('/getToken/:token', authController.getToken)
router.post('/activate/:token', authController.activate)
//Recover pass
router.post('/recoverPass/:token', authController.doRecoverPassEmail)
router.post('/recoverPass', authController.recoverPassEmail)




//--ELDERS SECTION--
router.get('/elders/:id', authMiddleware.isAuthenticated, eldersController.getElder)
router.get('/elders', authMiddleware.isAuthenticated, eldersController.list)
router.get('/elders/:id', authMiddleware.isAuthenticated, eldersController.getElder)
router.get('/eldersByName/:name', authMiddleware.isAuthenticated, eldersController.getElderByName)
router.post('/addElder', authMiddleware.isAuthenticated, eldersController.addElder)
router.put('/editElder/:id' , authMiddleware.isAuthenticated, eldersController.editElder)
router.delete('/deleteElder' , authMiddleware.isAuthenticated, eldersController.deleteElder)


//--PROFESSIONALS SECTION--

router.post('/professionals', authMiddleware.isAuthenticated, professionalsController.create)
router.get('/professionals', authMiddleware.isAuthenticated, professionalsController.list) 
router.get('/professionals/me', authMiddleware.isAuthenticated, professionalsController.get)
router.get('/professionals/:id', authMiddleware.isAuthenticated, professionalsController.listOne)

router.put('/editProfessional/:id', authMiddleware.isAuthenticated, professionalsController.edit)
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
router.get('/activity/:id',authMiddleware.isAuthenticated, activitiesController.getActivity )
router.get('/activities-sector/:sector',authMiddleware.isAuthenticated, activitiesController.getActivitySector )
router.get('/activities/:id',authMiddleware.isAuthenticated, activitiesController.listActivities )
router.get('/allActivities',authMiddleware.isAuthenticated, activitiesController.listAllActivities )
router.put('/activity/:id',authMiddleware.isAuthenticated, activitiesController.editActivity )
router.post('/participants',authMiddleware.isAuthenticated, activitiesController.addParticipants )
router.delete('/participants/:id',authMiddleware.isAuthenticated, activitiesController.deleteParticipants )


// -- PICTURES SECTION --
router.put('/elderImages/:id' , uploadImg.single("picture"), authMiddleware.isAuthenticated, eldersController.uploadElderImage)
router.get('/pictures/:id',authMiddleware.isAuthenticated, picturesController.getPictures )


//--MESSAGES SECTION--
router.post('/messages/:receptor_id',authMiddleware.isAuthenticated, messagesController.addMessage )
//Professionals messages list
router.get('/receivedMessages/:id',authMiddleware.isAuthenticated, messagesController.listReceivedMessages )
router.get('/sentMessages/:id',authMiddleware.isAuthenticated, messagesController.listSentMessages )
//Users messages list
router.get('/userReceivedMessages/:id',authMiddleware.isAuthenticated, messagesController.userListReceivedMessages )
router.get('/userSentMessages/:id',authMiddleware.isAuthenticated, messagesController.userListSentMessages )

router.delete('/messages/:id',authMiddleware.isAuthenticated, messagesController.deleteMessage )


module.exports = router;