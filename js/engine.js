// engine.js

let btcData = []

let index = 300

let displayRange = 200

let timer = null

let speed = 1



async function loadBTC() {

const res = await fetch("bitcoin.csv")

const text = await res.text()

const rows = text.split("\n")

for(let i=1;i<rows.length;i++){

const c = rows[i].split(",")

btcData.push({

date:c[0],
price:parseFloat(c[1])

})

}

initChart()

updateAll()

}



function step(){

index++

if(index >= btcData.length){

pause()

}

updateAll()

}



function play(){

if(timer) return

timer = setInterval(()=>{

for(let i=0;i<speed;i++) step()

},200)

}



function pause(){

clearInterval(timer)

timer = null

}



function setRange(r){

displayRange = r

updateAll()

}



function setSpeed(s){

speed = s

}



function updateAll(){

const start = Math.max(0,index-displayRange)

const end = index

updateChart(btcData,start,end,trades)

updateUI()

}



function currentPrice(){

return btcData[index].price

}



function currentDate(){

return btcData[index].date

}
