import express from 'express'
import verifyAccessToken from '../middleware/verifyAccessToken'
import apiController from '../controllers/api/apiController'

const router = express.Router()

router.get('/', verifyAccessToken, apiController)

export default router
