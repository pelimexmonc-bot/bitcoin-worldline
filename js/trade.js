let cash = 1000000;   // 初期資金（円）
let btc = 0;

// トレード履歴
let trades = [];

function buy(){

if(!btcData[index]) return;

let price = btcData[index].price;

// 入力金額
let amountYen = Number(document.getElementById("tradeAmount").value);

if(amountYen <= 0) return;

// 現金以上は使えない
if(amountYen > cash){
amountYen = cash;
}

let amountBTC = amountYen / price;

btc += amountBTC;
cash -= amountYen;

// チャート表示用
buyPoints.push({
index:index,
price:price
});

// 履歴保存
trades.push({
type:"BUY",
price:price,
amount:amountBTC,
date:btcData[index].date
});

updatePortfolio();
updateChart();

}

function sell(){

if(!btcData[index]) return;

let price = btcData[index].price;

let amountYen = Number(document.getElementById("tradeAmount").value);

if(amountYen <= 0) return;

// 円 → BTC換算
let btcToSell = amountYen / price;

// 持っているBTC以上は売れない
if(btcToSell > btc){
btcToSell = btc;
}

btc -= btcToSell;
cash += btcToSell * price;

// チャート表示用
sellPoints.push({
index:index,
price:price
});

// 履歴保存
trades.push({
type:"SELL",
price:price,
amount:btcToSell,
date:btcData[index].date
});

updatePortfolio();
updateChart();

}

function updatePortfolio(){

if(!btcData[index]) return;

let price = btcData[index].price;

let total = cash + btc * price;

document.getElementById("cash").innerText = Math.floor(cash);
document.getElementById("btc").innerText = btc.toFixed(4);
document.getElementById("total").innerText = Math.floor(total);

}
