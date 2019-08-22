import multer from 'multer'
import config from '@config'
import * as helpers from '@utils/helpers'
import { __ } from '@i18n'

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, config.storage.uploadsDir),
  filename: (req, file, cb) => {
    const filename = helpers.filename(file.originalname)
    const now = Date.now()
    const safename = helpers.slugify(filename.name)
    const ext = filename.ext

    cb(null, `${now}-${safename}.${ext}`)
  },
})

const limits = {
  fileSize: config.storage.maxFileSize,
}

const uploadTypes = {
  image: config.storage.validImages,
  csv: ['text/csv'],
  txt: ['text/plain'],
  pdf: ['application/pdf'],
}

export const extensions = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'text/plain': 'txt',
  'text/csv': 'csv',
  'application/pdf': 'pdf',
}

export function upload(type, mimetypes = null) {
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
