const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const { response } = require("express");
require("dotenv").config();

const PORT = process.env.PORT;
const RESEVOIR_API_KEY = process.env.RESEVOIR_API_KEY;
const MODULE_API_KEY = process.env.MODULE_API_KEY;
const FIVE_API_KEY = process.env.FIVE_API_KEY;
const ETH_SALES_API_KEY = process.env.ETH_SALES_API_KEY;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("Welcome");
});

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

      // console.log(salesData);
      res.status(200).send(salesData);
    })
    .catch((error) => {
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
      res.status(200).json({ data: response.data });
    })
    .catch((error) => {
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
      res.status(200).json({ data: response.data });
    })
    .catch((error) => {
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
      res.status(200).json(response.data);
    })
    .catch((error) => {
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
      res.status(200).json(response.data);
    })
    .catch((error) => {
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
      // console.log(response.data.dat);
      res.status(200).json(response.data.data);
    })
    .catch((error) => {
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
      res.status(200).json(response.data);
    })
    .catch((error) => {
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
      res.status(404).json(error);
    });
});

// Trader & Wallet Stats
app.get("/wallet/:id", (req, res) => {
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
      // console.log(response.data)
      res.status(200).json(response.data);
    })
    .catch((error) => {
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
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});

app.get("/topprofits", (req, res) => {
  axios
    .post(
      "https://api.transpose.io/sql",
      {
        sql: `SELECT collection_address AS "Collection Address",
        old_floor AS "Yesterday's Floor (ETH)",
        new_floor AS "Current Floor (ETH)",
        round(((new_floor - old_floor) / old_floor) * 100, 2) AS "Percent Change (%)"
FROM (
SELECT

(SELECT contract_address 
FROM ethereum.collections
WHERE contract_address = c.address) AS collection_address,

(SELECT percentile_disc(0.05)
WITHIN GROUP (ORDER BY eth_price) 
FROM ethereum.nft_sales 
WHERE contract_address = c.address 
AND timestamp >= NOW() - INTERVAL '2 DAY'
AND timestamp <= NOW() - INTERVAL '1 DAY') AS old_floor,

(SELECT percentile_disc(0.05)
WITHIN GROUP (ORDER BY eth_price) 
FROM ethereum.nft_sales 
WHERE contract_address = c.address 
AND timestamp >= NOW() - INTERVAL '1 DAY') AS new_floor

FROM 

(SELECT DISTINCT contract_address AS address
FROM ethereum.nft_sales
WHERE timestamp >= NOW() - INTERVAL '1 DAY') AS c
) as floors

WHERE new_floor IS NOT NULL
AND old_floor IS NOT NULL
AND old_floor >= 0.1 /* only floor prices >= 0.1 ETH, helps cut through the noise. */
ORDER BY "Percent Change (%)" DESC
LIMIT 10;`,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "7Fo04pRfiOW3JuaOitAEHq2EqwNsbVft",
        },
      }
    )
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});

app.get("/whales/:id", (req, res) => {
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

app.get("/gas", (req, res) => {
  let config = {
    headers: {
      accept: "application/json",
      "accept-encoding": "*",
    }
  }
  axios
    .get("https://etherchain.org/api/gasnow", config)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(404).json(error);
    });
});

app.get("/collections", (req, res) => {
  axios
    .post(
      "https://api-v2-6.gemlabs.xyz/collections",
      {
        sort: {
          "stats.one_day_volume": -1,
        },
        limit: 100,
        fields: {
          name: 1,
          symbol: 1,
          standard: 1,
          description: 1,
          address: 1,
          createdDate: 1,
          externalUrl: 1,
          imageUrl: 1,
          totalSupply: 1,
          sevenDayVolume: 1,
          oneDayVolume: 1,
          stats: 1,
          indexingStatus: 1,
          discordUrl: 1,
          revealPercentage: 1,
          instagramUsername: 1,
          isVerified: 1,
          lastNumberOfUpdates: 1,
          lastOpenSeaCancelledId: 1,
          lastOpenSeaSaleCreatedId: 1,
          slug: 1,
          lastOpenSeaTransferId: 1,
          lastRaribleAssetUpdateId: 1,
          mediumUsername: 1,
          telegramUrl: 1,
          twitterUsername: 1,
          updatedAt: 1,
          wikiUrl: 1,
        },
      },
      {
        headers: {
          authority: "api-v2-6.gemlabs.xyz",
          accept: "*/*",
          "accept-encoding": "*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json",
          origin: "https://www.gem.xyz",
          referer: "https://www.gem.xyz/",
          "sec-ch-ua":
            '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": '"Android"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "user-agent":
            "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36",
          "x-api-key": "rLnNH1tdrT09EQjGsjrSS7V3uGonfZLW",
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      res.status(200).json(response.data)
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json(response.data)
    });
});

app.listen(PORT, (_req, _res) => {
  console.log("Server is live");
});
