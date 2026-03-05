let index = 0;
let playing = false;

function play(){

playing = true;

}

function pause(){

playing = false;

}

function tick(){

if(!playing) return;

index++;

if(index >= btcData.length){

pause();
return;

}

updateGame();

}

setInterval(tick,200);
