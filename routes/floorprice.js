const express = require("express");
const router = express.Router();
const axios = require("axios");

const RESEVOIR_API_KEY = process.env.RESEVOIR_API_KEY;

router.post("/", (req, res) => {
  let config = {
    headers: {
      "accept-encoding": "*",
      "X-API-KEY": RESEVOIR_API_KEY,
    },
  };
  axios
    .get(
      `https://api.reservoir.tools/collections/sources/v1?collection=${req.body.address}`,
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
