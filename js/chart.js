// chart.js

let chart

function initChart() {

const ctx = document.getElementById("chart").getContext("2d")

chart = new Chart(ctx, {

type: "line",

data: {

labels: [],

datasets: [

{
label: "BTC",
data: [],
borderColor: "orange",
pointRadius: 0,
borderWidth: 2
},

{
label: "Trades",
data: [],
showLine: false,
pointRadius: 6
}

]

},

options: {

animation: false,

plugins:{
legend:{display:false}
},

scales:{
x:{display:false},
y:{ticks:{color:"#aaa"}}
}

}

})

}

function updateChart(data,start,end,trades) {

const view = data.slice(start,end)

chart.data.labels = view.map(v=>v.date)

chart.data.datasets[0].data = view.map(v=>v.price)

const markers = []

for(const t of trades){

if(t.index < start) continue
if(t.index > end) continue

markers.push({

x: data[t.index].date,
y: data[t.index].price

})

}

chart.data.datasets[1].data = markers

chart.update()

}
