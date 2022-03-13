import express from 'express'
import loginController from '../controllers/auth/loginController'
import signupController from '../controllers/auth/signupController'
import verificationController from '../controllers/auth/verificationController'
import refreshTokensController from '../controllers/auth/refreshTokensController'
import passwordRequestController from '../controllers/auth/passwordRequestController'
import passwordResetController from '../controllers/auth/passwordResetController'

const router = express.Router()

router.post('/login', loginController)
router.post('/signup', signupController)
router.post('/verify', verificationController)
router.post('/tokens', refreshTokensController)
router.post('/password-request', passwordRequestController)
router.post('/password-reset', passwordResetController)

export default router
