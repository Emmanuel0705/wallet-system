const CryptoJS = require("crypto-js");

// Encrypt
const encryptPrivateKey = (privateKey) => {
  const encrypted = CryptoJS.AES.encrypt(
    privateKey,
    process.env.ENCRYPTION_KEY
  ).toString();
  return encrypted;
};

// Decrypt
const decryptPrivateKey = (encryptedPrivateKey) => {
  const decrypted = CryptoJS.AES.decrypt(
    encryptedPrivateKey,
    process.env.ENCRYPTION_KEY
  ).toString(CryptoJS.enc.Utf8);
  return decrypted;
};

module.exports = {
  encryptPrivateKey,
  decryptPrivateKey,
};
