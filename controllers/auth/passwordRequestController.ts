import { Request, Response } from 'express'
import User from '../../models/User'
import verificationMailer from '../../helpers/verificationMailer'
import { createVerificationToken } from '../../helpers/createTokens'

const passwordRequestController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    if (!email) return res.sendStatus(400)

    const user = await User.findOne({ email: email })

    if (!user) return res.sendStatus(400)

    const verificationToken = createVerificationToken(email)
    verificationMailer(email, verificationToken, 'changepassword')

    return res.status(200).json({
      msg: `An email was sent to ${email} please check your email for verification`,
    })
  } catch (error) {
    return res.sendStatus(400)
  }
}

export default passwordRequestController
