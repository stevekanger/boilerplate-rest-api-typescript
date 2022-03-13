import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../../models/User'
import verificationMailer from '../../helpers/verificationMailer'
import { createVerificationToken } from '../../helpers/createTokens'
import validateEmail from '../../helpers/validateEmail'

const signupController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password || !validateEmail(email))
      return res.sendStatus(400)

    const user = await User.findOne({ email: email })

    if (user) return res.sendStatus(400)

    const verificationToken = createVerificationToken(email)
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    await verificationMailer(email, verificationToken, 'verify')

    const newUser = new User({
      name,
      email,
      password: hash,
      verified: false,
      verificationToken,
    })

    newUser.save()

    return res.status(200).json({
      msg: `User was created successfully.  Please check the email you provided to verify your email`,
    })
  } catch (error) {
    return res.sendStatus(400)
  }
}

export default signupController
