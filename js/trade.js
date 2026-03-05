// trade.js

let cash = 10000

let btc = 0

let trades = []



function buy(){

const price = currentPrice()

if(cash <= 0) return

const amount = cash / price

btc += amount

cash = 0

trades.push({

type:"buy",
index:index

})

updateAll()

}



function sell(){

const price = currentPrice()

if(btc <= 0) return

cash += btc * price

btc = 0

trades.push({

type:"sell",
index:index

})

updateAll()

}



function totalAsset(){

return cash + btc * currentPrice()

}
