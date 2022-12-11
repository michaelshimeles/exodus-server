const express = require("express");
const router = express.Router();
const axios = require("axios");

const RESEVOIR_API_KEY = process.env.RESEVOIR_API_KEY;

router.get("/:id", (req, res) => {
  let config = {
    headers: {
      "accept-encoding": "*",
      "x-api-key": RESEVOIR_API_KEY,
    },
  };
  axios
    .get(
      `https://api.reservoir.tools/collections/daily-volumes/v1?id=${req.params.id}&limit=60`,
      config
    )
    .then((response) => {
      console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json(response.data);
    });
});

module.exports = router;
