# Authentication Rest Api Boilerplate

Simple authentication rest api with express and mongoose. Built with typescript.

## Installation

```bash
git clone https://github.com/stevekanger/rest-api-boilerplate-typescript.git
```

```bash
npm install
```

replace the information in the `.env` file with your variables.

Note: your access token should have a shorter lifespan than the refresh token.

```
MONGO_URI=mongodb://localhost/your_database_name
JWT_SECRET_ACCESS=YOUR_JWT_ACCESS_SECRET
JWT_SECRET_REFRESH=YOUR_JWT_REFRESH_SECRET
JWT_SECRET_VERIFICATION=YOUR_JWT_VERIFICATION_SECRET
JWT_ACCESS_LIFESPAN=30s
JWT_REFRESH_LIFESPAN=2m
JWT_VERIFICATION_LIFESPAN=1d
```

and then to develop

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
