import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../../models/user'
import verificationMailer from '../../helpers/verificationMailer'
import { createVerificationToken } from '../../helpers/createTokens'

const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password)
      return res.status(400).json({ msg: 'Please enter all fields' })

    const user = await User.findOne({ email: email })

    if (user)
      return res
        .status(400)
        .json({ msg: 'User with that email already exists' })

    const verificationToken = createVerificationToken(email)
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const newUser = new User({
      name,
      email,
      password: hash,
      verified: false,
      verificationToken,
    })

    verificationMailer(email, verificationToken, 'verify')

    newUser.save()

    return res.status(200).json({
      msg: `User was created successfully.  Please check the email you provided to verify your email`,
    })
  } catch (err) {
    return res.status(400).json({
      msg: 'Registration failed',
    })
  }
}

export default registerController
