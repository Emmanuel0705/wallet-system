// Import the mongoose module
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

async function db() {
  await mongoose.connect(process.env.DB_URL);
  console.log("DB CONNECTED");
}

module.exports = {
  db,
};
