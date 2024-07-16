const express = require('express');
const router = express.Router();
const priceController = require("../controller/price.controller");


router.get('/',  priceController.getNames);
router.get('/:name', priceController.getCoinPrices);


module.exports = router;