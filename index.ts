require('dotenv').config()

import express from 'express'
import { connect } from 'mongoose'
import routes from './routes'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

connect(`${process.env.MONGO_URI}`)
  .then(() => {
    console.log('Connected To Database')
  })
  .catch((error) => {
    console.log('Error Connecting To DataBase', error)
  })

app.use(cookieParser())
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

routes(app)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`ready at http://localhost:${PORT}`)
})
