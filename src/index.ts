require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose  = require("mongoose");
const app = express();
const {fetchCoinData} = require("./services/priceDataService");


app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", false);

// Define the database URL to connect to.
//const mongoDB = "mongodb://127.0.0.1/my_database";

// Wait for database to connect, logging an error if there is a problem
// main().catch((err) => console.log(err));
// async function main() {
//   await mongoose.connect(mongoDB);
//   console.log("connected to db");
// }


app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});

setInterval(fetchCoinData, 5000); //every 5 second
