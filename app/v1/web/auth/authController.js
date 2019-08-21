function login(req, res) {
  res.json({ success: true })
}

function register(req, res) {
  res.json({ success: true })
}

function forgotPassword(req, res) {
  res.json({ success: true })
}

function resetPassword(req, res) {
  res.json({ success: true })
}

function verifyEmail(req, res) {
  res.json({ success: true })
}

module.exports = {
  login,
  register,
  forgotPassword,
  resetPassword,
  verifyEmail,
}
