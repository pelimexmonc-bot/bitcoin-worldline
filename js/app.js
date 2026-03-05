let allData = {};
let btcData = [];
let currentSymbol = "bitcoin";
let viewRange = 100;
let dateList = [];

function loadAll(){
    let promises = SYMBOLS.map(s =>
        fetch(s.file)
        .then(res => res.text())
        .then(csv => {
            allData[s.id] = {};
            csv.trim().split("\n").forEach(r => {
                const parts = r.split(",");
                allData[s.id][parts[0].trim()] = Number(parts[1]);
            });
        })
        .catch(() => { allData[s.id] = {}; })
    );

    Promise.all(promises).then(() => {
        // 全銘柄の日付を統合してソート
        let allDates = new Set();
        SYMBOLS.forEach(s => Object.keys(allData[s.id]).forEach(d => allDates.add(d)));
        dateList = Array.from(allDates).sort();

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
        opt.value = s.id;
        opt.textContent = s.label;
        sel.appendChild(opt);
    });
    sel.addEventListener("change", () => switchSymbol(sel.value));
}

function switchSymbol(id){
    currentSymbol = id;
    btcData = dateList.map(date => ({
        date,
        price: allData[id][date] || null
    }));

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
    document.getElementById("price").innerText = day.price ? day.price.toLocaleString() : "---";
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
    let found = dateList.findIndex(d => d === target);
    if(found !== -1){
        index = found;
        updateGame();
    } else {
        alert("Date not found");
    }
}

loadAll();
