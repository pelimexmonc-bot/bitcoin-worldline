let chart = null;

function initChart(){

const ctx = document.getElementById("chart").getContext("2d");

chart = new Chart(ctx,{

type:"line",

data:{
labels:[],
datasets:[{

label:"BTC Price",
data:[],

borderColor:"orange",
backgroundColor:"rgba(255,165,0,0.15)",

borderWidth:2,
pointRadius:0,
tension:0.15

}]
},

options:{

responsive:true,
maintainAspectRatio:false,
animation:false,

plugins:{
legend:{
labels:{
color:"white"
}
}
},

scales:{

x:{
ticks:{
color:"#aaa",
maxTicksLimit:8
},
grid:{
color:"#333"
}
},

y:{
ticks:{
color:"#aaa"
},
grid:{
color:"#333"
}
}

}

}

});

}

function updateChart(){

if(!chart) return;
if(!btcData || btcData.length === 0) return;

const start = Math.max(0, index - 100);

const slice = btcData.slice(start, index + 1);

chart.data.labels = slice.map(d => d.date);
chart.data.datasets[0].data = slice.map(d => d.price);

chart.update();

}
