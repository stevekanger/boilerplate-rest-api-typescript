import express from 'express'
import auth from '../middleware/auth'
import api from '../controllers/api/api'

const router = express.Router()

router.get('/', auth, api)

export default router
