import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../../models/User'
import {
  createAccessToken,
  createRefreshToken,
} from '../../helpers/createTokens'

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })

    if (!user || !user.verified)
      return res.status(401).json({ msg: 'Invalid login attempt' })

    await bcrypt.compare(password, user.password)

    const { accessToken, exp } = createAccessToken()
    const refreshToken = createRefreshToken()

    res.cookie('refreshToken', refreshToken, {
      path: '/auth/refresh-tokens',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      httpOnly: true,
    })

    return res.status(200).json({
      accessToken,
      exp,
      msg: 'User successfully logged in',
    })
  } catch (err) {
    return res.status(401).json({
      msg: 'Invalid login attempt',
    })
  }
}

export default loginController
