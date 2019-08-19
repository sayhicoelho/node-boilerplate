module.exports = {
  name: 'Node',
  host: process.env.APP_HOST || 'http://localhost',
  port: process.env.APP_PORT || 3333,
  langs: ['en', 'pt'],
  fallbackLang: 'en',
}
