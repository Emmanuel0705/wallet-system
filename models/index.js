// Import the mongoose module
const mongoose = require("mongoose");
// Define schema
const Schema = mongoose.Schema;

const Wallet = new Schema({
  privateKey: String,
  address: String,
  main: Boolean,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Compile model from schema
const WalletModel = mongoose.model("wallets", Wallet);

module.exports = {
  WalletModel,
};
