const { JsonRpcProvider, Wallet, parseUnits } = require("ethers");
const ethers = require("ethers");
const dotenv = require("dotenv");
const contractABI = require("../smart-contract/abi.json");
const provider = new JsonRpcProvider(process.env.PROVIDER);

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  contractABI,
  provider
);

const _sendEth = async (privateKey, to, amount, value) => {
  try {
    const wallet = new ethers.Wallet(privateKey);
    const signer = wallet.connect(provider);
    const contractWithSigner = contract.connect(signer);

    const tx = await contractWithSigner.airdrop(to, amount, {
      value,
    });

    await tx.wait();
    return {
      hash: tx.hash,
    };
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  _sendEth,
};
