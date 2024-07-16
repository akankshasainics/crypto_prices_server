const {COINS} = require("../config/config");
const {insertPrices} = require("../dataAccess/cryptoRespository");


const fetchCoinData = async() => {
    const promises = [];
    for(var coin of COINS){
        const promise = fetch(new Request("https://api.livecoinwatch.com/coins/single"), {
            method: "POST",
            headers: new Headers({
              "content-type": "application/json",
              "x-api-key": process.env.API_KEY,
            }),
            body: JSON.stringify({
              currency: "USD",
              code: coin,
              meta: true,
            }),
          }).then(response => response.json()); 
          promises.push(promise);
    }
    Promise.all(promises).then(async results => {
      await insertPrices(results);
    })
} 

module.exports = {
    fetchCoinData
}