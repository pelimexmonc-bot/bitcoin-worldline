let playing = false;
let index = 0;   // app.js・trade.jsと共有する現在位置

function play() {
    playing = true;
}

function pause() {
    playing = false;
}

function tick() {
    if (!playing) return;

    index++;

    if (index >= btcData.length) {
        pause();
        return;
    }

    updateGame();
}

setInterval(tick, 200);
