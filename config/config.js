module.exports = {
  /* App config */
  PORT: process.env.PORT,

  /* DataBase config */
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,

  /* JWT config */
  ACCESS_JWT_SECRET_WORD: process.env.ACCESS_JWT_SECRET_WORD,
  REFRESH_JWT_SECRET_WORD: process.env.REFRESH_JWT_SECRET_WORD,
  ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME
};
