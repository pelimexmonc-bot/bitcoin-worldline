const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");

// 銘柄ごとにBUY/SELLポイントを管理
let buyPointsMap  = {};
let sellPointsMap = {};
let buyPoints  = [];
let sellPoints = [];

const PADDING = { top: 20, right: 20, bottom: 40, left: 80 };

function updateChart(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(!btcData || btcData.length === 0) return;

    let start = Math.max(0, index - viewRange);
    let view  = btcData.slice(start, index + 1);
    if(view.length < 2) return;

    let prices = view.map(d => d.price);
    let max    = Math.max(...prices);
    let min    = Math.min(...prices);
    let range  = (max === min) ? 1 : (max - min);

    const W = canvas.width,  H = canvas.height;
    const pl = PADDING.left, pr = PADDING.right;
    const pt = PADDING.top,  pb = PADDING.bottom;
    const chartW = W - pl - pr;
    const chartH = H - pt - pb;

    const toX = i => pl + (i / (view.length - 1)) * chartW;
    const toY = p => pt + chartH - ((p - min) / range) * chartH;

    // 軸
    ctx.strokeStyle = "#888";
    ctx.lineWidth   = 1;
    ctx.beginPath();
    ctx.moveTo(pl, pt);
    ctx.lineTo(pl, pt + chartH);
    ctx.lineTo(pl + chartW, pt + chartH);
    ctx.stroke();

    // Y軸目盛り
    ctx.font      = "11px Arial";
    ctx.textAlign = "right";
    const ySteps  = 5;
    for(let i = 0; i <= ySteps; i++){
        let val = min + (range / ySteps) * i;
        let y   = toY(val);
        ctx.strokeStyle = "#333";
        ctx.beginPath();
        ctx.moveTo(pl, y);
        ctx.lineTo(pl + chartW, y);
        ctx.stroke();
        ctx.fillStyle = "#ccc";
        ctx.fillText("¥" + Math.round(val).toLocaleString(), pl - 6, y + 4);
    }

    // X軸目盛り
    ctx.textAlign  = "center";
    const xSteps   = 6;
    for(let i = 0; i <= xSteps; i++){
        let dataIdx = Math.round((i / xSteps) * (view.length - 1));
        let x       = toX(dataIdx);
        let label   = view[dataIdx] ? view[dataIdx].date : "";
        ctx.strokeStyle = "#333";
        ctx.beginPath();
        ctx.moveTo(x, pt + chartH);
        ctx.lineTo(x, pt + chartH + 5);
        ctx.stroke();
        ctx.fillStyle = "#ccc";
        ctx.fillText(label, x, pt + chartH + 18);
    }

    // 価格ライン
    ctx.beginPath();
    view.forEach((d, i) => {
        let x = toX(i), y = toY(d.price);
        if(i === 0) ctx.moveTo(x, y);
        else        ctx.lineTo(x, y);
    });
    ctx.strokeStyle = "#00ff88";
    ctx.lineWidth   = 2;
    ctx.stroke();

    drawTrades(start, view.length, toX, toY);
}

function drawTrades(start, length, toX, toY){
    ctx.font      = "12px Arial";
    ctx.textAlign = "center";

    buyPoints.forEach(t => {
        if(t.index < start) return;
        let x = toX(t.index - start);
        let y = toY(t.price);
        ctx.fillStyle = "#4488ff";
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText("B", x, y - 10);
    });

    sellPoints.forEach(t => {
        if(t.index < start) return;
        let x = toX(t.index - start);
        let y = toY(t.price);
        ctx.fillStyle = "#ff4444";
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText("S", x, y - 10);
    });
}
