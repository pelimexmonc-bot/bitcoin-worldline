let btcData = [];
let viewRange = 100;   // 表示する過去日数

function loadCSV(){

fetch("data/bitcoin.csv")

.then(res=>res.text())

.then(csv=>{

const rows = csv.trim().split("\n");

btcData = rows.map(r=>{

const parts = r.split(",");

return{
date: parts[0].trim(),
price: Number(parts[1])
};

});

initChart();
setupSlider();
randomStart();

});

}


function setupSlider(){

const slider = document.getElementById("rangeSlider");
const label = document.getElementById("rangeValue");

if(!slider || !label) return;

viewRange = parseInt(slider.value);
label.innerText = slider.value;

slider.addEventListener("input",()=>{

viewRange = parseInt(slider.value);
label.innerText = slider.value;

updateChart();

});

}


function updateGame(){

const day = btcData[index];

if(!day) return;

document.getElementById("date").innerText = day.date;
document.getElementById("price").innerText = day.price;

updatePortfolio();
updateChart();

}


function randomStart(){

index = Math.floor(Math.random()*btcData.length);

updateGame();

}


function jumpToDate(){

let input = document.getElementById("jumpDate").value;

if(!input) return;

// yyyy-mm-dd → Date
let target = new Date(input);

let found = btcData.findIndex(d=>{

let d2 = new Date(d.date);

return d2.getFullYear() === target.getFullYear() &&
       d2.getMonth() === target.getMonth() &&
       d2.getDate() === target.getDate();

});

if(found !== -1){

index = found;
updateGame();

}else{

alert("Date not found");

}

}


loadCSV();
