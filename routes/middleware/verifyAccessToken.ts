import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get('Authorization')
    const accessToken = authHeader && authHeader?.split(' ')[1]

    jwt.verify(accessToken as string, `${process.env.JWT_SECRET_ACCESS}`)

    next()
  } catch (error) {
    return res.sendStatus(401)
  }
}

export default verifyAccessToken
