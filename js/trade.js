let cash = 1000000;   // 初期資金（円）

// 銘柄ごとの保有量 { bitcoin: 0, toyota: 0, ... }
let holdings = {};

// 銘柄ごとのトレード履歴
let trades = {};

// 銘柄リスト定義
const SYMBOLS = [
    { id: "bitcoin",  label: "Bitcoin",  file: "data/bitcoin.csv"  },
    { id: "toyota",   label: "トヨタ",    file: "data/toyota.csv"   },
    { id: "softbank", label: "ソフトバンク", file: "data/softbank.csv" },
    { id: "nintendo", label: "任天堂",    file: "data/nintendo.csv" },
];

// 初期化
SYMBOLS.forEach(s => {
    holdings[s.id] = 0;
    trades[s.id]   = [];
});


function buy(){
    if(!btcData[index] || btcData[index].price <= 0) return;

    let price      = btcData[index].price;
    let amountYen  = Number(document.getElementById("tradeAmount").value);
    if(amountYen <= 0) return;

    if(amountYen > cash) amountYen = cash;

    let amountUnits = amountYen / price;

    holdings[currentSymbol] += amountUnits;
    cash -= amountYen;

    buyPoints.push({ index, price });
    trades[currentSymbol].push({
        type: "BUY", price, amount: amountUnits, date: btcData[index].date
    });

    updatePortfolio();
    updateChart();
}


function sell(){
    if(!btcData[index] || !btcData[index].price) return;

    let price     = btcData[index].price;
    let amountYen = Number(document.getElementById("tradeAmount").value);
    if(amountYen <= 0) return;

    let unitsToSell = amountYen / price;
    if(unitsToSell > holdings[currentSymbol]){
        unitsToSell = holdings[currentSymbol];
    }
    if(unitsToSell <= 0) return;

    holdings[currentSymbol] -= unitsToSell;
    cash += unitsToSell * price;

    sellPoints.push({ index, price });
    trades[currentSymbol].push({
        type: "SELL", price, amount: unitsToSell, date: btcData[index].date
    });

    updatePortfolio();
    updateChart();
}


function updatePortfolio(){
    // 全銘柄の保有評価額を合算
    let holdingsValue = 0;
    SYMBOLS.forEach(s => {
        let data = allData[s.id];
        if(!data || !data[index]) return;
        holdingsValue += holdings[s.id] * data[index].price;
    });

    let total = cash + holdingsValue;

    document.getElementById("cash").innerText  = Math.floor(cash).toLocaleString();
    document.getElementById("total").innerText = Math.floor(total).toLocaleString();

    // 保有一覧を更新
    let holdingsList = document.getElementById("holdingsList");
    holdingsList.innerHTML = "";
    SYMBOLS.forEach(s => {
        if(holdings[s.id] <= 0) return;
        let data = allData[s.id];
        let val  = data && data[index] ? Math.floor(holdings[s.id] * data[index].price) : 0;
        let el   = document.createElement("div");
        el.innerText = `${s.label}: ${holdings[s.id].toFixed(4)}口 (¥${val.toLocaleString()})`;
        holdingsList.appendChild(el);
    });
}
