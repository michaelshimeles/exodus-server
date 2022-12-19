const express = require("express");
const router = express.Router();
const axios = require("axios");

const TRANSPOSE_API = process.env.TRANSPOSE_API;

const postData = `SELECT collection_address AS "Collection Address",
old_floor AS "Yesterday's Floor (ETH)",
new_floor AS "Current Floor (ETH)",
round(((new_floor - old_floor) / old_floor) * 100, 2) AS "Percent Change (%)"
FROM (
SELECT

(SELECT contract_address 
FROM ethereum.collections
WHERE contract_address = c.address) AS collection_address,

(SELECT percentile_disc(0.05)
WITHIN GROUP (ORDER BY eth_price) 
FROM ethereum.nft_sales 
WHERE contract_address = c.address 
AND timestamp >= NOW() - INTERVAL '2 DAY'
AND timestamp <= NOW() - INTERVAL '1 DAY') AS old_floor,

(SELECT percentile_disc(0.05)
WITHIN GROUP (ORDER BY eth_price) 
FROM ethereum.nft_sales 
WHERE contract_address = c.address 
AND timestamp >= NOW() - INTERVAL '1 DAY') AS new_floor

FROM 

(SELECT DISTINCT contract_address AS address
FROM ethereum.nft_sales
WHERE timestamp >= NOW() - INTERVAL '1 DAY') AS c
) as floors

WHERE new_floor IS NOT NULL
AND old_floor IS NOT NULL
AND old_floor >= 0.1 /* only floor prices >= 0.1 ETH, helps cut through the noise. */
ORDER BY "Percent Change (%)" DESC
LIMIT 10;`;

router.get("/", (req, res) => {
  let config = {
    headers: {
      "accept-encoding": "*",
      "Content-Type": "application/json",
      "x-api-key": TRANSPOSE_API,
    },
  };
  axios
    .post("https://api.transpose.io/sql", { sql: postData, config })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});

module.exports = router;
