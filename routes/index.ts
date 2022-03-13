import { Application } from 'express'
import auth from './auth'
import api from './api'
import notFound from './notFound'

const routes = (app: Application) => {
  app.use('/auth', auth)
  app.use('/api', api)
  app.use('*', notFound)
}

export default routes
