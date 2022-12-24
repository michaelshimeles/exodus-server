const express = require("express");
const router = express.Router();
const axios = require("axios");

const RESEVOIR_API_KEY = process.env.RESEVOIR_API_KEY;
const MODULE_API_KEY = process.env.MODULE_API_KEY;
const FIVE_API_KEY = process.env.FIVE_API_KEY;
const NFT_PORT_API = process.env.NFT_PORT_API;

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
      `https://api.modulenft.xyz/api/v2/eth/nft/collectionsOwned?address=${req.params.id}&count=100&offset=0&type=all&withMetadata=true`,
      config
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get("/grouped/:id", async (req, res) => {
  let config = {
    headers: {
      "accept-encoding": "*",
      "x-api-key": RESEVOIR_API_KEY,
    },
  };
  try {
    let response = await axios.get(
      `https://api.reservoir.tools/users/${req.params.id}/collections/v2?includeTopBid=true&includeLiquidCount=true&limit=100`,
      config
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get("/wallet/:id", async (req, res) => {
  let config = {
    headers: {
      Accept: "application/json",
      "accept-encoding": "*",
      Authorization: `Bearer ${FIVE_API_KEY}`,
    },
  };

  try {
    let response = await axios.get(
      `https://rutherford.5.dev/api/scores/${req.params.id}`,
      config
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get("/collections/:id", async (req, res) => {
  let config = {
    headers: {
      accept: "application/json",
      "accept-encoding": "*",
      Authorization: NFT_PORT_API,
    },
  };

  try {
    let response = await axios.get(
      `https://api.nftport.xyz/v0/accounts/${
        req.params.id
      }?chain=ethereum&continuation=${
        Object.keys(req.query).length === 0 ? "" : req.query.continuation
      }`,
      config
    );
    console.log(req.query)
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
