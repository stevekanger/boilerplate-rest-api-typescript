import jwt from 'jsonwebtoken'

export const createVerificationToken = (email: string) => {
  return jwt.sign({ email }, `${process.env.JWT_SECRET_VERIFICATION}`, {
    expiresIn: '1d',
  })
}

export const createAccessToken = () => {
  const accessToken = jwt.sign({}, `${process.env.JWT_SECRET_ACCESS}`, {
    expiresIn: '30s',
  })

  const { exp } = jwt.decode(accessToken) as { exp: number }

  return { accessToken, exp }
}

export const createRefreshToken = () => {
  return jwt.sign({}, `${process.env.JWT_SECRET_REFRESH}`, {
    expiresIn: '2m',
  })
}
