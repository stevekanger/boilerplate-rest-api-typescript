import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../../models/User'

const emailVerificationController = async (req: Request, res: Response) => {
  try {
    const { token } = req.body

    const { email } = jwt.decode(token) as { email: string }

    const user = await User.findOne({ email: email })

    if (!user) return res.sendStatus(401)

    jwt.verify(token, user.password)

    user.verified = true
    user.save()

    return res.status(200).json({
      msg: 'Your account has been activated you may now login',
    })
  } catch (error) {
    return res.sendStatus(400)
  }
}

export default emailVerificationController
