const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const Coin = require("../models/CoinModel");

const rp = require("request-promise");

const key1 = "bfa8f651-c56c-4e13-a099-8632b8932188";
const key2 = "25a128da-fb56-43e7-8807-5203703f71c7";

// saveCoins
router.get("/saveCoins", async (req, res) => {
  const requestOptions = {
    method: "GET",
    uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
    qs: { start: "1", limit: "5000", convert: "USD" },
    headers: { "X-CMC_PRO_API_KEY": "bfa8f651-c56c-4e13-a099-8632b8932188" },
    json: true,
    gzip: true,
  };

  rp(requestOptions)
    .then((response) => {
      response.data.forEach((coin) => {
        try {
          const newCoin = new Coin({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            slug: coin.slug,
            num_market_pairs: coin.num_market_pairs,
            date_added: coin.date_added,
            tags: coin.tags,
            max_supply: coin.max_supply,
            circulating_supply: coin.circulating_supply,
            total_supply: coin.total_supply,
            platform: coin.platform,
            cmc_rank: coin.cmc_rank,
            last_updated: coin.last_updated,
            quote: coin.quote,
          });
          newCoin.save().then((value) => console.log(value));
        } catch (err) {
          // return res.status(500).json({ error: err.message });
          console.log(err);
        }
      });
      return res.status(200).json(response);
    })
    .catch((err) => {
      console.log("API call error:", err);
      return res.send(err);
      //   return res.status(500).json({ response: err });
    });
});

router.get("/coin", auth, async (req, res) => {
  //   const count = await Coin.count({}, function (err, count) {
  //     console.log("Number of docs: ", count);
  //   });
  //   console.log(count);

  const coins = await Coin.find({}, function (err, res) {
    // return res.json({ coins: coins });
  });

  let ids = "";
  coins.forEach((coin) => {
    ids += ids == "" ? `${coin.id}` : `,${coin.id}`;
  });

  const requestOptions = {
    method: "GET",
    uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/info",
    qs: { id: ids.split(",").slice(3000, 4000).join(",") },
    headers: { "X-CMC_PRO_API_KEY": key2 },
    json: true,
    gzip: true,
  };

  rp(requestOptions)
    .then((response) => {
      const result = Object.entries(response.data).map(([key, value]) => value);

      result.forEach((i) => {
        try {
          Coin.findOneAndUpdate(
            { id: i.id },
            { icon: i.logo },
            {
              new: true, // return updated doc
              runValidators: true, // validate before update
            }
          )
            .then((doc) => console.log("Updated", doc))
            .catch((err) => console.error(err));
        } catch (err) {
          console.log(err);
        }
      });
      return res.status(200).json(response.data);
    })
    .catch((err) => {
      return res.status(500).json({ response: err });
    });
});

/* Get All List of Coins */
router.get("/getAll", auth, async (req, res) => {
  console.log("yyyyyy");

  try {
    const coins = await Coin.find({}).limit(20);
    return res.status(200).json(coins);
  } catch (err) {
    return res.status(500).json(err);
  }
});
/* Get All List of Coins */

module.exports = router;
