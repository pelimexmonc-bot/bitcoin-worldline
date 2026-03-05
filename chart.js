let chart;

function initChart(){

const ctx = document.getElementById("chart");

chart = new Chart(ctx,{

type:"line",

data:{
labels:[],
datasets:[{

label:"BTC Price",

data:[],
borderColor:"orange",

}]

},

options:{
animation:false
}

});

}

function updateChart(){

const start = Math.max(0,index-100);

const slice = btcData.slice(start,index);

chart.data.labels = slice.map(d=>d.date);
chart.data.datasets[0].data = slice.map(d=>d.price);

chart.update();

}
