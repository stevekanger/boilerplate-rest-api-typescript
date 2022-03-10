import express from 'express'
import checkAuth from './middleware/checkAuth'
import protectedController from '../controllers/protected/protectedController'

const router = express.Router()

router.get('/', checkAuth, protectedController)

export default router
