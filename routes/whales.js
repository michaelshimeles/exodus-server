const express = require("express");
const router = express.Router();
const axios = require("axios");

const ETH_SALES_API_KEY = process.env.ETH_SALES_API_KEY;

router.get("/:id", async (_req, res) => {
  const params = {
    limit: 20,
    sortDirection: "SORT_DIRECTION_DESC",
  };
  const headers = { "x-api-key": ETH_SALES_API_KEY };

  try {
    let response = await axios.get(
      `https://ethereum.rest.mnemonichq.com/collections/v1beta1/current_owners/${req.params.id}`,
      {
        params,
        headers,
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
