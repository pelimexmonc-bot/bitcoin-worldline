let btcData = [];

function loadCSV(){

fetch("bitcoin.csv")
.then(res => res.text())
.then(csv => {

const rows = csv.split("\n")
.slice(1)
.filter(r => r.trim() !== "");

btcData = rows.map(r => {

const parts = r.split(",");

const date = parts[0]
.replace(/"/g,"")
.replace(/\//g,"-")
.trim();

const price = parseFloat(
parts[1]
.replace(/"/g,"")
.trim()
);

return {
date: date,
price: isNaN(price) ? 0 : price
};

});

initChart();
randomStart();

});

}

function updateGame(){

if(!btcData[index]) return;

const day = btcData[index];

document.getElementById("date").innerText = day.date;
document.getElementById("price").innerText = day.price.toFixed(2);

updatePortfolio();
updateChart();

}

function randomStart(){

index = Math.floor(Math.random() * (btcData.length - 300));

updateGame();

}

function jumpToDate(){

let input = document.getElementById("jumpDate").value;

let found = btcData.findIndex(d => d.date === input);

if(found !== -1){

index = found;
updateGame();

}

}

loadCSV();
