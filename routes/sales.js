const express = require("express");
const router = express.Router();
const axios = require("axios");

const RESEVOIR_API_KEY = process.env.RESEVOIR_API_KEY;
const MODULE_API_KEY = process.env.MODULE_API_KEY;

router.get("/:id", async (req, res) => {
  let config = {
    headers: {
      "accept-encoding": "*",
      "x-api-key": RESEVOIR_API_KEY,
    },
  };

  try {
    let response = await axios.get(
      `https://api.reservoir.tools/sales/v4?includeTokenMetadata=true&collection=${req.params.id}&limit=1000`,
      config
    );
    const salesData = response.data.sales.map((sale) => {
      return {
        id: sale?.id,
        name: sale?.token?.collection?.name,
        tokenId: sale?.token?.tokenId,
        orderSource: sale?.orderSource,
        image: sale?.token?.image,
        txHash: sale?.txHash,
        timestamp: sale?.timestamp,
        priceInEth: sale?.price?.amount?.decimal,
        priceInUsd: sale?.price?.amount?.usd,
        washTradingScore: sale?.washTradingScore,
      };
    });
    res.status(200).send(salesData);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.post("/:id", async (req, res) => {
  let config = {
    headers: {
      "accept-encoding": "*",
      "x-api-key": RESEVOIR_API_KEY,
    },
  };

  try {
    let response = await axios.get(
      `https://api.reservoir.tools/sales/v4?includeTokenMetadata=true&collection=${req.params.id}&startTimestamp=${req.body.start}&endTimestamp=${req.body.end}&limit=1000`,
      config
    );
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

    res.status(200).send(salesData);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get("/time/:id", async (req, res) => {
  let config = {
    headers: {
      "accept-encoding": "*",
      "x-api-key": RESEVOIR_API_KEY,
    },
  };
  try {
    let response = await axios.get(
      `https://api.reservoir.tools/sales/v4?includeTokenMetadata=true&collection=${req.params.id}&startTimestamp=${req.query.start}&endTimestamp=${req.query.end}&limit=1000`,
      config
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
