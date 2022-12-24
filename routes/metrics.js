const express = require("express");
const router = express.Router();
const axios = require("axios");

const NFT_GO_API = process.env.NFT_GO_API;

const URL = "https://data-api.nftgo.io/eth/v1/market/metrics";

router.get("/", async (_req, res) => {
  let config = {
    headers: {
      accept: "application/json",
      "X-API-KEY": NFT_GO_API,
    },
  };

  try {
    let response = await axios.get(`${URL}`, config);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
