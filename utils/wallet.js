const ethers = require("ethers");
const { JsonRpcProvider } = require("ethers");
const crypto = require("crypto");
const { encryptPrivateKey } = require("./kms");
const provider = new JsonRpcProvider(process.env.PROVIDER);

const _generateWallets = (numWallets) => {
  const wallets = [];
  for (let i = 0; i < numWallets; i++) {
    const id = crypto.randomBytes(32).toString("hex");
    const privateKey = "0x" + id;
    const wallet = new ethers.Wallet(privateKey);
    const encryptedPrivateKey = encryptPrivateKey(privateKey);

    wallets.push({
      privateKey: encryptedPrivateKey,
      address: wallet.address,
      main: i === 0,
      // Add more properties if needed
    });
  }
  return wallets;
};
const getBalancesForAddresses = async (data) => {
  try {
    const balances = await Promise.all(
      data.map(async (item) => {
        const balanceWei = await provider.getBalance(item.address);
        const balanceEther = ethers.formatEther(balanceWei);
        return {
          address: item.address,
          balance: balanceEther,
          main: item.main,
        };
      })
    );
    return balances;
  } catch (error) {
    console.error("Error:", error);
  }
};
//0xBebDf63F9255c3025B61a43EE8344057cA923907

module.exports = {
  _generateWallets,
  getBalancesForAddresses,
};
