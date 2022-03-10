import express from 'express'
import loginController from '../controllers/auth/loginController'
import registerController from '../controllers/auth/registerController'
import verificationController from '../controllers/auth/verificationController'
import refreshTokensController from '../controllers/auth/refreshTokensController'
import requestNewPassController from '../controllers/auth/requestNewPassController'
import setNewPassController from '../controllers/auth/setNewPassController'

const router = express.Router()

router.post('/login', loginController)
router.post('/register', registerController)
router.post('/verify', verificationController)
router.post('/refresh-tokens', refreshTokensController)
router.post('/request-new-pass', requestNewPassController)
router.post('/set-new-pass', setNewPassController)

export default router
