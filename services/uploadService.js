const multer = require('multer')
const config = require('../config')

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, config.storage.uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
})

const limits = {
  fileSize: config.storage.maxFileSize,
}

const imageFilter = (req, file, cb) => {
  if (!config.storage.validImages.includes(file.mimetype))
    return cb(new Error('Only images are allowed'), false)

  cb(null, true)
}

const fileFilter = (req, file, cb) => {
  if (!config.storage.validFiles.includes(file.mimetype))
    return cb(
      new Error(
        `Only ${config.storage.validFiles.join(', ')} files are allowed`
      ),
      false
    )

  cb(null, true)
}

const image = multer({ storage, fileFilter: imageFilter, limits })
const file = multer({ storage, fileFilter, limits })

module.exports = {
  image,
  file,
}
