const express = require("express");
const router = express.Router();
const axios = require("axios");

const RESEVOIR_API_KEY = process.env.RESEVOIR_API_KEY;
const MODULE_API_KEY = process.env.MODULE_API_KEY;

router.get("/:id", (req, res) => {
  let config = {
    headers: {
      "accept-encoding": "*",
      "x-api-key": RESEVOIR_API_KEY,
    },
  };

  axios
    .get(
      `https://api.reservoir.tools/sales/v4?includeTokenMetadata=true&collection=${req.params.id}&limit=1000`,
      config
    )
    .then((response) => {
      const salesData = response.data.sales.map((sale) => {
        return {
          name: sale.token.collection.name,
          tokenId: sale.token.tokenId,
          orderSource: sale.orderSource,
          image: sale.token.image,
          txHash: sale.txHash,
          timestamp: sale.timestamp,
          priceInEth: sale.price.amount.decimal,
          priceInUsd: sale.price.amount.usd,
          washTradingScore: sale.washTradingScore,
        };
      });

      // console.log(salesData);
      res.status(200).send(salesData);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});


router.post("/:id", (req, res) => {
  let config = {
    headers: {
      "accept-encoding": "*",
      "x-api-key": RESEVOIR_API_KEY,
    },
  };

  axios
    .get(
      `https://api.reservoir.tools/sales/v4?includeTokenMetadata=true&collection=${req.params.id}&startTimestamp=${req.body.start}&endTimestamp=${req.body.end}&limit=1000`,
      config
    )
    .then((response) => {
      const salesData = response.data.sales.map((sale) => {
        return {
          name: sale.token.collection.name,
          tokenId: sale.token.tokenId,
          orderSource: sale.orderSource,
          image: sale.token.image,
          txHash: sale.txHash,
          timestamp: sale.timestamp,
          priceInEth: sale.price.amount.decimal,
          priceInUsd: sale.price.amount.usd,
          washTradingScore: sale.washTradingScore,
        };
      });

      // console.log(salesData);
      res.status(200).send(salesData);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});

router.post("/time/:id", (req, res) => {
  let config = {
    headers: {
      "accept-encoding": "*",
      "x-api-key": RESEVOIR_API_KEY,
    },
  };
  axios
    .get(
      `https://api.reservoir.tools/sales/v4?includeTokenMetadata=${req.body.metadata}&collection=${req.params.id}&startTimestamp=${req.body.start}&endTimestamp=${req.body.end}&limit=1000`,
      config
    )
    .then((response) => {
      console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});

router.get("/module/:id", (req, res) => {
  let config = {
    headers: {
      Accept: "application/json",
      "accept-encoding": "*",
      "X-API-KEY": MODULE_API_KEY,
    },
  };
  axios
    .get(
      `https://api.modulenft.xyz/api/v2/eth/nft/sales?count=100&offset=0&sortDirection=timeDesc&contractAddress=${req.params.id}&withMetadata=true&limit=100`,
      config
    )
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});

module.exports = router;
