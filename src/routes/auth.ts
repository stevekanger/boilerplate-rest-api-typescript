import express from 'express'
import login from '../controllers/auth/login'
import logout from '../controllers/auth/logout'
import signup from '../controllers/auth/signup'
import verification from '../controllers/auth/verification'
import refreshTokens from '../controllers/auth/refreshTokens'
import requestNewPassword from '../controllers/auth/requestNewPassword'
import setNewPassword from '../controllers/auth/setNewPassword'

const router = express.Router()

router.post('/login', login)
router.post('/logout', logout)
router.post('/signup', signup)
router.post('/refresh', refreshTokens)
router.post('/verification', verification)
router.post('/request-new-password', requestNewPassword)
router.post('/set-new-password', setNewPassword)

export default router
