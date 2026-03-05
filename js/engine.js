let index = 0;

let playing = false;

let speed = 1; // 再生速度


function play(){
playing = true;
}


function pause(){
playing = false;
}


function setSpeed(s){
speed = s;
}


function tick(){

if(!playing) return;

for(let i=0;i<speed;i++){

index++;

if(index >= btcData.length){

index = btcData.length - 1;

pause();

break;

}

}

updateGame();

}


setInterval(tick,200);
