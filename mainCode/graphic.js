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
var money = 100;
function setMoney() {
    document.getElementById("demo_money").innerHTML = money;
}
//====//

setInterval("setMoney()",100);

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
