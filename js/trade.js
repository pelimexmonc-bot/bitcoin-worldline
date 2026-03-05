let cash = 1000000;   // 初期資金 100万円
let btc = 0;

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
updateChart();

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
updateChart();

}

function updatePortfolio(){

if(!btcData[index]) return;

let price = btcData[index].price;

let total = cash + btc * price;

document.getElementById("cash").innerText =
Math.floor(cash).toLocaleString();

document.getElementById("btc").innerText =
btc.toFixed(6);

document.getElementById("total").innerText =
Math.floor(total).toLocaleString();

}
