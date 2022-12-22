const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT;

const listingsRouter = require("./routes/listings");
const salesRouter = require("./routes/sales");
const portfolioRouter = require("./routes/portfolio");
const searchRouter = require("./routes/search");
const gasRouter = require("./routes/gas");
const trendingRouter = require("./routes/trending");
const infoRouter = require("./routes/info");
const topCollectionsRouter = require("./routes/topcollections")
const hotMintsRouter = require("./routes/hotmints")
const floorPriceRouter = require("./routes/floorprice")
const statsRouter = require("./routes/stats")
const ownerRouter = require("./routes/owner")
const whalesRouter = require("./routes/whales")
const volumeRouter = require("./routes/volume")
const metricsRouter = require("./routes/metrics")

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("Welcome to the Exodus API");
});

app.use("/listings", listingsRouter);
app.use("/sales", salesRouter);
app.use("/portfolio", portfolioRouter);
app.use("/search", searchRouter);
app.use("/gas", gasRouter);
app.use("/trending", trendingRouter);
app.use("/info", infoRouter);
app.use("/topcollections", topCollectionsRouter)
app.use("/hotmints", hotMintsRouter)
app.use("/floorprice", floorPriceRouter)
app.use("/stats", statsRouter)
app.use("/owner", ownerRouter)
app.use("/whales", whalesRouter)
app.use("/volume", volumeRouter)
app.use("/metrics", metricsRouter)

app.listen(PORT, (_req, _res) => {
  console.log("Server is live");
});
