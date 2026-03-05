let chart = null;

let viewRange = 120;

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

const start = Math.max(0,index-viewRange);

const slice = btcData.slice(start,index+1);

const labels=[];
const prices=[];

slice.forEach(d=>{
labels.push(d.date);
prices.push(d.price);
});


chart.data.labels = labels;
chart.data.datasets[0].data = prices;

/* 売買マーカー */

const buyPoints=[];
const sellPoints=[];

trades.forEach(t=>{

if(t.index < start || t.index > index) return;

let pos = t.index - start;

if(t.type==="BUY"){

buyPoints.push({
x:labels[pos],
y:t.price
});

}

if(t.type==="SELL"){

sellPoints.push({
x:labels[pos],
y:t.price
});

}

});

chart.data.datasets[1]={
type:"scatter",
label:"BUY",
data:buyPoints,
pointBackgroundColor:"green",
pointRadius:6
};

chart.data.datasets[2]={
type:"scatter",
label:"SELL",
data:sellPoints,
pointBackgroundColor:"red",
pointRadius:6
};

chart.update("none");

}
