import mongoose from 'mongoose'
import ms from 'ms'
import config from '../config'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  authToken: {
    type: String,
    default: '',
  },
  verified: {
    type: Boolean,
    default: false,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: {
      expireAfterSeconds: ms(config.jwtVerificationLifespan) / 1000,
      partialFilterExpression: { verified: false },
    },
  },
})

const User = mongoose.model('user', UserSchema)

export default User
