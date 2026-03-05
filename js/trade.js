let cash = 10000;

let btc = 0;

let trades = [];


function buy(){

if(!btcData[index]) return;

let price = btcData[index].price;

if(isNaN(price)) return;

if(cash <= 0) return;


let amount = cash / price;

btc += amount;

cash = 0;


trades.push({
type:"BUY",
index:index,
price:price,
btc:amount
});


updatePortfolio();

}


function sell(){

if(!btcData[index]) return;

let price = btcData[index].price;

if(isNaN(price)) return;

if(btc <= 0) return;


let value = btc * price;

cash += value;


trades.push({
type:"SELL",
index:index,
price:price,
btc:btc
});


btc = 0;

updatePortfolio();

}



function updatePortfolio(){

if(!btcData[index]) return;

let price = btcData[index].price;

if(isNaN(price)) return;


let total = cash + btc * price;


document.getElementById("cash").innerText =
cash.toFixed(2);

document.getElementById("btc").innerText =
btc.toFixed(4);

document.getElementById("total").innerText =
total.toFixed(2);

}
