import { Application } from 'express'
import auth from './auth'
import api from './api'
import notFound from './notFound'

export default function routes(app: Application) {
  app.use('/auth', auth)
  app.use('/api', api)
  app.use('*', notFound)
}
