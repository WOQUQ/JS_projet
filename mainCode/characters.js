/**
 * Definitions of objects appear in the scene
 */


/**
 * Some variables to be used
 */
// Canvas
var canva = document.getElementById("santa");
var ctx = canva.getContext("2d");

// Arrays of action and direction (Santa)
var actionSanteArray = [0, 70, 140];
var directionSanta = {
    "ArrowRight": 105,
    "ArrowLeft": 315,
    "ArrowUp": 0,
    "ArrowDown": 210
};

// Arrays of action and direction (Demon)
var actionDemonArray = [0, 32, 64];
var directionDemon = [
    0, //"down"
    32, // "left"
    64, // "right"
    96  // "up"
];

//Arrays of action and direction (Demon_player)
var actionDemonArray_player = [0, 32, 64];
var directionDemon_player = [
    0, //"down" s 
    32, // "left" a 
    64, // "right" d
    96  // "up" w
];


// audio
const audio = new sound("../Resources/sound.mp3");
const hohoho = new sound("../Resources/hohoho.mp3");
const laugh = new sound("../Resources/laugh.mp3");
const bgm1 = new sound("../Resources/wish u christmas.mp3");
const bgm2 = new sound("../Resources/wish u christmas.mp3");
/**
 *  Functions
 *
 */

// Sound
function sound(src)
{
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload","autos");
	this.sound.setAttribute("controls","none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function(){
		this.sound.play();
	}
	this.stop = function(){
		this.sound.pause();
	}
}



// Definition of the object Santa
function Santa()
{
    this.bgdLength = 600;
    this.bgdWidth = 800;
    this.sy = 210;
    this.sx = 70;
    this.santaWidth = 56;
    this.santaHeight = 48;
    this.i = 0;
    this.santaImg = new Image();

    // Function initialize the object
    this.init = function()
    {
        this.santaImg.src = "../Resources/santa.png";
        this.santaImg.onload = this.drawSanta();
        this.posX = 0;
        this.posY = 0;
        this.speed = 2;
        this.pace = 5;
    }

    // Function draw Santa
    this.drawSanta = function ()
    {
        ctx.drawImage(this.santaImg, this.sx, this.sy, 70, 100, this.posX, this.posY, this.santaWidth,
                this.santaHeight);
    }

    // Function change the position of Santa
    this.changePos = function(key)
    {
        this.sy = directionSanta[key];
        <!--Up-->
        if (this.sy == 0) {
            if (this.posY - this.speed * this.pace > 0)
                this.posY -= this.speed * this.pace;
        }
        <!--Right-->
        if (this.sy == 105) {
            if (this.posX + this.speed * this.pace < this.bgdWidth - this.santaHeight)
                this.posX += this.speed * this.pace;
        }
        <!--Down-->
        if (this.sy == 210) {
            if (this.posY + this.speed * this.pace < this.bgdLength - this.santaWidth)
                this.posY += this.speed * this.pace;
        }
        <!--Left-->
        if (this.sy == 315) {
            if (this.posX - this.speed * this.pace > 0)
                this.posX -= this.speed * this.pace;
        }

        if (this.i < 3) {
            this.sx = actionSanteArray[this.i];
            this.i++;
        } else if (this.i == 3) {
            this.sx = actionSanteArray[0];
            this.i = 1;
        }
    }

    // Function speed up the santa
    this.speedUp = function()
    {
        this.speed *=2;
    }
}


