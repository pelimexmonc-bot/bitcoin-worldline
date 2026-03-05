let allData = {};       // { bitcoin: { "2020/1/1": 1000000, ... }, ... }
let allDataFilled = {}; // 前埋め済み { bitcoin: [ {date, price}, ... ] }
let btcData = [];       // 現在表示中（chart.js・engine.jsと共有）
let currentSymbol = "bitcoin";
let viewRange = 100;
let dateList = [];      // 全銘柄統合・ソート済み日付リスト

function parseDate(str){
    // "2020/1/5" → 比較可能な数値 20200105
    const p = str.split("/");
    return parseInt(p[0]) * 10000 + parseInt(p[1]) * 100 + parseInt(p[2]);
}

function loadAll(){
    let promises = SYMBOLS.map(s =>
        fetch(s.file)
        .then(res => res.text())
        .then(csv => {
            allData[s.id] = {};
            csv.trim().split("\n").forEach(r => {
                const parts = r.split(",");
                const date  = parts[0].trim().replace(/\r/g, "");
                const price = parseFloat(parts[1]);
                if(date && !isNaN(price)) allData[s.id][date] = price;
            });
        })
        .catch(() => { allData[s.id] = {}; })
    );

    Promise.all(promises).then(() => {
        // 全銘柄の日付を統合・数値ソート
        let allDates = new Set();
        SYMBOLS.forEach(s => Object.keys(allData[s.id]).forEach(d => allDates.add(d)));
        dateList = Array.from(allDates).sort((a, b) => parseDate(a) - parseDate(b));

        // 各銘柄を前埋めで補完
        SYMBOLS.forEach(s => {
            let last = 0;  // 上場前は0
            allDataFilled[s.id] = dateList.map(date => {
                if(allData[s.id][date] !== undefined){
                    last = allData[s.id][date];
                }
                return { date, price: last };
            });
        });

        setupSymbolSelector();
        setupSlider();
        switchSymbol("bitcoin");
        randomStart();
    });
}

function setupSymbolSelector(){
    const sel = document.getElementById("symbolSelect");
    sel.innerHTML = "";
    SYMBOLS.forEach(s => {
        let opt = document.createElement("option");
        opt.value       = s.id;
        opt.textContent = s.label;
        sel.appendChild(opt);
    });
    sel.addEventListener("change", () => switchSymbol(sel.value));
}

function switchSymbol(id){
    currentSymbol = id;
    btcData = allDataFilled[id] || [];

    buyPoints  = buyPointsMap[id]  || (buyPointsMap[id]  = []);
    sellPoints = sellPointsMap[id] || (sellPointsMap[id] = []);

    let sym = SYMBOLS.find(s => s.id === id);
    document.getElementById("symbolLabel").innerText = sym ? sym.label : id;

    if(index >= btcData.length) index = Math.max(0, btcData.length - 1);

    updateGame();
}

function setupSlider(){
    const slider = document.getElementById("rangeSlider");
    const label  = document.getElementById("rangeValue");
    if(!slider || !label) return;
    viewRange = parseInt(slider.value);
    label.innerText = slider.value;
    slider.addEventListener("input", () => {
        viewRange = parseInt(slider.value);
        label.innerText = slider.value;
        updateChart();
    });
}

function updateGame(){
    const day = btcData[index];
    if(!day) return;
    document.getElementById("date").innerText  = day.date;
    document.getElementById("price").innerText = day.price ? day.price.toLocaleString() : "0";
    updatePortfolio();
    updateChart();
}

function randomStart(){
    if(btcData.length === 0) return;
    index = Math.floor(Math.random() * btcData.length);
    updateGame();
}

function jumpToDate(){
    let input = document.getElementById("jumpDate").value;
    if(!input) return;
    let target = input.replace(/-/g, "/");
    // 完全一致 → なければ直近
    let found = dateList.findIndex(d => d === target);
    if(found === -1){
        let targetNum = parseDate(target);
        found = dateList.reduce((best, d, i) => {
            return Math.abs(parseDate(d) - targetNum) < Math.abs(parseDate(dateList[best]) - targetNum) ? i : best;
        }, 0);
    }
    index = found;
    updateGame();
}

loadAll();
