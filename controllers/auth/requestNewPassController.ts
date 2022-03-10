import { Request, Response } from 'express'
import User from '../../models/user'
import verificationMailer from '../../helpers/verificationMailer'
import { createVerificationToken } from '../../helpers/createTokens'

const requestNewPassController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    if (!email) return res.status(400).json({ msg: 'Please enter an email' })

    const user = await User.findOne({ email: email })

    if (!user)
      return res.status(400).json({
        msg: `A user with the email ${email} does not exist on our database`,
      })

    const verificationToken = createVerificationToken(email)
    verificationMailer(email, verificationToken, 'changepassword')

    return res.status(200).json({
      msg: `An email was sent to ${email} please check your email for verification`,
    })
  } catch (err) {
    return res.status(400).json({
      msg: 'There was an error with your request',
    })
  }
}

export default requestNewPassController
