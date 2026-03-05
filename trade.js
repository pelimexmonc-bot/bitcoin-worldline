let cash = 10000;
let btc = 0;

function buy(){

let price = btcData[index].price;

btc += cash/price;

cash = 0;

updatePortfolio();

}

function sell(){

let price = btcData[index].price;

cash += btc*price;

btc = 0;

updatePortfolio();

}

function updatePortfolio(){

let price = btcData[index].price;

let total = cash + btc*price;

document.getElementById("cash").innerText = cash.toFixed(2);

document.getElementById("btc").innerText = btc.toFixed(4);

document.getElementById("total").innerText = total.toFixed(2);

}
