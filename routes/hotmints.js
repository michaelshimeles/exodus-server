const express = require("express");
const router = express.Router();
const axios = require("axios");

const NFT_GO_API = process.env.NFT_GO_API;

router.get("/", async (req, res) => {
  headers = {
    accept: "application/json",
    "X-API-KEY": NFT_GO_API,
  };

  try {
    let response = await axios.get(
      `https://data-api.nftgo.io/eth/v1/market/rank/top-mints/${req.query.time}?sort_by=mint_num&is_listed=false&asc=false&offset=0&limit=10`,
      {
        headers,
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
