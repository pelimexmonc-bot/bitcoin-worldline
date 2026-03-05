const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");

let buyPoints = [];
let sellPoints = [];

function updateChart(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    if(!btcData || btcData.length === 0) return;

    if(index <= 1) return;

    // 表示範囲
    let start = Math.max(0, index - viewRange);
    let view = btcData.slice(start, index + 1);

    let prices = view.map(d=>d.price);

    let max = Math.max(...prices);
    let min = Math.min(...prices);

    let w = canvas.width;
    let h = canvas.height;

    ctx.beginPath();

    view.forEach((d,i)=>{

        let x = (i/(view.length-1))*w;

        let y = h - ((d.price-min)/(max-min))*h;

        if(i===0) ctx.moveTo(x,y);
        else ctx.lineTo(x,y);

    });

    ctx.strokeStyle="#00ff88";
    ctx.lineWidth=2;
    ctx.stroke();

    drawTrades(start,max,min,view.length);
}

function drawTrades(start,max,min,length){

    let w=canvas.width;
    let h=canvas.height;

    ctx.font="12px Arial";

    buyPoints.forEach(t=>{

        if(t.index < start) return;

        let i = t.index-start;

        let x=(i/(length-1))*w;
        let y=h-((t.price-min)/(max-min))*h;

        ctx.fillStyle="blue";

        ctx.beginPath();
        ctx.arc(x,y,6,0,Math.PI*2);
        ctx.fill();

        ctx.fillText("B",x-4,y-10);

    });

    sellPoints.forEach(t=>{

        if(t.index < start) return;

        let i = t.index-start;

        let x=(i/(length-1))*w;
        let y=h-((t.price-min)/(max-min))*h;

        ctx.fillStyle="red";

        ctx.beginPath();
        ctx.arc(x,y,6,0,Math.PI*2);
        ctx.fill();

        ctx.fillText("S",x-4,y-10);

    });

}
