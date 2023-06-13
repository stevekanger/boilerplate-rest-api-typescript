# Authentication Rest Api Boilerplate

Simple authentication rest api with express, mongoose and jwt. Built with typescript. This authentication uses access and refresh tokens. The refresh token will be validated against the mongodb database. (Redis would be more performant for large scale).

## Installation

```bash
git clone https://github.com/stevekanger/nodejs-api-jwt-auth.git
```

```bash
npm install
```

### Replace the information in the `.env` file with your variables.

```
# Mongo db uri
MONGO_URI=mongodb://127.0.0.1:27017/example_database

# JSON web token secret used to sign jwt
JWT_SECRET=YOUR_JWT_SECRET_CODE_HERE

```

### Replace your token lifespans and client domain in the `config.ts` file

Your refresh tokens should be longer lived than the access tokens. Your final config should be something like the following.

```javascript
const config: TConfig = {
  jwtAccessLifespan: '15m',
  jwtRefreshLifespan: '1w',
  jwtVerificationLifespan: '1d',
  clientDomain: 'example.com',
}
```

### Replace your smtp settings in `utils/sendEmail.ts`

Right now the email is set to nodemailers test client. Change these variables to your smpt client for production. It should look something like the following when done.

```javascript
export default async function sendEmail({
  from,
  to,
  subject,
  html,
}: {
  from: string
  to: string
  subject: string
  html: string
}) {
  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.your-email-host.com',
      port: 465,
      secure: true,
      auth: {
        user: 'Your Username',
        pass: 'Your password',
      },
    })

    await transporter.sendMail({ from, to, subject, html })
  } catch (error) {
    throw new Error('There was an error sending email')
  }
}
```

## Commands

to develop

```bash
npm run dev
```

to build

```bash
npm run build
```

and to start

```bash
npm run start
```
