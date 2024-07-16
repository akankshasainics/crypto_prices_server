require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose  = require("mongoose");
const app = express();
const {fetchCoinData} = require("./services/priceDataService");
const routeManager = require("./routes/route.manager");


app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);
routeManager(app);

// Define the database URL to connect to.
const mongoDB = "mongodb://127.0.0.1:27017/test";

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("connected to db");
}


// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json({
      status: false,
      code  : 500,
      error : `Can't find ${err.stack}`
  });
});

// 404 handler
app.use(function (req, res, next) {
  res.status(404).json({
      status: false,
      code  : 404,
      error : `Can't find ${req.originalUrl}`
  });
});



app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});

setInterval(fetchCoinData, 5000); //every 5 second


