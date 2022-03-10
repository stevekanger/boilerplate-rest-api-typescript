import express, { Request, Response } from 'express'
import checkAuth from './middleware/checkAuth'

const router = express.Router()

router.get('/', checkAuth, (req: Request, res: Response) => {
  res.status(200).json({
    msg: `You have access to this protected route`,
  })
})

export default router
