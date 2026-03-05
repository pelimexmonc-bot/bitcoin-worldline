let cash = 10000;

let btc = 0;

let trades = [];


function buy(){

if(!btcData[index]) return;

let price = btcData[index].price;

let amountYen = Number(document.getElementById("tradeAmount").value);

if(amountYen <= 0) return;

if(amountYen > cash) amountYen = cash;

let amountBTC = amountYen / price;

btc += amountBTC;

cash -= amountYen;

updatePortfolio();

}


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

let amountYen = Number(document.getElementById("tradeAmount").value);

if(amountYen <= 0) return;

let btcToSell = amountYen / price;

if(btcToSell > btc) btcToSell = btc;

btc -= btcToSell;

cash += btcToSell * price;

updatePortfolio();

}


btc = 0;

updatePortfolio();

}



function updatePortfolio(){

if(!btcData[index]) return;

let price = btcData[index].price;

if(isNaN(price)) return;


let total = cash + btc * price;


document.getElementById("cash").innerText =
cash.toLocaleString();

document.getElementById("btc").innerText =
btc.toFixed(4);

document.getElementById("total").innerText =
total.toLocaleString();

}
