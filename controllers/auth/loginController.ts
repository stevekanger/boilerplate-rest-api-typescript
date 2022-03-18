import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../../models/User'
import jwt from 'jsonwebtoken'

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })

    if (!user || !user.verified) return res.sendStatus(401)

    await bcrypt.compare(password, user.password)

    const accessToken = jwt.sign({}, process.env.JWT_ACCESS_SECRET as string, {
      expiresIn: process.env.JWT_ACCESS_LIFESPAN,
    })

    const refreshToken = jwt.sign(
      {},
      process.env.JWT_REFRESH_SECRET as string,
      {
        expiresIn: process.env.JWT_REFRESH_LIFESPAN,
      }
    )

    return res.status(200).json({
      accessToken,
      refreshToken,
      msg: 'User successfully logged in',
    })
  } catch (error) {
    return res.sendStatus(401)
  }
}

export default loginController
