let index = 0;

let playing = false;

let speed = 200; // ミリ秒（再生速度）



function play(){

playing = true;

}



function pause(){

playing = false;

}



function tick(){

if(!playing) return;

if(!btcData || btcData.length === 0) return;



index++;



if(index >= btcData.length){

index = btcData.length - 1;

pause();

return;

}



updateGame();

}



setInterval(tick, speed);
