import express from 'express'
import * as authController from '../controllers/authController.js'
import * as verifySignUp from '../middlewares/verifySignUp.js'

/* Controllers */
import * as IPSLogController from '../controllers/IPSLogController.js'
import * as allLogsController from '../controllers/allRecordsController.js'
import * as closedController from '../controllers/closedController.js'
import * as jobDevController from '../controllers/jobDevController.js'
import * as personLevelController from '../controllers/personLevelController.js'
import * as staffingController from '../controllers/staffingController.js'
import {TeamController} from '../controllers/teamController.js'
import {
  adminBoard,
  allAccess,
  userBoard,
  getUserProfile,
  updateProfile
} from '../controllers/userController.js'

import {verifyToken, isAdmin} from '../middlewares/authJwt.js'
import { getCurrentUser } from './getCurrentUserRoutes.js'
import { getUserInfo } from './getUserInfoRoutes.js'
import { setUserInfo } from './setUserInfoRoutes.js'
import { getUniqueString, verifyMiddleware } from './verifyEmailRoutes.js'

const router = express.Router()

/* Home Page */
router.get('/', (req, res) => {
  res.send('Hello World!')
})

/* Person Level Routes */
router.get('/person_level', verifyToken, personLevelController.getAllRecords)
// Get record
router.get('/person_level/:id', verifyToken, personLevelController.getRecord)
router.get(
  '/person_level/admin/:admin_id', isAdmin, 
  personLevelController.getRecordByAdmin_ID,
)
router.get(
  '/person_level/team/:team_id',
  personLevelController.getRecordByTeam_ID,
)
// Add record
router.post('/person_level', verifyToken, personLevelController.addRecord)
// router.post('/person_level/csv/:id', personLevelController.uploadCSVFile)
// Update record
router.patch('/person_level/:id', verifyToken, personLevelController.updateRecord)
// Delete record
router.delete('/person_level/:id', verifyToken,  personLevelController.deleteRecord)
router.delete('/person_level', [verifyToken, isAdmin],  personLevelController.deleteAllRecords)

// All reviews
router.get('/review/counts', allLogsController.getRecordsCounts)
router.get('/reviews/pending', allLogsController.getPendingRecordsCounts)

/* Closed Routes */
router.get('/closed', verifyToken, closedController.getAllRecords)
router.get('/closed/:id', verifyToken, closedController.getRecord)
router.get('/closed/admin/:admin_id', isAdmin, closedController.getRecordByAdmin_ID)
router.get('/closed/team/:team_id', closedController.getRecordByTeam_ID)
router.post('/closed', verifyToken, closedController.addRecord)
router.patch('/closed/:id', verifyToken, closedController.updateRecord)
router.delete('/closed/:id', verifyToken, closedController.deleteRecord)
router.delete('/closed', [verifyToken, isAdmin], closedController.deleteAllRecords)

/* Staffing Routes */
router.get('/staffing', verifyToken, staffingController.getAllRecords)
router.get('/staffing/:id', verifyToken, staffingController.getMyRecords)
router.get('/staffing/admin/:admin_id', isAdmin, staffingController.getRecordByAdmin_ID)
router.get('/staffing/team/:team_id', staffingController.getRecordByTeam_ID)
router.post('/staffing', verifyToken, staffingController.addRecord)
router.patch('/staffing/:id', verifyToken, staffingController.updateRecord)
router.delete('/staffing/:id', verifyToken, staffingController.deleteRecord)
router.delete('/staffing', [verifyToken, isAdmin], staffingController.deleteAllRecords)

/* JobDev Routes */
router.get('/jobdev', verifyToken, jobDevController.getAllRecords)
router.get('/jobdev/:id', verifyToken, jobDevController.getRecord)
router.get('/jobdev/admin/:admin_id', isAdmin, jobDevController.getRecordByAdmin_ID)
router.get('/jobdev/team/:team_id', jobDevController.getRecordByTeam_ID)
router.post('/jobdev', verifyToken, jobDevController.addRecord)
router.patch('/jobdev/:id', verifyToken, jobDevController.updateRecord)
router.delete('/jobdev/:id', verifyToken, jobDevController.deleteRecord)
router.delete('/jobdev', [verifyToken, isAdmin], jobDevController.deleteAllRecords)

/* IPSLog Routes */
router.get('/ipslog', verifyToken, IPSLogController.getAllRecords)
router.get('/ipslog/:id', verifyToken, IPSLogController.getRecord)
router.get('/ipslog/admin/:admin_id', isAdmin, IPSLogController.getRecordByAdmin_ID)
router.get('/ipslog/team/:team_id', IPSLogController.getRecordByTeam_ID)
router.post('/ipslog', verifyToken, IPSLogController.addRecord)
router.patch('/ipslog/:id', verifyToken, IPSLogController.updateRecord)
router.delete('/ipslog/:id', verifyToken, IPSLogController.deleteRecord)
router.delete('/ipslog', [verifyToken, isAdmin], IPSLogController.deleteAllRecords)

router.get('/alllog', allLogsController.getAllRecordsFromAllServices)

// team routes
const teamController = new TeamController()

router.post('/team', teamController.createTeam)
router.put('/team/:id', teamController.updateTeam)
router.get('/team/:id', teamController.getTeam)
router.delete('/team/:id', teamController.deleteTeam)

// auth routes
router.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  )
  next()
})

router.get('/api/auth/invite/:token', authController.getInvite)

router.post(
  '/api/auth/signup',
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  authController.signUp,
)

router.post('/api/auth/signin', authController.signIn)
router.post(
  '/api/auth/sendVerificationCode',
  [verifySignUp.transformUsernameToEmail],
  authController.sendVerificationCode,
)
router.post(
  '/api/auth/verifyEmail',
  [verifySignUp.transformUsernameToEmail],
  authController.verifyEmail,
)

router.post(
  '/api/auth/invite',
  [verifySignUp.checkDuplicateUsernameOrEmail],
  authController.invite,
)

// user routes
router.use('/api/test', verifyMiddleware)
router.get('/api/test/all', allAccess)
router.get('/api/test/user', [authJwt.verifyToken], userBoard)
router.get(
  '/api/test/admin',
  [authJwt.verifyToken, authJwt.isAdmin],
  adminBoard,
)

// Profile
router.get('/user/profile', getUserProfile)
router.patch('/user/profile',  updateProfile)

// verify email routes
router.use('/verify', verifyMiddleware)
router.get('/verify/:uniqueString', getUniqueString)

// misc
router.use('/userInfo', getUserInfo)
router.use('/user-setting', setUserInfo)
router.use('/current-user', getCurrentUser)

export default router
