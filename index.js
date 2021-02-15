const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
const morgan = require("morgan");
const bodyParser = require("body-parser");
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

app.use("/api/auth", require("./routes/UserRoute"));
app.use("/api/coins", require("./routes/CoinRoute"));

app.use("/", (req, res) => {
  res.send("App is Running");
});

var cw = require("crypto-wallets");
// var bitcoinWallet = cw.generateWallet("BTC");
// console.log("Address: " + bitcoinWallet.address);
// console.log("Private Key: " + bitcoinWallet.privateKey);

// verify
// currency = "BTC";
// pk = "KzQ75CZf4PNG3wnzcVvsXDH3f2i9d6pzqkHQnttoTdY4ioXF1rLR";
// address = "1KTX8dXVykUkxHUHgnWBapru7ZNanX4oVw";

// var result = cw.verifyPrivateKey(currency, pk, address);
// console.log(result);

const TronWeb = require("tronweb");
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
const privateKey =
  "3481E79956D4BD95F358AC96D151C976392FC4E3FC132F78A847906DE588C145";
const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);
console.log("**************");

console.log(tronWeb.address.toHex());

function createAccount() {
  try {
    const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);
    return tronWeb.createAccount();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
// createAccount();