// Definition of the object Demon
function Demon()
{
    this.bgdLength = 600;
    this.bgdWidth = 800;
    this.demonWidth = 48;
    this.demonHeight = 32;
    this.demonImg = new Image();
    this.randomDirection = randomNum(0, 3);
    this.sy = directionDemon[this.randomDirection];
    this.sx = 0;
    this.i = 0;
    this.flag = 0;

    //draw demon in the canvas
    this.drawDemon = function () {
        ctx.drawImage(this.demonImg, this.sx, this.sy, 32, 32, this.posX, this.posY, this.demonWidth,
            this.demonHeight);
    };

    // initialize the object
    this.init = function()
    {
        this.demonImg.src = "../Resources/demon.png";
        this.demonImg.onload = this.drawDemon();
        this.speed = 1;
        this.pace = 3;
        this.posX = randomNum(0, 768);
        this.posY = randomNum(0, 568);
    }

    // speed up the demon
    this.speedUp = function()
    {
        this.speed = this.speed * 3;
    }
    this.speedToZero = function(){
    	this.speed  = 0;
    }
    this.speedToOne = function(){
    	this.speed = 1;
    }

    // change the position of demon
    this.changePos = function()
    {
        // change the move action of demon
        if (this.i < 3) {
            this.sx = actionDemonArray[this.i];
            this.i++;
        } else if (this.i == 3) {
            this.sx = actionDemonArray[0];
            this.i = 1;
        }

        // change direction 50% possibility
        if(randomNum(0,1) == 1)
        {
            if(new Date().getSeconds() % 4 == 0 ){
                this.randomDirection = randomNum(0,3);
            }
        }

        var moveDistance = 0;
        // Down
        if (this.randomDirection == 0) {
            this.sy = directionDemon[0];
            moveDistance = this.speed * this.pace;
            if(this.posY + moveDistance < this.bgdLength - this.demonWidth)
                this.posY += moveDistance;
            else{
                this.posY -= moveDistance;
            }
        }
        // Left
        if (this.randomDirection == 1) {
            this.sy = directionDemon[1];
            moveDistance = -1 * this.speed * this.pace;
            if(this.posX + moveDistance > 0)
                this.posX += moveDistance;
            else{
                this.posX -= moveDistance;
            }
        }
        // Right
        if (this.randomDirection == 2) {
            this.sy = directionDemon[2];
            moveDistance = this.speed * this.pace;
            if(this.posX + moveDistance < this.bgdWidth - this.demonHeight)
                this.posX += moveDistance;
            else
                this.posX -= moveDistance;
        }
        // Up
        if (this.randomDirection == 3) {
            this.sy = directionDemon[3];
            moveDistance = -1 * this.speed * this.pace;
            if(this.posY + moveDistance > 0 )
                this.posY += moveDistance;
            else{
                this.posY -= moveDistance;
            }
        }

    }
    this.changePos_player = function(key)
    {
    	var moveDistance = 0;
        // Down
        if (key == "down") {
        	//console.log("down");
            this.sy = directionDemon_player[0];
            moveDistance = this.speed * this.pace;
            if(this.posY + moveDistance < this.bgdLength - this.demonWidth)
                this.posY += moveDistance;
            else{
                this.posY -= moveDistance;
            }
        }
        // Left
        if (key == "left") {
        	//console.log("left");
            this.sy = directionDemon_player[1];
            moveDistance = -1 * this.speed * this.pace;
            if(this.posX + moveDistance > 0)
                this.posX += moveDistance;
            else{
                this.posX -= moveDistance;
            }
        }
        // Right
        if (key == "right") {
        	//console.log("right");
            this.sy = directionDemon_player[2];
            moveDistance = this.speed * this.pace;
            if(this.posX + moveDistance < this.bgdWidth - this.demonHeight)
                this.posX += moveDistance;
            else
                this.posX -= moveDistance;
        }
        // Up
        if (key == "up") {
        	//console.log("up");
            this.sy = directionDemon_player[3];
            moveDistance = -1 * this.speed * this.pace;
            if(this.posY + moveDistance > 0 )
                this.posY += moveDistance;
            else{
                this.posY -= moveDistance;
            }
        }

        
     // change the move action of demon
        if (this.i < 3) {
            this.sx = actionDemonArray[this.i];
            this.i++;
        } else if (this.i == 3) {
            this.sx = actionDemonArray[0];
            this.i = 1;
        }
    }
}

//draw all the objects in the canvas
function draw()
{
    ctx.clearRect(0, 0, 800, 600);

    santa.drawSanta();
    demon_player.drawDemon();
    for (demon of listDemon){
        demon.drawDemon();
    }
}

function addDemon(numberOfDemon)
{
    for( let i = 0 ; i < numberOfDemon ; i++)
    {
        var demon = new Demon();
        demon.init();
        listDemon.push(demon);
    }
}

// Function to change all the demons' position
function demonsChangePos()
{
    for (demon of listDemon){
         demon.changePos();
    }
}
function demonsCheckCollision(listD)
{
    for(demon of listD){
        if( isCollided(santa,demon)) return true;
    }
    return false;
}

// Listener of keyboard entry
document.onkeydown = function (e)
{


	/**
	 *     0, //"down" s 
    32, // "left" a 
    64, // "right" d
    96  // "up" w
	 *  w 87


 a 65


 s 83


 d 68
	 * @returns
	 */
	
	if(e.which == 68) 
		demon_player.changePos_player("right");
	if(e.which ==  65)
		demon_player.changePos_player("left");
	if(e.which ==  83) 
		demon_player.changePos_player("down");
	if(e.which ==  87)
		demon_player.changePos_player("up");
	


    if (directionSanta[e.key] === undefined) {
        return;
    }else{

    santa.changePos(e.key);
    }
    
    
    
    
}



function setFlagToZero(){
    for (demon of listDemon){
        demon.flag = 0 ;
    }
    demon_player.flag = 0;
}

function changeSantaType_1(santa){
	//console.log("Santa");

        santa.santaImg.src = "../Resources/santaWithBall.png";

    
}
function changeSantaType_2(santa){
	//console.log("Santa");
	santa.santaImg.src = "../Resources/santa.png";
    
}
function setFlagToOne(){
    for (demon of listDemon){
        demon.flag = 1 ;
    }
    demon_player.flag = 1;
}
function isCollided(santa, demon)
{

    var distanceX = Math.abs((santa.posX+santa.santaWidth/2)-(demon.posX+demon.demonWidth/2));
    var distanceY = Math.abs((santa.posY+santa.santaHeight/2) -(demon.posY+demon.demonHeight/2));

    var result = (distanceX < (santa.santaWidth+demon.demonWidth)/2 - 25) &&
       (distanceY < (santa.santaHeight+demon.demonHeight)/2 - 25);
    if(result) {
        
        if(demon.flag == 0){
        	laugh.play();
        	if(money > 0)
        		money -= 5;
        }
    }
    demon.flag = 1;
    return result;
}


/**
 * Code to execute
 */

// A list to store all the demons
var listDemon = [];
//var listDemon_player = [];
var santa = new Santa();
santa.init();
var demon_player = new Demon();
demon_player.init();
demon_player.posX = 750;
demon_player.posY = 550;
//listDemon_player.push(demon_player);
demon_player.demonImg.src = "../Resources/lutin_player.png";


// 2 demons in the first beginning
setInterval("draw()",10);
setInterval("demonsChangePos()",150);
setInterval("demonsCheckCollision(listDemon)",10);
setInterval("isCollided(santa, demon_player)",10);
setInterval("setFlagToZero()",200);

//setInterval("changePos_demon(demon_player)",10);