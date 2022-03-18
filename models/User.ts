import mongoose from 'mongoose'
import ms from 'ms'
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
  verified: {
    type: Boolean,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
})

UserSchema.post('save', async (doc) => {
  setTimeout(async () => {
    const user = await User.findOne({ _id: doc._id })
    if (!user.verified) user.remove()
  }, ms(`${process.env.EMAIL_VERIFICATION_TIMESPAN}`))
})

const User = mongoose.model('user', UserSchema)

export default User
