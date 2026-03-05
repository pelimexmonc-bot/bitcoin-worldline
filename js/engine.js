let playing = false;
let currentIndex = 0;

function play() {
    playing = true;
}

function pause() {
    playing = false;
}

function tick() {

    if (!playing) return;

    currentIndex++;

    if (currentIndex >= prices.length) {
        pause();
        return;
    }

    updateUI();
    drawChart();
}

setInterval(tick, 200);
