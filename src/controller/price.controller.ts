const catchAsync = require("../utils/catchAsync");
const {findNames, findPrices} = require("../dataAccess/cryptoRespository");

/**
 * get Unique stock/coins name 
 */
const getNames = catchAsync(async (req: any, res: any) => {
    const result  = await findNames();
    res.send(result);
});

/**
 * get price list of given coin
 */
const getCoinPrices = catchAsync(async (req: any, res: any) => {
    const result  = await findPrices(req.params.name);
    res.send(result);
});

module.exports = {
    getNames,
    getCoinPrices
}
