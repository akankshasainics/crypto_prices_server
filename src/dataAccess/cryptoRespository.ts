const priceModel = require("../models/cryptoModel");

/**
 * insert multiple prices into collection 
 * @param priceJson 
 */
const insertPrices = async(priceJson: JSON) => {
    await priceModel.insertMany(priceJson);
}

/**
 * find the top 20 prices of given name 
 * @param name  
 * @returns 
 */
const findPrices = async(name: String) => {
    return await priceModel.aggreate([
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
            $limit: 20
        }
    ])
}

/**
 * get all the names from db 
 * @returns 
 */
const findNames = async() => {
    return await priceModel.aggreate([
        {
            $group: {
                _id: "$name",
                count: "$count"
            }
        }
    ])
}

module.exports = {
    insertPrices,
    findPrices,
    findNames,
}