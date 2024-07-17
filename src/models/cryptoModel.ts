const mongoose = require("mongoose");

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    capped: {
        size: 1048576*10, // 10MB size limit
    }
  };

const cryptoSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        rate: {
            type: Number,
            require: true
        }
    }, 
    schemaOptions)

const CryptoPrices = mongoose.model("crypto_price", cryptoSchema);
module.exports = {CryptoPrices};