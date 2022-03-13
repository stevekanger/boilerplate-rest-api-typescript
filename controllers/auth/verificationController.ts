import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../../models/User'

const verificationController = async (req: Request, res: Response) => {
  try {
    const { token } = req.body

    const { email } = jwt.verify(
      token,
      `${process.env.JWT_SECRET_VERIFICATION}`
    ) as { email: string }

    const user = await User.findOne({ email: email })

    if (!user) return res.sendStatus(401)

    if (user.verificationToken !== token) return res.sendStatus(400)

    user.verificationToken = null
    user.verified = true
    user.save()

    return res.status(200).json({
      msg: 'Your account has been activated you may now login',
    })
  } catch (error) {
    return res.sendStatus(400)
  }
}

export default verificationController
