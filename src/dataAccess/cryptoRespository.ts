const { CryptoPrices } = require("../models/cryptoModel");
const { STOCK_LIMIT } = require("../config/config");

/**
 * insert multiple prices into collection 
 * @param priceJson 
 */
const insertPrices = async (priceArray: [JSON]) => {
    await CryptoPrices.insertMany(priceArray);
}

/**
 * find the top 20 prices of given name 
 * @param name  
 * @returns 
 */
const findPrices = async (name: String) => {
    return await CryptoPrices.aggregate([
        {
            $match: {
                name: name
            },
        },
        {
            $sort: {
                created_at: -1
            },
        },
        {
            $limit: STOCK_LIMIT
        },
        {
            $project: {
                _id: 0,
                name: 1,
                rate: 1,
            }
        }
    ])
}

/**
 * get all the names from db 
 * @returns 
 */
const findNames = async () => {
    const result: [{ _id: string }] = await CryptoPrices.aggregate([
        {
            $match: {
                name: {
                    $ne: null
                }
            }
        },
        {
            $group: {
                "_id": "$name",
            }
        }
    ]);
    return result.map((r: { _id: string }) => r._id);
}

module.exports = {
    insertPrices,
    findPrices,
    findNames,
}