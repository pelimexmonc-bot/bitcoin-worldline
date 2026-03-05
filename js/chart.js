const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");

let buyPoints = [];
let sellPoints = [];

function updateChart(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(!btcData || btcData.length === 0) return;

    // 表示範囲
    let start = Math.max(0, index - viewRange);
    let view = btcData.slice(start, index + 1);

    // 2点以上ないと線が引けない
    if(view.length < 2) return;

    let prices = view.map(d => d.price);

    let max = Math.max(...prices);
    let min = Math.min(...prices);

    // max === min のとき（価格が全部同じ）にゼロ除算を防ぐ
    let range = (max === min) ? 1 : (max - min);

    let w = canvas.width;
    let h = canvas.height;

    ctx.beginPath();

    view.forEach((d, i) => {
        let x = (i / (view.length - 1)) * w;
        let y = h - ((d.price - min) / range) * h;

        if(i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });

    ctx.strokeStyle = "#00ff88";
    ctx.lineWidth = 2;
    ctx.stroke();

    drawTrades(start, max, min, range, view.length);
}

function drawTrades(start, max, min, range, length){

    let w = canvas.width;
    let h = canvas.height;

    ctx.font = "12px Arial";

    buyPoints.forEach(t => {
        if(t.index < start) return;

        let i = t.index - start;
        let x = (i / (length - 1)) * w;
        let y = h - ((t.price - min) / range) * h;

        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "blue";
        ctx.fillText("B", x - 4, y - 10);
    });

    sellPoints.forEach(t => {
        if(t.index < start) return;

        let i = t.index - start;
        let x = (i / (length - 1)) * w;
        let y = h - ((t.price - min) / range) * h;

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "red";
        ctx.fillText("S", x - 4, y - 10);
    });
}
