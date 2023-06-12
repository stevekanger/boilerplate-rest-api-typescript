require('dotenv').config()

import express from 'express'
import { connect } from 'mongoose'
import routes from './routes'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import config from './config'

const app = express()

connect(`${process.env.MONGO_URI}`)
  .then(() => {
    console.log('Successfully connected To Database')
  })
  .catch((error) => {
    console.log('Error Connecting To DataBase', error)
  })

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: config.clientDomain,
  })
)
routes(app)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`)
})
