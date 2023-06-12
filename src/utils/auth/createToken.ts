import type { Types } from 'mongoose'
import jwt from 'jsonwebtoken'
import config from '../../config'

function getExpireTime(type: string) {
  switch (type) {
    case 'access':
      return config.jwtAccessLifespan
    case 'refresh':
      return config.jwtRefreshLifespan
    case 'verification':
      return config.jwtVerificationLifespan
    default:
      throw new Error('There is no such thing as a token of type ' + type)
  }
}

export default function createToken(type: string, _id: Types.ObjectId) {
  return jwt.sign({ _id }, process.env.JWT_SECRET as string, {
    expiresIn: getExpireTime(type),
  })
}
