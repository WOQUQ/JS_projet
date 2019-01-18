var gameover = 0;

//==显示剩余时间==//
var minutes = 3;
var seconds = 30;
// Update the count down every 1 second
var counter = setInterval(function () {
    if (seconds == 0 && minutes > 0 && gameover == 0) {
        seconds = 59;
        minutes -= 1;
        document.getElementById("demo").innerHTML = minutes + " m " + seconds + " s ";
    } else if (seconds > 0 && minutes >= 0 && gameover == 0) {
        seconds -= 1;
        document.getElementById("demo").innerHTML = minutes + " m " + seconds + " s ";
    } else if (gameover == 0) {
        clearInterval(counter);
        document.getElementById("demo").innerHTML = "Game Over";
        gameover = 1;
    }
}, 1000);


//====//


//==显示剩余礼物==//
var gift = 100;
document.getElementById("demo_gift").innerHTML = gift;
//====//

//==显示获得金钱==//
var money = 0;
document.getElementById("demo_money").innerHTML = money;
//====//

