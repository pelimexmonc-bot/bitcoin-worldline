let allData = {};       // { bitcoin: [...], toyota: [...], ... }
let btcData = [];       // 現在表示中の銘柄データ（chart.js・engine.jsと共有）
let currentSymbol = "bitcoin";
let viewRange = 100;

// 全銘柄のCSVを読み込む
function loadAll(){
    let promises = SYMBOLS.map(s =>
        fetch(s.file)
        .then(res => res.text())
        .then(csv => {
            const rows = csv.trim().split("\n");
            allData[s.id] = rows.map(r => {
                const parts = r.split(",");
                return { date: parts[0].trim(), price: Number(parts[1]) };
            });
        })
        .catch(() => {
            // CSVが見つからない場合は空配列
            allData[s.id] = [];
            console.warn(s.file + " が見つかりません");
        })
    );

    Promise.all(promises).then(() => {
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
    btcData = allData[id] || [];

    // チャートのBUY/SELLマーカーを銘柄ごとに管理
    buyPoints  = buyPointsMap[id]  || (buyPointsMap[id]  = []);
    sellPoints = sellPointsMap[id] || (sellPointsMap[id] = []);

    // 銘柄名の表示更新
    let sym = SYMBOLS.find(s => s.id === id);
    document.getElementById("symbolLabel").innerText = sym ? sym.label : id;

    // indexが新銘柄の範囲を超えていたらクランプ
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
    document.getElementById("price").innerText = day.price.toLocaleString();

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

    let found = btcData.findIndex(d =>
        d.date === input.replace(/-/g, "/") ||
        (() => {
            let t  = new Date(input);
            let d2 = new Date(d.date);
            return d2.getFullYear() === t.getFullYear() &&
                   d2.getMonth()    === t.getMonth()    &&
                   d2.getDate()     === t.getDate();
        })()
    );

    if(found !== -1){
        index = found;
        updateGame();
    } else {
        alert("Date not found");
    }
}


loadAll();
