let chart = null;

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
backgroundColor:"rgba(255,165,0,0.1)",

borderWidth:2,
pointRadius:0

}]
},

options:{

responsive:false,
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
ticks:{color:"#aaa"},
grid:{color:"#333"}
},

y:{
ticks:{color:"#aaa"},
grid:{color:"#333"}
}

}

}

});

}

function updateChart(){

if(!chart) return;

const start = Math.max(0,index-100);
const slice = btcData.slice(start,index+1);

chart.data.labels = slice.map(d=>d.date);
chart.data.datasets[0].data = slice.map(d=>d.price);

chart.update();

}
