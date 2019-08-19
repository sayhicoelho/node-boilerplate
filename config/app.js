module.exports = {
  name: 'Node',
  env: process.env.NODE_ENV || 'development',
  host: process.env.APP_HOST || 'http://localhost',
  port: process.env.APP_PORT || 3333,
  langs: ['en', 'pt'],
  fallbackLang: 'en',
}
