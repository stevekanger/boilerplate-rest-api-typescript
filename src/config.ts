type TConfig = {
  jwtAccessLifespan: string
  jwtRefreshLifespan: string
  jwtVerificationLifespan: string
  clientDomain: string
}

const config: TConfig = {
  jwtAccessLifespan: '5s',
  jwtRefreshLifespan: '60s',
  jwtVerificationLifespan: '1m',
  clientDomain: 'http://localhost:5173',
}

export default config
