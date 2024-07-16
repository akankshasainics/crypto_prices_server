const catchAsync = require("../utils/catchAsync");
const {findNames, findPrices} = require("../dataAccess/cryptoRespository");


const getNames = catchAsync(async (req, res) => {
    const result  = await findNames();
    res.send({result});
});

const getCoinPrices = catchAsync(async (req, res) => {
    const result  = await findPrices(req.params.name);
    res.send(result);
});

module.exports = {
    getNames,
    getCoinPrices
}
