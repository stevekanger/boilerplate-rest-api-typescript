import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../../models/User'
import { createAccessToken } from '../../helpers/createTokens'

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })

    if (!user || !user.verified) return res.sendStatus(401)

    await bcrypt.compare(password, user.password)

    const { accessToken, accessTokenExp } = createAccessToken(res)

    return res.status(200).json({
      name: user.name,
      accessToken,
      accessTokenExp,
      msg: 'User successfully logged in',
    })
  } catch (error) {
    return res.sendStatus(401)
  }
}

export default loginController
