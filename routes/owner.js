const express = require("express");
const router = express.Router();
const axios = require("axios");

const MODULE_API_KEY = process.env.MODULE_API_KEY;

const RESEVOIR_API_KEY = process.env.RESEVOIR_API_KEY;

router.get("/:id", async (req, res) => {
  let config = {
    headers: {
      Accept: "application/json",
      "accept-encoding": "*",
      "X-API-KEY": MODULE_API_KEY,
    },
  };

  try {
    let response = await axios.get(
      `https://api.modulenft.xyz/api/v2/eth/nft/ownerDistribution?contractAddress=${req.params.id}`,
      config
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get("/activity/:id", async (req, res) => {
  let config = {
    headers: {
      "accept-encoding": "*",
      "x-api-key": RESEVOIR_API_KEY,
    },
  };

  try {
    let response = await axios.get(
      `https://api.reservoir.tools/users/activity/v5?users=${req.params.id}&limit=20&sortBy=eventTimestamp&includeMetadata=true`,
      config
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
