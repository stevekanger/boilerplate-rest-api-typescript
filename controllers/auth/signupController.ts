import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../../models/User'
import sendEmail from '../../utils/sendEmail'
import validateEmail from '../../utils/validateEmail'

const signupController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password || !validateEmail(email))
      return res.sendStatus(400)

    const user = await User.findOne({ email: email })

    if (user) return res.sendStatus(400)

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const verificationToken = jwt.sign({ email }, hashedPassword, {
      expiresIn: process.env.EMAIL_VERIFICATION_TIMESPAN,
    })

    await sendEmail({
      from: '"Security" <noreply@example.com>',
      to: email,
      subject: 'Email Verification',
      html: `You have signed up for a new account. Please verify your email by following the link below<br>
       <a href="http://localhost:3000/email-verification?token=${verificationToken}">Email Verification</a>.`,
    })

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
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
