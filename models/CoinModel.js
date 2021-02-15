const mongoose = require("mongoose");
const coinSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  icon: { type: String },
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  slug: { type: String },
  num_market_pairs: { type: Number, required: true },
  date_added: { type: String, required: true },
  tags: { type: [String], required: true },
  max_supply: { type: Number, default: null },
  circulating_supply: { type: Number, default: null },
  total_supply: { type: Number, default: null },
  platform: { type: {}, default: null },
  cmc_rank: { type: Number },
  last_updated: { type: String },
  quote: { type: {} },
});
module.exports = User = mongoose.model("coins", coinSchema);

// {
//     "id":6636,
//     "name":"Polkadot",
//     "symbol":"DOT",
//     "slug":"polkadot-new",
//     "num_market_pairs":94,
//     "date_added":"2020-08-19T00:00:00.000Z",
//     "tags":[
//        "substrate",
//        "polkadot",
//        "binance-chain"
//     ],
//     "max_supply":null,
//     "circulating_supply":878691889.9379023,
//     "total_supply":1013497302.8294004,
//     "platform":null,
//     "cmc_rank":8,
//     "last_updated":"2020-11-17T06:36:05.000Z",
//     "quote":{
//        "USD":{
//           "price":4.84491856244588,
//           "volume_24h":508827801.60097903,
//           "percent_change_1h":4.21276387,
//           "percent_change_24h":9.65478215,
//           "percent_change_7d":10.69417728,
//           "market_cap":4257190648.230795,
//           "last_updated":"2020-11-17T06:36:05.000Z"
//        }
//     }
//  },
