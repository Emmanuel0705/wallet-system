const {
  _generateWallets,
  getBalancesForAddresses,
} = require("../utils/wallet");
const { _sendEth } = require("../utils/transfer");
const { WalletModel } = require("../models");
const { decryptPrivateKey } = require("../utils/kms");
const { parseUnits } = require("ethers");

const generateWallets = async (req, res) => {
  try {
    const { numWallet } = req?.body;

    if (!numWallet || typeof numWallet !== "number" || numWallet > 10)
      return res
        .status(400)
        .json({ success: false, msg: "Invalid numbers of wallets" });

    const wallets = _generateWallets(numWallet);
    const createWallets = await WalletModel.create(wallets);
    res.json({ success: true, wallets: createWallets });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getWallets = async (req, res) => {
  try {
    const wallets = await WalletModel.find();

    const walletsWithBal = await getBalancesForAddresses(wallets);

    res.json({ wallets: walletsWithBal });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteWallet = async (req, res) => {
  try {
    const { address } = req.params;
    const wallet = await WalletModel.deleteOne({ address });

    res.json({ success: true, message: "DELETED" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const transferEth = async (req, res) => {
  //   const pk = "f4aa392b3b595e5a7556807cbbe1c0fcc88dd772f17178413e5a1996e2edd142";
  try {
    const { from, to, value, amount } = req?.body;

    if (!value || !from || !Array.isArray(amount) || !Array.isArray(to)) {
      return res.status(400).json({ success: false, msg: "Invalid request" });
    }

    const wallets = await WalletModel.findOne({ address: from });
    const privateKey = wallets.privateKey;
    const decryptedPrivateKey = decryptPrivateKey(privateKey);

    const normalizeAmount = amount.map((amount) => parseUnits(String(amount)));

    const tx = await _sendEth(
      decryptedPrivateKey,
      to,
      normalizeAmount,
      parseUnits(String(value))
    );
    res.json(tx);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  generateWallets,
  transferEth,
  getWallets,
  deleteWallet,
};
