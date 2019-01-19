// Canvas of santa
var canvas1 = document.getElementById("santa");
var ctx1 = canvas1.getContext("2d");
// Canvas of lutin
var canvas2 = document.getElementById("lutin");
var ctx2 = canvas2.getContext("2d");

function Characters() {
    this.bgdLength = 600;
    this.bgdWidth = 800;
    this.sy = 210;
    this.sx = 70;
    this.santaLength = 56;
    this.santaWidth = 48;
    this.i = 0;
    this.santaImg = new Image();
    this.drawSanta = function () {
        ctx1.drawImage(this.santaImg, this.sx, this.sy, 70, 100, this.posX, this.posY, this.santaWidth,
            this.santaLength);
    };

}

actionSanteArray = [0, 70, 140];
directionSanta = {
    "ArrowRight": 105,
    "ArrowLeft": 315,
    "ArrowUp": 0,
    "ArrowDown": 210
};

Characters.prototype.init = function () {
    this.santaImg.src = "../Resources/santa.png";
    this.santaImg.onload = this.drawSanta();
    this.posX = 0;
    this.posY = 0;
    this.speed = 2;
    this.pace = 5;
}

Characters.prototype.speedUp = function () {
    this.speed = this.speed * 2;
}
var santa = new Characters();
santa.init();

document.onkeydown = function (e) {
    if (directionSanta[e.key] === undefined) {
        return;
    }

    <!--Up-->
    if (santa.sy == 0) {
        if (santa.posY - santa.speed * santa.pace > 0)
            santa.posY -= santa.speed * santa.pace;
        else {

        }
    }
    <!--Right-->
    if (santa.sy == 105) {
        if (santa.posX + santa.speed * santa.pace < santa.bgdWidth - santa.santaWidth)
            santa.posX += santa.speed * santa.pace;
        else {

        }
    }
    <!--Down-->
    if (santa.sy == 210) {
        if (santa.posY + santa.speed * santa.pace < santa.bgdLength - santa.santaLength)
            santa.posY += santa.speed * santa.pace;
        else {

        }
    }
    <!--Left-->
    if (santa.sy == 315) {
        if (santa.posX - santa.speed * santa.pace > 0)
            santa.posX -= santa.speed * santa.pace;
        else {

        }
    }
    santa.sy = directionSanta[e.key];
    if (santa.i < 3) {
        santa.sx = actionSanteArray[santa.i];
        santa.i++;
    } else if (santa.i == 3) {
        santa.sx = actionSanteArray[0];
        santa.i = 1;
    }
    ctx1.clearRect(0, 0, 800, 600);
    santa.drawSanta();
}


function Demon() {
    this.bgdLength = 600;
    this.bgdWidth = 800;
    this.demonLength = 48;
    this.demonWidth = 32;
    this.i = 0;
    this.demonImg = new Image();
    this.randomDirection = randomNum(0, 3);
    this.sy = directionDemon[this.randomDirection];
    this.sx = 1;
    this.drawDemon = function () {
        ctx2.drawImage(this.demonImg, this.sx, this.sy, 32, 32, this.posX, this.posY, this.demonWidth,
            this.demonLength);
    };

}

Demon.prototype.init = function () {
    this.demonImg.src = "../Resources/demon.png";
    this.demonImg.onload = this.drawDemon();
    this.speed = 1;
    this.pace = 3;
    this.posX = randomNum(0, 768);
    this.posY = randomNum(0, 568);
}


var actionDemonArray = [0, 32, 64];
var directionDemon = [
    0, //"down"
    32, // "left"
    64, // "right"
    96  // "up"
];

Demon.prototype.speedUp = function () {
    this.speed = this.speed * 3;
}

Demon.prototype.move = function () {
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
    this.sx = actionDemonArray[this.i]
    if (this.i < 3) {
        this.sx = actionSanteArray[this.i];
        this.i++;
    } else if (this.i == 3) {
        this.sx = actionSanteArray[0];
        this.i = 1;
    }
    if(new Date().getSeconds() % 4 == 0 ){
        this.randomDirection = randomNum(0,3);
    }
    ctx2.clearRect(0, 0, 800, 600);

    this.drawDemon();
}


