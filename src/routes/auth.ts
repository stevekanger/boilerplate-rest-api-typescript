import express from 'express'
import loginController from '../controllers/auth/loginController'
import signupController from '../controllers/auth/signupController'
import emailVerificationController from '../controllers/auth/emailVerificationController'
import refreshTokensController from '../controllers/auth/refreshTokensController'
import requestNewPasswordController from '../controllers/auth/requestNewPasswordController'
import setNewPasswordController from '../controllers/auth/setNewPasswordController'

const router = express.Router()

router.post('/login', loginController)
router.post('/signup', signupController)
router.post('/refresh', refreshTokensController)
router.post('/email-verification', emailVerificationController)
router.post('/request-new-password', requestNewPasswordController)
router.post('/set-new-password', setNewPasswordController)

export default router
