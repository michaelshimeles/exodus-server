const express = require("express");
const router = express.Router();
const axios = require("axios");

const RESEVOIR_API_KEY = process.env.RESEVOIR_API_KEY;

router.get("/:id", async (req, res) => {
  let config = {
    headers: {
      "accept-encoding": "*",
      "x-api-key": RESEVOIR_API_KEY,
    },
  };
  try {
    let response = await axios.get(
      `https://api.reservoir.tools/orders/asks/v3?contracts=${req.params.id}&status=active&includePrivate=false&includeMetadata=true&sortBy=createdAt&limit=1000`,
      config
    );
    res.status(200).json({ data: response.data });
  } catch (error) {
    res.status(404).json(error);
  }
});

router.post("/time/:id", async (req, res) => {
  let config = {
    headers: {
      "accept-encoding": "*",
      "x-api-key": RESEVOIR_API_KEY,
    },
  };

  try {
    let response = await axios.get(
      `https://api.reservoir.tools/orders/asks/v4?contracts=${req.params.id}&status=active&includePrivate=false&includeCriteriaMetadata=${req.body.metadata}&includeRawData=false&startTimestamp=${req.body.start}&endTimestamp=${req.body.end}&normalizeRoyalties=false&sortBy=createdAt&limit=1000`,
      config
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get("/chart/:id", async (req, res) => {
  let config = {
    headers: {
      "accept-encoding": "*",
      "x-api-key": RESEVOIR_API_KEY,
    },
  };
  try {
    let response = await axios.get(
      `https://api.reservoir.tools/orders/asks/v3?contracts=${req.params.id}&status=active&includePrivate=false&includeMetadata=true&sortBy=price&limit=1000`,
      config
    );
    res.status(200).json({ data: response.data });
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
