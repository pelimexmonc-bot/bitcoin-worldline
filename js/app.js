loadBTC()

function updateUI(){

document.getElementById("date").innerText = currentDate()

document.getElementById("price").innerText =
currentPrice().toFixed(2)

document.getElementById("cash").innerText =
cash.toFixed(0)

document.getElementById("btc").innerText =
btc.toFixed(4)

document.getElementById("asset").innerText =
totalAsset().toFixed(0)

}



document.getElementById("play").onclick = play
document.getElementById("pause").onclick = pause

document.getElementById("buy").onclick = buy
document.getElementById("sell").onclick = sell



const slider = document.getElementById("rangeSlider")

slider.oninput = ()=>{

setRange(parseInt(slider.value))

}



document.getElementById("speed").onchange = (e)=>{

setSpeed(parseInt(e.target.value))

}
