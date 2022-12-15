const express = require("express");
const router = express.Router();
const axios = require("axios");

const MODULE_API_KEY = process.env.MODULE_API_KEY;
router.get("/:id", (req, res) => {
  let config = {
    headers: {
      Accept: "application/json",
      "accept-encoding": "*",
      "X-API-KEY": MODULE_API_KEY,
    },
  };
  axios
    .get(
      `https://api.modulenft.xyz/api/v2/eth/nft/ownerDistribution?contractAddress=${req.params.id}`,
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
