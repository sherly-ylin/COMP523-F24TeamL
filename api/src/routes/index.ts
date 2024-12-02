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
import {
  adminBoard,
  allAccess,
  userBoard,
} from '../controllers/userController.js'

// import * as authJwt from '../middlewares/authJwt.js'
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
// Add record
router.post('/person_level', personLevelController.addRecord)
// router.post('/person_level/csv/:id', personLevelController.uploadCSVFile)
// Update record
router.patch('/person_level/:id', personLevelController.updateRecord)
// Delete record
router.delete('/person_level/:id', personLevelController.deleteRecord)
router.delete('/person_level', personLevelController.deleteAllRecords)

/* Closed Routes */
router.get('/closed', closedController.getAllRecords)
router.get('/closed/:id', closedController.getRecord)
router.post('/closed', closedController.addRecord)
router.patch('/closed/:id', closedController.updateRecord)
router.delete('/closed/:id', closedController.deleteRecord)
router.delete('/closed', closedController.deleteAllRecords)

/* Staffing Routes */
router.get('/staffing', staffingController.getAllRecords)
router.get('/staffing/:id', staffingController.getMyRecords)
router.post('/staffing', staffingController.addRecord)
router.patch('/staffing/:id', staffingController.updateRecord)
router.delete('/staffing/:id', staffingController.deleteRecord)
router.delete('/staffing', staffingController.deleteAllRecords)

/* JobDev Routes */
router.get('/jobdev', jobDevController.getAllRecords)
router.get('/jobdev/:id', jobDevController.getRecord)
router.post('/jobdev', jobDevController.addRecord)
router.patch('/jobdev/:id', jobDevController.updateRecord)
router.delete('/jobdev/:id', jobDevController.deleteRecord)
router.delete('/jobdev', jobDevController.deleteAllRecords)

/* IPSLog Routes */
router.get('/ipslog', IPSLogController.getAllRecords)
router.get('/ipslog/:id', IPSLogController.getRecord)
router.post('/ipslog', IPSLogController.addRecord)
router.patch('/ipslog/:id', IPSLogController.updateRecord)
router.delete('/ipslog/:id', IPSLogController.deleteRecord)
router.delete('/ipslog', IPSLogController.deleteAllRecords)

router.get('/alllog', allLogsController.getAllRecordsFromAllServices)

// auth routes
router.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  )
  next()
})

router.get(
  '/api/auth/invite/:token',
  authController.getInvite,
)

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
router.use('/api/test', verifyMiddleware)
router.get('/api/test/all', allAccess)
// router.get('/api/test/user', [authJwt.verifyToken], userBoard)
// router.get(
//   '/api/test/admin',
//   [authJwt.verifyToken, authJwt.isAdmin],
//   adminBoard,
// )

// verify email routes
router.use('/verify', verifyMiddleware)
router.get('/verify/:uniqueString', getUniqueString)

// misc
router.use('/userInfo', getUserInfo)
router.use('/user-setting', setUserInfo)
router.use('/current-user', getCurrentUser)

export default router
