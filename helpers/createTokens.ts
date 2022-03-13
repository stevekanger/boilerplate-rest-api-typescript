import { Response } from 'express'
import jwt from 'jsonwebtoken'

export const createVerificationToken = (email: string) => {
  return jwt.sign({ email }, `${process.env.JWT_SECRET_VERIFICATION}`, {
    expiresIn: process.env.JWT_VERIFICATION_LIFESPAN,
  })
}

export const createAccessToken = (res: Response) => {
  const accessToken = jwt.sign({}, `${process.env.JWT_SECRET_ACCESS}`, {
    expiresIn: `${process.env.JWT_ACCESS_LIFESPAN}`,
  })

  const refreshToken = jwt.sign({}, `${process.env.JWT_SECRET_REFRESH}`, {
    expiresIn: `${process.env.JWT_REFRESH_LIFESPAN}`,
  })

  const { exp: accessTokenExp } = jwt.decode(accessToken) as { exp: number }
  const { exp: refreshTokenExp } = jwt.decode(refreshToken) as { exp: number }

  res.cookie('R_TOKEN', refreshToken, {
    path: '/auth/tokens',
    httpOnly: true,
    expires: new Date(refreshTokenExp * 1000),
  })

  return { accessToken, accessTokenExp }
}
