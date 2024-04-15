const express = require("express");
var cors = require("cors");
require("dotenv").config();

const {
  generateWallets,
  transferEth,
  getWallets,
  deleteWallet,
} = require("./controllers/main");
const { db } = require("./utils/db");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/transfer", transferEth);
app.get("/wallets", getWallets);
app.post("/wallets", generateWallets);
app.delete("/wallets/:address", deleteWallet);

db();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
