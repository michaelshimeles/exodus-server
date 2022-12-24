const express = require("express");
const router = express.Router();
const axios = require("axios");

const RESEVOIR_API_KEY = process.env.RESEVOIR_API_KEY;
const MODULE_API_KEY = process.env.MODULE_API_KEY;

router.get("/:id", async (req, res) => {
  let config = {
    headers: {
      "accept-encoding": "*",
      "X-API-KEY": MODULE_API_KEY,
    },
  };

  try {
    let response = await axios.get(
      `https://api.modulenft.xyz/api/v2/eth/nft/collection?contractAddress=${req.params.id}`,
      config
    );
    res.status(200).json(response.data.data);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get("/resevoir/:id", async (req, res) => {
  let config = {
    headers: {
      "accept-encoding": "*",
      "x-api-key": RESEVOIR_API_KEY,
    },
  };
  try {
    let response = await axios.get(
      `https://api.reservoir.tools/collections/v5?contract=${req.params.id}&includeTopBid=false&normalizeRoyalties=false&sortBy=allTimeVolume&limit=20&x-api-key=${RESEVOIR_API_KEY}`,
      config
    );
    res.status(200).json({ data: response.data });
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
