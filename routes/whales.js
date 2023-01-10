const express = require("express");
const router = express.Router();
const axios = require("axios");

const TRANSPOSE_API = process.env.TRANSPOSE_API;

router.get("/:id", async (req, res) => {
  try {
    let response = await axios.post(
      "https://api.transpose.io/sql",
      {
        sql: `SELECT 
        owner_address, COUNT(*)
       FROM ethereum.nft_owners 
       WHERE contract_address = '${req.params.id}'
       GROUP BY
          owner_address
       ORDER BY
          COUNT(*) DESC
        LIMIT 10`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": TRANSPOSE_API,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
