const express = require("express");
const router = express.Router();
const axios = require("axios");

const RESEVOIR_API_KEY = process.env.RESEVOIR_API_KEY;
const MODULE_API_KEY = process.env.MODULE_API_KEY;
const FIVE_API_KEY = process.env.FIVE_API_KEY;
const ETH_SALES_API_KEY = process.env.ETH_SALES_API_KEY;
const TRANSPOSE_API = process.env.TRANSPOSE_API;
const NFT_GO_API = process.env.NFT_GO_API;
const NFT_PORT_API = process.env.NFT_PORT_API;

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
      `https://api.modulenft.xyz/api/v2/eth/nft/collectionsOwned?address=${req.params.id}&count=100&offset=0&type=all&withMetadata=true`,
      config
    )
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});

router.get("/grouped/:id", (req, res) => {
  let config = {
    headers: {
      "accept-encoding": "*",
      "x-api-key": RESEVOIR_API_KEY,
    },
  };
  axios
    .get(
      `https://api.reservoir.tools/users/${req.params.id}/collections/v2?includeTopBid=true&includeLiquidCount=true&limit=100`,
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

router.get("/wallet/:id", (req, res) => {
  let config = {
    headers: {
      Accept: "application/json",
      "accept-encoding": "*",
      Authorization: `Bearer ${FIVE_API_KEY}`,
    },
  };
  axios
    .get(`https://rutherford.5.dev/api/scores/${req.params.id}`, config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});

router.get("/collections/:id", (req, res) => {
  let config = {
    headers: {
      accept: "application/json",
      "accept-encoding": "*",
      Authorization: NFT_PORT_API,
    },
  };

  axios
    .get(
      `https://api.nftport.xyz/v0/accounts/${
        req.params.id
      }?chain=ethereum&continuation=${
        Object.keys(req.body).length === 0 ? "" : req.body.continuation
      }`,
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
