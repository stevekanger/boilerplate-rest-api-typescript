import { Application, Request, Response } from 'express'
import auth from './auth'
import protectedRoute from './protectedRoute'

const router = (app: Application) => {
  app.use('/', (req: Request, res: Response) => {
    res.json({
      message: 'hello',
    })
  })

  app.use('/auth', auth)
  app.use('/protected', protectedRoute)
}

export default router
