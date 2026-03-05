let btcData = [];

function loadCSV(){

fetch("data/bitcoin.csv")

.then(res=>res.text())

.then(csv=>{

const rows = csv.trim().split("\n");

btcData = rows.map(r=>{

const parts = r.split("\t");

return{
date:parts[0],
price:Number(parts[1])
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


label.innerText = slider.value;

viewRange = parseInt(slider.value);


slider.addEventListener("input",()=>{

viewRange = parseInt(slider.value);

label.innerText = slider.value;

updateChart();

});

}



function updateGame(){

const day = btcData[index];

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

let target = new Date(input);

let found = btcData.findIndex(d=>{
return new Date(d.date).toDateString() === target.toDateString();
});

if(found !== -1){

index = found;

updateGame();

}else{

alert("Date not found");

}

}



loadCSV();
