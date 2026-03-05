let chart = null;

function initChart(){

const ctx = document.getElementById("chart");

chart = new Chart(ctx,{

type:"line",

data:{
labels:[],
datasets:[{

label:"BTC",

data:[],

borderColor:"orange",
borderWidth:2,
pointRadius:0

}]

},

options:{

responsive:true,
maintainAspectRatio:false,

animation:false,

scales:{

x:{
ticks:{
maxTicksLimit:10
}
},

y:{
beginAtZero:false
}

}

}

});

}



function updateChart(){

if(!chart) return;

const start = Math.max(0,index-100);

const slice = btcData.slice(start,index+1);

const labels=[];
const prices=[];

slice.forEach(d=>{

if(!d) return;

if(!isNaN(d.price)){

labels.push(d.date);
prices.push(d.price);

}

});

chart.data.labels = labels;
chart.data.datasets[0].data = prices;

chart.update("none");

}
