let cash        = 1000000;
let initialCash = 1000000;  // 損益計算用

// 銘柄ごとの保有量
let holdings = {};

// 銘柄ごとの取得原価合計（損益計算用）
let costBasis = {};

// 銘柄ごとのトレード履歴
let trades = {};

// 銘柄リスト定義
const SYMBOLS = [
    { id: "bitcoin",  label: "Bitcoin",   file: "data/bitcoin.csv"  },
    { id: "toyota",   label: "トヨタ",     file: "data/toyota.csv"   },
    { id: "softbank", label: "ソフトバンク", file: "data/softbank.csv" },
    { id: "nintendo", label: "任天堂",     file: "data/nintendo.csv" },
];

SYMBOLS.forEach(s => {
    holdings[s.id] = 0;
    costBasis[s.id] = 0;
    trades[s.id]   = [];
});


function buy(){
    if(!btcData[index] || btcData[index].price <= 0) return;

    let price      = btcData[index].price;
    let amountYen  = Number(document.getElementById("tradeAmount").value);
    if(amountYen <= 0) return;
    if(amountYen > cash) amountYen = cash;

    let amountUnits = amountYen / price;
    holdings[currentSymbol]  += amountUnits;
    costBasis[currentSymbol] += amountYen;
    cash -= amountYen;

    buyPoints.push({ index, price });
    trades[currentSymbol].push({ type:"BUY", price, amount:amountUnits, date:btcData[index].date });

    updatePortfolio();
    updateChart();
}


function sell(){
    if(!btcData[index] || btcData[index].price <= 0) return;

    let price     = btcData[index].price;
    let amountYen = Number(document.getElementById("tradeAmount").value);
    if(amountYen <= 0) return;

    let unitsToSell = amountYen / price;
    if(unitsToSell > holdings[currentSymbol]) unitsToSell = holdings[currentSymbol];
    if(unitsToSell <= 0) return;

    // 売った分だけ原価を減らす
    let ratio = unitsToSell / holdings[currentSymbol];
    costBasis[currentSymbol] -= costBasis[currentSymbol] * ratio;

    holdings[currentSymbol] -= unitsToSell;
    cash += unitsToSell * price;

    sellPoints.push({ index, price });
    trades[currentSymbol].push({ type:"SELL", price, amount:unitsToSell, date:btcData[index].date });

    updatePortfolio();
    updateChart();
}


function updatePortfolio(){
    let holdingsValue = 0;

    let holdingsList = document.getElementById("holdingsList");
    holdingsList.innerHTML = "";

    SYMBOLS.forEach(s => {
        // allDataFilledで現在価格を取得（indexで直接アクセス可能）
        let data  = allDataFilled[s.id];
        let price = (data && data[index]) ? data[index].price : 0;
        let val   = holdings[s.id] * price;
        holdingsValue += val;

        if(holdings[s.id] <= 0) return;

        // 損益計算
        let pnl      = val - costBasis[s.id];
        let pnlSign  = pnl >= 0 ? "+" : "";
        let pnlColor = pnl >= 0 ? "#00ff88" : "#ff4444";

        let el = document.createElement("div");
        el.innerHTML =
            `${s.label}: ${holdings[s.id].toFixed(4)}口 ` +
            `(¥${Math.floor(val).toLocaleString()}) ` +
            `<span style="color:${pnlColor}">${pnlSign}¥${Math.floor(pnl).toLocaleString()}</span>`;
        holdingsList.appendChild(el);
    });

    let total    = cash + holdingsValue;
    let totalPnl = total - initialCash;
    let pnlSign  = totalPnl >= 0 ? "+" : "";
    let pnlColor = totalPnl >= 0 ? "#00ff88" : "#ff4444";

    document.getElementById("cash").innerText  = Math.floor(cash).toLocaleString();
    document.getElementById("total").innerHTML =
        `${Math.floor(total).toLocaleString()} ` +
        `<span style="color:${pnlColor}">(${pnlSign}¥${Math.floor(totalPnl).toLocaleString()})</span>`;
}
