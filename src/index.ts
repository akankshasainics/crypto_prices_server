require('dotenv').config();
const cors = require("cors");
const http = require('http');
const WebSocket = require('ws');
const express = require("express");
const mongoose  = require("mongoose");
const routeManager = require("./routes/route.manager");
const {fetchCoinData} = require("./services/priceDataService");
const {findPrices} = require("./dataAccess/cryptoRespository")
const {MONGO_DB_STRING} = require("./config/config")
const PORT = process.env.port || 8000;
let selectedStock = null;
let socketConnection = null;

const app = express();
app.use(cors());
app.use(express.json());
routeManager(app);


//connect to db
mongoose.set("strictQuery", false);
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(MONGO_DB_STRING);
  console.log("connected to db");
}



const server = http.createServer(app).listen(PORT, () => {
  console.log('server is running on 8000')
});

// web socket connection
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
  socketConnection = ws;
  console.log('New client connected');

  ws.on('message', async (name) => {
    selectedStock = name.toString();
    const result = await findPrices(name.toString());
    ws.send(JSON.stringify(result));
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

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


export const sendUpdatedData = async() => {
  if(selectedStock != null && socketConnection != null)
    {
      const result = await findPrices(selectedStock);
      socketConnection.send(JSON.stringify(result));
    }
}

setInterval(function() {fetchCoinData(); sendUpdatedData()}, 5000);
