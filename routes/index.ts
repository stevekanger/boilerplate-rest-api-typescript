import { Application } from 'express'
import home from './home'
import auth from './auth'
import protectedRoute from './protectedRoute'

const routes = (app: Application) => {
  app.use('/', home)
  app.use('/auth', auth)
  app.use('/protected', protectedRoute)
}

export default routes
