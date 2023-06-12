import type { Response } from 'express'
import ms from 'ms'
import config from '../../config'

export default function setRefreshCookie(res: Response, token: string) {
  const paths = ['/auth/refresh', '/auth/logout']

  paths.forEach((path) => {
    res.cookie('refreshToken', token, {
      secure: process.env.NODE_ENV === 'production' ? true : false,
      maxAge: Date.now() + ms(config.jwtRefreshLifespan),
      httpOnly: true,
      path,
    })
  })
}
