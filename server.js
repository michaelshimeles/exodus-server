const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

const PORT = process.env.PORT || 8080;
const RESEVOIR_API_KEY = process.env.RESEVOIR_API_KEY;
const MODULE_API_KEY = process.env.MODULE_API_KEY;
const INTELLIGENCE_API_KEY = process.env.INTELLIGENCE_API_KEY;

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
      res.status(200).send(salesData);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json(error);
    });
});

// Listing Distribution Chart & Listings Card With Images
app.get("/listings/:id", (req, res) => {
  let config = {
    headers: {
      "accept-encoding": "*",
    },
  };
  axios
    .get(
      `https://api.reservoir.tools/orders/asks/v3?contracts=${req.params.id}&status=active&includePrivate=false&includeMetadata=true&x-api-key=${RESEVOIR_API_KEY}&sortBy=createdAt&limit=100`,
      config
    )
    .then((response) => {
      console.log(response.data);
      res.status(200).json({ data: response.data });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json(error);
    });
});

app.get("/info/resevoir/:id", (req, res) => {
  let config = {
    headers: {
      "accept-encoding": "*",
    },
  };
  axios
    .get(
      `https://api.reservoir.tools/collections/v5?contract=${req.params.id}&includeTopBid=false&normalizeRoyalties=false&sortBy=allTimeVolume&limit=20&x-api-key=${RESEVOIR_API_KEY}`,
      config
    )
    .then((response) => {
      console.log(response.data);
      res.status(200).json({ data: response.data });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json(error);
    });
});

app.get("/topcollections", (req, res) => {
  let config = {
    headers: {
      "accept-encoding": "*",
      "x-api-key": "c068dde1-dc4a-57d1-9432-da9e4872db73",
    },
  };

  axios
    .get(
      `https://api.reservoir.tools/collections/v5?includeTopBid=false&normalizeRoyalties=false&sortBy=7DayVolume&limit=10`,
      config
    )
    .then((response) => {
      console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json(error);
    });
});

// Collection Stats
app.get("/stats/:id", (req, res) => {
  let config = {
    headers: {
      "accept-encoding": "*",
      "X-API-KEY": MODULE_API_KEY,
    },
  };
  axios
    .get(
      `https://api.modulenft.xyz/api/v2/eth/nft/stats?contractAddress=${req.params.id}`,
      config
    )
    .then((response) => {
      console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json(error);
    });
});

// Collection Info
app.get("/info/:id", (req, res) => {
  let config = {
    headers: {
      "accept-encoding": "*",
      "X-API-KEY": MODULE_API_KEY,
    },
  };
  axios
    .get(
      `https://api.modulenft.xyz/api/v2/eth/nft/collection?contractAddress=${req.params.id}`,
      config
    )
    .then((response) => {
      console.log(response.data.dat);
      res.status(200).json(response.data.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json(error);
    });
});

// Sales Chart + Sales Card With Images
app.get("/sales/module/:id", (req, res) => {
  let config = {
    headers: {
      Accept: "application/json",
      "accept-encoding": "*",
      "X-API-KEY": MODULE_API_KEY,
    },
  };
  axios
    .get(
      `https://api.modulenft.xyz/api/v2/eth/nft/sales?count=100&offset=0&sortDirection=timeDesc&contractAddress=${req.params.id}&withMetadata=true"`,
      config
    )
    .then((response) => {
      console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json(error);
    });
});

// Holder distribution
app.get("/owner/:id", (req, res) => {
  let config = {
    headers: {
      Accept: "application/json",
      "accept-encoding": "*",
      "X-API-KEY": MODULE_API_KEY,
    },
  };
  axios
    .get(
      `https://api.modulenft.xyz/api/v2/eth/nft/ownerDistribution?contractAddress=${req.params.id}`,
      config
    )
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json(error);
    });
});

// Trader & Wallet Stats
app.get("/wallet/:id", (req, res) => {
  let config = {
    headers: {
      Accept: "application/json",
      "accept-encoding": "*",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImFkZHJlc3MiOiIweDY0Y2MxMTg5M2FmMzE1ODUwZjg4MmY2NzkwYzAzYzVhN2RhZDAxMTMifSwiaWF0IjoxNjYzODU5NjgzLCJleHAiOjE2OTUzOTU2ODN9.C2rVpPAm0sg7JIKj3tu8d-GH6AP0AaLqYNuBkpFIHYA",
    },
  };
  axios
    .get(`https://rutherford.5.dev/api/scores/${req.params.id}`, config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json(error);
    });
});

app.get("/portfolio/:id", (req, res) => {
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
      console.log(error);
      res.status(404).json(error);
    });
});

// Hot mints
app.post("/hotmints", (req, res) => {
  headers = {
    accept: "application/json",
    "X-API-KEY": "c8203386-2d6d-48ab-97b9-597df64c7756",
  };

  axios
    .get(
      `https://data-api.nftgo.io/eth/v1/market/rank/top-mints/${req.body.time}?sort_by=mint_num&is_listed=false&asc=false&offset=0&limit=10`,
      {
        headers,
      }
    )
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json(error);
    });
});

// Specific NFT collections owned by wallet
app.get("/collections/:id", (req, res) => {
  let config = {
    headers: {
      accept: "application/json",
      "accept-encoding": "*",
      Authorization: "8ebf2802-1b59-422d-bc73-bbb96d90e177",
    },
    params: {
      continuation:
        req.params.next
    },
  };

  axios
    .get(`https://api.nftport.xyz/v0/accounts/${req.params.id}`, config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json(error);
    });
});

app.post("/floorprice", (req, res) => {
  let config = {
    headers: {
      "accept-encoding": "*",
      "X-API-KEY": MODULE_API_KEY,
    },
  };
  axios
    .get(
      `https://api.modulenft.xyz/api/v2/eth/nft/floor?contractAddress=${req.body.address}`,
      config
    )
    .then((response) => {
      console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json(error);
    });
});

app.listen(PORT, (_req, _res) => {
  console.log("Server is live");
});
