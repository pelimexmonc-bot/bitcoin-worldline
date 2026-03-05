let cash = 1000000;
let btc = 0;

function updateUI(){

let price = prices[currentIndex];

document.getElementById("cash").innerText =
Math.floor(cash).toLocaleString();

document.getElementById("btc").innerText =
btc.toFixed(6);

let total = cash + btc * price;

document.getElementById("total").innerText =
Math.floor(total).toLocaleString();

}

function buy(){

let price = prices[currentIndex];

let yen = Number(
document.getElementById("tradeAmount").value
);

if(yen > cash){
alert("お金が足りません");
return;
}

let amount = yen / price;

btc += amount;
cash -= yen;

buyPoints.push({
index: currentIndex,
price: price
});

updateUI();
drawChart();

}

function sell(){

let price = prices[currentIndex];

let yen = Number(
document.getElementById("tradeAmount").value
);

let amount = yen / price;

if(amount > btc){
alert("BTCが足りません");
return;
}

btc -= amount;
cash += yen;

sellPoints.push({
index: currentIndex,
price: price
});

updateUI();
drawChart();

}
