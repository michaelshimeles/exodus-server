const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

const PORT = process.env.PORT || 8080;
const RESEVOIR_API_KEY = process.env.RESEVOIR_API_KEY;
const MODULE_API_KEY = process.env.MODULE_API_KEY;


app.use(cors());
app.use(express.json());

// Sales Chart + Sales Card With Images
app.get("/sales/:id", (req, res) => {
    let config = {
      headers: {
        "accept-encoding": "*",
      },
    };
  
    axios
      .get(
        `https://api.reservoir.tools/sales/v4?includeTokenMetadata=true&collection=${req.params.id}&x-api-key=${RESEVOIR_API_KEY}`,
        config
      )
      .then((response) => {
        console.log(response.data);
  
        const salesData = response.data.sales.map((sale) => {
          return {
            name: sale.token.collection.name,
            tokenId: sale.token.tokenId,
            orderSource: sale.orderSource,
            image: sale.token.image,
            txHash: sale.txHash,
            timestamp: sale.timestamp,
            priceInEth: sale.price.amount.decimal,
            priceInUsd: sale.price.amount.usd,
            washTradingScore: sale.washTradingScore,
          };
        });
  
        console.log(salesData);
        res.status(200).send({ data: salesData, original: response.data });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).json(error);
      });
  });
  

app.listen(PORT, (_req, _res) => {
    console.log("Server is live");
  });
  