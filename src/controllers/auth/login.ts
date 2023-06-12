import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../../models/User'
import createToken from '../../utils/auth/createToken'
import setRefreshTokenCookie from '../../utils/auth/setRefreshTokenCookie'

export default async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })

    if (!user || !user.verified) {
      return res.status(401).json({
        success: false,
        msg: 'Unauthorized',
      })
    }

    await bcrypt.compare(password, user.password)

    const accessToken = createToken('access', user._id)
    const refreshToken = createToken('refresh', user._id)

    setRefreshTokenCookie(res, refreshToken)
    user.authToken = refreshToken
    user.save()

    return res.status(200).json({
      accessToken,
      success: true,
      msg: 'User successfully logged in',
    })
  } catch (err) {
    return res.status(401).json({
      success: false,
      msg: 'Unauthorized',
    })
  }
}
