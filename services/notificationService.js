const OneSignal = require('onesignal-node')
const config = require('../config')
const logger = require('../services/loggerService')

const client = new OneSignal.Client({
  userAuthKey: config.onesignal.userAuthKey,
  app: {
    appAuthKey: config.onesignal.appAuthKey,
    appId: config.onesignal.appId,
  },
})

const sendNotification = (headings, contents, included_segments) => {
  return new Promise((resolve, reject) => {
    const notification = new OneSignal.Notification({
      headings,
      contents,
      included_segments,
      excluded_segments: ['Banned Users'],
    })

    client
      .sendNotification(notification)
      .then(response => {
        const { data, httpResponse } = response
        const { statusCode } = httpResponse

        if (statusCode != 200) {
          logger.warn(`Failed to send notification: ${data.errors.join(', ')}`)
          reject(new Error('Failed to send notification.'))
        } else {
          resolve(response)
        }
      })
      .catch(err => {
        logger.error(err.stack)
        reject(err)
      })
  })
}

module.exports = {
  sendNotification,
}
