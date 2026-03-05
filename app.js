let btcData = [];

function loadCSV(){

fetch("bitcoin.csv")

.then(res=>res.text())

.then(csv=>{

const rows = csv.split("\n").slice(1);

btcData = rows.map(r=>{

const parts = r.split(",");

return{

date:parts[0],
price:parseFloat(parts[1])

};

});

initChart();

randomStart();

});

}

function updateGame(){

const day = btcData[index];

document.getElementById("date").innerText = day.date;

document.getElementById("price").innerText = day.price;

updatePortfolio();

if(index % 5 === 0){

updateChart();

}

}

function randomStart(){

index = Math.floor(Math.random()*btcData.length);

updateGame();

}

function jumpToDate(){

let input = document.getElementById("jumpDate").value;

let found = btcData.findIndex(d=>d.date===input);

if(found !== -1){

index = found;

updateGame();

}

}

loadCSV();
