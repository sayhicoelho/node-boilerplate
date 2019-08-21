const multer = require('multer')
const config = require('../config')
const { __ } = require('../i18n')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, config.storage.uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
})

const limits = {
  fileSize: config.storage.maxFileSize,
}

const extensions = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'text/plain': 'txt',
  'text/csv': 'csv',
  'application/pdf': 'pdf',
}

const uploadTypes = {
  img: config.storage.validImages,
  csv: ['text/csv'],
  txt: ['text/plain'],
  pdf: ['application/pdf'],
}

const upload = (type, mimetypes = null) => {
  if (type in uploadTypes) {
    mimetypes = uploadTypes[type]
  }

  if (!mimetypes) throw new Error(`Missing mimetypes for the type ${type}`)

  const fileFilter = (req, file, cb) => {
    if (!mimetypes.includes(file.mimetype))
      return cb(
        new Error(
          __(`Only files are allowed`, req.res.locals.lang, {
            mimetypes: mimetypes.map(mt => extensions[mt] || mt).join(', '),
          })
        ),
        false
      )

    cb(null, true)
  }

  return multer({ storage, fileFilter, limits })
}

module.exports = {
  upload,
  extensions,
}
