const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

const PORT = process.env.PORT || 8080;
const RESEVOIR_API_KEY = process.env.RESEVOIR_API_KEY;
const MODULE_API_KEY = process.env.MODULE_API_KEY;


app.use(cors());
app.use(express.json());

app.listen(PORT, (_req, _res) => {
    console.log("Server is live");
  });
  