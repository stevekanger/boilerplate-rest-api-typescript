import express from 'express'
import { connect } from 'mongoose'
import routes from './routes'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
require('dotenv').config()

connect(`${process.env.MONGO_URI}`)
  .then(() => {
    console.log('Connected To Database')
  })
  .catch((err) => {
    console.log('Error Connecting To DataBase', err)
  })

app.use(cookieParser())
app.use(express.json())
app.use(cors())

routes(app)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`ready at http://localhost:${PORT}`)
})
