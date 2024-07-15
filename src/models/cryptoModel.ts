import { timeStamp } from "console";

const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    rate: {
        type: Number,
        require: true
    }
}, {
    timeStamp: true
})

const CryptoPrices = mongoose.model("crypto_price", cryptoSchema);
module.exports = {CryptoPrices};