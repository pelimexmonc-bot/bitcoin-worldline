const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");

let buyPoints = [];
let sellPoints = [];

function drawChart() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!prices || prices.length === 0) return;
    if (currentIndex <= 1) return;

    let view = prices.slice(0, currentIndex + 1);

    let max = Math.max(...view);
    let min = Math.min(...view);

    if (max === min) return;

    let w = canvas.width;
    let h = canvas.height;

    ctx.beginPath();

    view.forEach((p, i) => {

        let x = (i / (view.length - 1)) * w;
        let y = h - ((p - min) / (max - min)) * h;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

    });

    ctx.strokeStyle = "#00ff88";
    ctx.lineWidth = 2;
    ctx.stroke();

    drawTrades(view, max, min);
}

function drawTrades(view, max, min) {

    let w = canvas.width;
    let h = canvas.height;

    ctx.font = "12px Arial";

    buyPoints.forEach(t => {

        if (t.index >= view.length) return;

        let x = (t.index / (view.length - 1)) * w;
        let y = h - ((t.price - min) / (max - min)) * h;

        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillText("B", x - 4, y - 10);
    });

    sellPoints.forEach(t => {

        if (t.index >= view.length) return;

        let x = (t.index / (view.length - 1)) * w;
        let y = h - ((t.price - min) / (max - min)) * h;

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillText("S", x - 4, y - 10);
    });
}
