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


/**
 *  Functions
 *
 */

// Definition of the object Santa
function Santa()
{
    this.bgdLength = 600;
    this.bgdWidth = 800;
    this.sy = 210;
    this.sx = 70;
    this.santaLength = 56;
    this.santaWidth = 48;
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
                this.santaLength);
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
            if (this.posX + this.speed * this.pace < this.bgdWidth - this.santaWidth)
                this.posX += this.speed * this.pace;
        }
        <!--Down-->
        if (this.sy == 210) {
            if (this.posY + this.speed * this.pace < this.bgdLength - this.santaLength)
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
    this.demonLength = 48;
    this.demonWidth = 32;
    this.demonImg = new Image();
    this.randomDirection = randomNum(0, 3);
    this.sy = directionDemon[this.randomDirection];
    this.sx = 0;
    this.i = 0;

    //draw demon in the canvas
    this.drawDemon = function () {
        ctx.drawImage(this.demonImg, this.sx, this.sy, 32, 32, this.posX, this.posY, this.demonWidth,
            this.demonLength);
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
            if(this.posY + moveDistance < this.bgdLength - this.demonLength)
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
            if(this.posX + moveDistance < this.bgdWidth - this.demonWidth)
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
}

//draw all the objects in the canvas
function draw()
{
    ctx.clearRect(0, 0, 800, 600);

    santa.drawSanta();

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

// Listener of keyboard entry
document.onkeydown = function (e)
{

    if (directionSanta[e.key] === undefined) {
        return;
    }
    santa.changePos(e.key);
}

function isCollided(santa, demon)
{
   var distanceX = Math.abs((santa.sx+santa.santaLength/2)-(demon.sx+demon.demonLength/2));
   var distanceY = Math.abs((santa.sy+santa.santaWidth/2) -(demon.sy+demon.demonWidth/2));

   var result = (distanceX < (santa.santaLength+demon.demonLength)/2) &&
       (distanceY < (santa.santaWidth+demon.demonWidth)/2);
   return result;
}


/**
 * Code to execute
 */

// A list to store all the demons
var listDemon = [];
var santa = new Santa();
santa.init();
function checkCollision()
{
    console.log("IsCollided : " + isCollided(santa,listDemon[0]));
}
// 2 demons in the first beginning
addDemon(5);
setInterval("draw()",10);
setInterval("demonsChangePos()",150);
setInterval("checkCollision()",100);