var demonList = [];
var demon = new Demon();
demon.init();
demonList[0] = demon;
setInterval("demon.move()",111);
function addDemon(){
    var demon = new Demon();
    demon.init();
    demonList.push(demon);
}

//==canvas of tree==//

/*var canvas_tree_1 = document.getElementById("tree_1");
var tree_1Tx = canvas_tree_1.getContext("2d");

function Tree_1() {
    //this.bgdLength = 600;
    //this.bgdWidth = 800;
    //this.treeLength = 500;
    //this.treeWidth = 500;
    this.treeImg = new Image();
    //this.sy = 0;
    //this.sx = 0;
    this.posX = 0;
    this.posY = 0;
    this.drawTree_1 = function () {
    	//window.alert(this.treeImg);
    	tree_1Tx.drawImage(this.treeImg,295,200,55,100,200,200,60,110);
    };
}
Tree_1.prototype.init = function () {
	//window.alert("init");
	this.posX = 200;//randomNum(0, 500);
    this.posY = 200;//randomNum(0, 700);
    this.treeImg.src = "../Resources/tree.png";
    this.treeImg.onload = this.drawTree_1;

    
}
var tree_1 = new Tree_1();
tree_1.init();
*/
function Tree(){
	this.posX = randomNum(0,730);//0-730
	this.posY = randomNum(100,500);//100-500
	if(randomNum(1,10)>3){
	this.type = 0;
	}else{
		this.type = 1;
	}
}
var nb = 1;

var tree = new Tree();
var treeList = [];
treeList[0] = tree;
var nbXList = [];
var nbYList = [];
var nb_cut = 0;
for(var i=0;i<50;i++){
	var tree = new Tree();
	treeList.push(tree);
}
var canvas_tree = document.getElementById("tree");
var treeTx = canvas_tree.getContext("2d");
var treeImg = new Image();
treeImg.src = "../Resources/tree.png";

treeImg.onload = function(){
	if(treeList[0].type == 1){
	treeTx.drawImage(treeImg,295,290,57,100,treeList[0].posX,treeList[0].posY,60,110);
	setTimeout("treeTx.clearRect(treeList[0].posX,treeList[0].posY,60, 110);",10000);
	}else{
		treeTx.drawImage(treeImg,295,200,55,100,treeList[0].posX,treeList[0].posY,60,110);
		setTimeout("treeTx.clearRect(treeList[0].posX,treeList[0].posY,60, 110);",20000);
	}
	
			setInterval('if(treeList[nb].type == 1){'
					+'treeTx.drawImage(treeImg,295,290,57,100,treeList[nb].posX,treeList[nb].posY,60,110);'
					+'nbXList.push(treeList[nb].posX);'
					+'nbYList.push(treeList[nb].posY);'
					+'setTimeout("treeTx.clearRect(nbXList[nb_cut],nbYList[nb_cut],60,110);nb_cut += 1;",10000);'

					+'}else{'
						+'treeTx.drawImage(treeImg,295,200,55,100,treeList[nb].posX,treeList[nb].posY,60,110);'
						+'nbXList.push(treeList[nb].posX);'
						+'nbYList.push(treeList[nb].posY);'
						+'setTimeout("treeTx.clearRect(nbXList[nb_cut],nbYList[nb_cut],60,110);nb_cut += 1",20000);}nb += 1;',10000);
		

}/*
function Tree(){
	this.posX = randomNum(0,730);//0-730
	this.posY = randomNum(100,500);//100-500
	this.type = 0;
}
var nb = 1;
var tree = new Tree();
var treeList = [];
treeList[0] = tree;

for(var i=0;i<50;i++){
	var tree = new Tree();
	treeList.push(tree);
}
var canvas_tree = document.getElementById("tree");
var treeTx = canvas_tree.getContext("2d");
var treeImg = new Image();
treeImg.src = "../Resources/tree.png";

treeImg.onload = function(){
	treeTx.drawImage(treeImg,295,290,57,100,treeList[0].posX,treeList[0].posY,60,110);
			setInterval('treeTx.drawImage(treeImg,295,200,55,100,treeList[nb].posX,treeList[nb].posY,60,110);nb += 1;'
					,10000);
		

}*/
/*
var counter = setInterval(function () {
	var tree = new Tree();
	treeList.push(tree);
	number_true += 1;
}, 10000);*/





//====//


