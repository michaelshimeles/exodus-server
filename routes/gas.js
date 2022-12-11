const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  let config = {
    headers: {
      accept: "application/json",
      "accept-encoding": "*",
    },
  };
  axios
    .get("https://etherchain.org/api/gasnow", config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});

module.exports = router;
