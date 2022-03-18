# Authentication Rest Api Boilerplate

Simple authentication rest api with express and mongoose. Built with typescript.

## Installation

```bash
git clone https://github.com/stevekanger/rest-api-boilerplate-typescript.git
```

```bash
npm install
```

### Replace the information in the `.env` file with your variables.

Note: your access token should have a shorter lifespan than the refresh token.

```
# Mongo db uri
MONGO_URI=mongodb://localhost/example_database

# JSON Web token access string
JWT_ACCESS_SECRET=YOUR_JWT_ACCESS_SECRET_CODE_HERE

# JSON Web token refresh string
JWT_REFRESH_SECRET=YOUR_JWT_REFRESH_SECRET_CODE_HERE

# JSON Web token verification string
JWT_VERIFICATION_SECRET=YOUR_JWT_VERIFICATION_SECRET_CODE_HERE

# Your json web token access lifespan
JWT_ACCESS_LIFESPAN=5s

# Your json web token refresh lifespan
JWT_REFRESH_LIFESPAN=60s

# The timespan in which a user has the ability to verify their account or reset passowrd
EMAIL_VERIFICATION_TIMESPAN=60m
```

### Replace your smtp settings in utils/sendEmail

Right now the email is set to nodemailers test client. Change these variables to your smpt client for production.

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
