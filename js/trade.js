let cash = 1000000;
let btc = 0;

function updateUI() {

    document.getElementById("cash").innerText =
        cash.toLocaleString();

    document.getElementById("btc").innerText =
        btc.toFixed(6);

    let price = prices[currentIndex];

    let total = cash + btc * price;

    document.getElementById("total").innerText =
        Math.floor(total).toLocaleString();
}

function buy() {

    let price = prices[currentIndex];

    let yen = Number(
        document.getElementById("tradeYen").value
    );

    if (yen > cash) return;

    let amount = yen / price;

    btc += amount;
    cash -= yen;

    buyPoints.push({
        index: currentIndex,
        price: price
    });

    updateUI();
    drawChart();
}

function sell() {

    let price = prices[currentIndex];

    let yen = Number(
        document.getElementById("tradeYen").value
    );

    let amount = yen / price;

    if (amount > btc) return;

    btc -= amount;
    cash += yen;

    sellPoints.push({
        index: currentIndex,
        price: price
    });

    updateUI();
    drawChart();
}
