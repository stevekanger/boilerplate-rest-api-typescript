import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get('Authorization')
    const accessToken = authHeader?.split(' ')[1]

    jwt.verify(accessToken as string, process.env.JWT_ACCESS_SECRET as string)

    next()
  } catch (error) {
    return res.sendStatus(401)
  }
}

export default verifyAccessToken
