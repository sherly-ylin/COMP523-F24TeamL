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
import { TeamController } from '../controllers/teamController.js'
import * as userController from '../controllers/userController.js'

import * as authJwt from '../middlewares/authJwt.js'
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
router.get('/person_level', personLevelController.getAllRecords)
// Get record
router.get('/person_level/:id', personLevelController.getRecord)
router.get(
  '/person_level/admin/:admin_id',
  personLevelController.getRecordByAdmin_ID,
)
router.get(
  '/person_level/team/:team_id',
  personLevelController.getRecordByTeam_ID,
)
// Add record
router.post('/person_level', personLevelController.addRecord)
// router.post('/person_level/csv/:id', personLevelController.uploadCSVFile)
// Update record
router.patch('/person_level/:id', personLevelController.updateRecord)
// Delete record
router.delete('/person_level/:id', personLevelController.deleteRecord)
router.delete('/person_level', personLevelController.deleteAllRecords)

// All reviews
router.get('/review/counts', allLogsController.getRecordsCounts)
router.get('/reviews/pending', allLogsController.getPendingRecordsCounts)

/* Closed Routes */
router.get('/closed', closedController.getAllRecords)
router.get('/closed/:id', closedController.getRecord)
router.get('/closed/admin/:admin_id', closedController.getRecordByAdmin_ID)
router.get('/closed/team/:team_id', closedController.getRecordByTeam_ID)
router.post('/closed', closedController.addRecord)
router.patch('/closed/:id', closedController.updateRecord)
router.delete('/closed/:id', closedController.deleteRecord)
router.delete('/closed', closedController.deleteAllRecords)

/* Staffing Routes */
router.get('/staffing', staffingController.getAllRecords)
router.get('/staffing/:id', staffingController.getMyRecords)
router.get('/staffing/admin/:admin_id', staffingController.getRecordByAdmin_ID)
router.get('/staffing/team/:team_id', staffingController.getRecordByTeam_ID)
router.post('/staffing', staffingController.addRecord)
router.patch('/staffing/:id', staffingController.updateRecord)
router.delete('/staffing/:id', staffingController.deleteRecord)
router.delete('/staffing', staffingController.deleteAllRecords)

/* JobDev Routes */
router.get('/jobdev', jobDevController.getAllRecords)
router.get('/jobdev/:id', jobDevController.getRecord)
router.get('/jobdev/admin/:admin_id', jobDevController.getRecordByAdmin_ID)
router.get('/jobdev/team/:team_id', jobDevController.getRecordByTeam_ID)
router.post('/jobdev', jobDevController.addRecord)
router.patch('/jobdev/:id', jobDevController.updateRecord)
router.delete('/jobdev/:id', jobDevController.deleteRecord)
router.delete('/jobdev', jobDevController.deleteAllRecords)

/* IPSLog Routes */
router.get('/ipslog', IPSLogController.getAllRecords)
router.get('/ipslog/:id', IPSLogController.getRecord)
router.get('/ipslog/admin/:admin_id', IPSLogController.getRecordByAdmin_ID)
router.get('/ipslog/team/:team_id', IPSLogController.getRecordByTeam_ID)
router.post('/ipslog', IPSLogController.addRecord)
router.patch('/ipslog/:id', IPSLogController.updateRecord)
router.delete('/ipslog/:id', IPSLogController.deleteRecord)
router.delete('/ipslog', IPSLogController.deleteAllRecords)

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
  '/api/auth/invite',
  [verifySignUp.checkDuplicateUsernameOrEmail],
  authController.invite,
)

// user routes
// router.use('/api/test', verifyMiddleware)
// router.get('/api/test/all', allAccess)
// router.get('/api/test/user', [authJwt.authVerifyToken], userBoard)
// router.get(
//   '/api/test/admin',
//   [authJwt.verifyToken, authJwt.isAdmin],
//   adminBoard,
// )

// User 
router.get('/user/profile', [authJwt.authVerifyToken], userController.getUserById)
router.patch('/user/profile', [authJwt.authVerifyToken],  userController.updateUser)

// verify email routes
router.use('/verify', verifyMiddleware)
router.get('/verify/:uniqueString', getUniqueString)

// misc
router.use('/userInfo', getUserInfo)
router.use('/user-setting', setUserInfo)
router.use('/current-user', getCurrentUser)

export default router
