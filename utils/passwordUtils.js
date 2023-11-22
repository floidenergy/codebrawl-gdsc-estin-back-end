const crypto = require('crypto');

const genSalt = () => crypto.randomBytes(32).toString('hex');
const genHash = (password, salt) => crypto.pbkdf2Sync(password, salt, 30000, 32, 'sha512').toString('hex');

const validatePassword = (password, hash, salt) => {
  const newHash = genHash(password, salt);
  return newHash === hash;
}

const genPassword = (password) => {
  const salt = genSalt()
  const hash = genHash(password, salt);
  return {
    salt,
    hash
  }
}

module.exports = { validatePassword, genPassword }