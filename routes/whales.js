const express = require("express");
const router = express.Router();
const axios = require("axios");

const RESEVOIR_API_KEY = process.env.RESEVOIR_API_KEY;
const MODULE_API_KEY = process.env.MODULE_API_KEY;
const ETH_SALES_API_KEY = process.env.ETH_SALES_API_KEY;
const TRANSPOSE_API = process.env.TRANSPOSE_API;
const NFT_GO_API = process.env.NFT_GO_API;
const FIVE_API_KEY = process.env.FIVE_API_KEY;
const NFT_PORT_API = process.env.NFT_PORT_API;

router.get("/:id", (req, res) => {
  const params = {
    limit: 20,
    sortDirection: "SORT_DIRECTION_DESC",
  };
  const headers = { "x-api-key": ETH_SALES_API_KEY };
  axios
    .get(
      `https://ethereum.rest.mnemonichq.com/collections/v1beta1/current_owners/${req.params.id}`,
      {
        params,
        headers,
      }
    )
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});

module.exports = router;
