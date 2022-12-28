const express = require("express");
const router = express.Router();
const axios = require("axios");

const TRANSPOSE_API = process.env.TRANSPOSE_API;

router.get("/", async (req, res) => {
  try {
    let response = await axios.post(
      "https://api.transpose.io/sql",
      {
        sql: `SELECT c.contract_address,
        name,
        total_eth_spent,
        last_refreshed,
        external_url,
        image_url,
        symbol,

      (
              (number_of_sales *

              /* the ratio of sales to unique addresses */
              (distinct_addresses::float / number_of_sales::float))
              
              + total_eth_spent 
      ) as score
FROM

(SELECT contract_address, 
      count(*) as number_of_sales,
      count(distinct concat(buyer_address, seller_address)) as distinct_addresses,
      sum(eth_price) as total_eth_spent
FROM ethereum.nft_sales
WHERE timestamp >= NOW() - INTERVAL  '${req.query.time}'
AND eth_price IS NOT NULL
GROUP BY contract_address) as sales

JOIN ethereum.collections as c
ON sales.contract_address = c.contract_address

ORDER BY score DESC
LIMIT 5;`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": TRANSPOSE_API,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
