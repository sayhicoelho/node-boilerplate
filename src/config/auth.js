module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExp: process.env.JWT_EXP,
  bcryptSalt: process.env.BCRYPT_SALT || 10,
}
