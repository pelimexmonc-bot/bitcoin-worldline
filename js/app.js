let btcData=[]
let index=200

let cash=10000
let btc=0

let displayRange=200

let timer=null

let speed=1

let trades=[]



async function loadData(){

const res=await fetch("btc.csv")
const text=await res.text()

const rows=text.split("\n")

for(let i=1;i<rows.length;i++){

const c=rows[i].split(",")

btcData.push({

date:c[0],
price:parseFloat(c[1])

})

}

initChart()

update()

}

loadData()


const ctx=document.getElementById("chart").getContext("2d")

let chart

function initChart(){

chart=new Chart(ctx,{

type:"line",

data:{
labels:[],
datasets:[

{
label:"BTC",
data:[],
borderColor:"orange",
pointRadius:0
}

]

},

options:{
animation:false,
scales:{
x:{display:false}
}
}

})

update()

}


function update(){

const start=Math.max(0,index-displayRange)
const end=index

const view=btcData.slice(start,end)

chart.data.labels=view.map(v=>v.date)
chart.data.datasets[0].data=view.map(v=>v.price)

chart.update()

const d=btcData[index]

document.getElementById("date").innerText=d.date
document.getElementById("price").innerText=d.price.toFixed(2)

document.getElementById("cash").innerText=cash.toFixed(0)
document.getElementById("btc").innerText=btc.toFixed(4)

const asset=cash+btc*d.price

document.getElementById("asset").innerText=asset.toFixed(0)

drawTrades()

}


function drawTrades(){

const markers=[]

for(let t of trades){

if(t.index<index-displayRange)continue
if(t.index>index)continue

markers.push({

x:btcData[t.index].date,
y:btcData[t.index].price

})

}

}


function step(){

index+=1

if(index>=btcData.length){

pause()

}

update()

}



function play(){

if(timer)return

timer=setInterval(()=>{

for(let i=0;i<speed;i++)step()

},200)

}

function pause(){

clearInterval(timer)
timer=null

}



document.getElementById("play").onclick=play
document.getElementById("pause").onclick=pause



document.getElementById("buy").onclick=()=>{

const price=btcData[index].price

const amount=cash/price

btc+=amount
cash=0

trades.push({

type:"buy",
index:index

})

update()

}


document.getElementById("sell").onclick=()=>{

const price=btcData[index].price

cash+=btc*price
btc=0

trades.push({

type:"sell",
index:index

})

update()

}



const slider=document.getElementById("rangeSlider")
const label=document.getElementById("rangeLabel")

slider.oninput=()=>{

displayRange=parseInt(slider.value)

label.innerText=displayRange

update()

}



document.getElementById("speed").onchange=(e)=>{

speed=parseInt(e.target.value)

}
