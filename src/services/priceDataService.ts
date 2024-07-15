const {coins} = require('../config/config.json');


const fetchCoinData = async() => {
    const promises = [];
    for(var coin of coins){
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
    Promise.all(promises).then(results => {
      console.log(results);
    })

} 

module.exports = {
    fetchCoinData
}