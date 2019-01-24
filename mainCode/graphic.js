var gameover = 0;
//==游戏结束==//

//====//
//==显示剩余时间==//
var minutes = 3;
var seconds = 30;
//Update the count down every 1 second
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
function setGift() {
document.getElementById("demo_gift").innerHTML = gift;
}
setInterval("setGift()",100);
//====//

//==显示获得金钱==//
var money = 100;
function setMoney() {
  document.getElementById("demo_money").innerHTML = money;
}
setInterval("setMoney()",100);
//====//





//==canvas of tree==//

var canvas_tree = document.getElementById("tree");
var treeTx = canvas_tree.getContext("2d");

function Tree() {
  this.posX = randomNum(20,710);//0-730
	this.posY = randomNum(120,480);//100-500
//树的类型
	if(randomNum(1,10)>3){
	this.type = 0;
	}else{
		this.type = 1;
	}
	this.foisPour1 = 0;
	this.showOrNot = true;
	this.time = new Date().getTime();
	//window.alert(this.time);
  this.treeImg = new Image();
  this.drawTree = function () {
  	//window.alert(this.treeImg);
  	if(this.type == 0){
  		treeTx.drawImage(this.treeImg,295,200,55,100,this.posX,this.posY,60,110);
  	}else {
  		treeTx.drawImage(this.treeImg,295,290,57,100,this.posX,this.posY,60,110);
  	}
  };
  
  
  this.init = function () {
	//window.alert("init");
  this.treeImg.src = "../Resources/tree.png";
  this.treeImg.onload = this.drawTree();
  }
  
  /*
  this.cut = function(){
  	if(this.type == 0){
  		this.showOrNot = false;
  	}else{
  		this.showOrNot = false;
  	}
  }*/
  
}
function showTree()
{
	treeTx.clearRect(0, 0, 800, 600);

	//tree.drawTree();
	for (tree of treeList){
		if(tree.showOrNot){
      tree.drawTree();
		}
  }
  
}
function addTree(numberOfTree)
{
  for( let i = 0 ; i < numberOfTree ; i++)
  {
  	var tree = new Tree();
  	tree.init();
  	//setInterval("tree.cut();",10000);
  	treeList.push(tree);
  	if(tree.type == 0){
  		addDemon(1);
  	}else{
  		addDemon(2);
  	}
  }
}
function checkTime(){
	var timeNow = new Date().getTime();
	for (tree of treeList){
		if(tree.type == 0){
			if(timeNow - tree.time  > 20000){
				tree.showOrNot = false;
			}
		}else{
			if(timeNow - tree.time  > 10000){
				tree.showOrNot = false;
			}
		}
		}
}
var treeList = [];
var n = 0;
addTree(1);
setInterval("addTree(1);",10000)
setInterval("checkTime();",10);


setInterval("showTree();",10);




function isCollided_tree(santa, tree)
{

  var distanceX = Math.abs((santa.posX+santa.santaWidth/2)-(tree.posX+30));
  var distanceY = Math.abs((santa.posY+santa.santaHeight/2) -(tree.posY+55));
  var result = (distanceX < (santa.santaWidth+60)/2 /*- 25*/) &&
     (distanceY < (santa.santaHeight+110)/2/* - 25*/);
  if(result && tree.showOrNot) {
      audio.play();
      if(tree.type == 0){
      	gift -= 5;
      }else{
      	gift -= 10;
      }
      tree.showOrNot =false;
  }
  return result;
}
//tree.drawTree();
function treesCheckCollision(listT)
{
  for(tree of listT){
      if( isCollided_tree(santa,tree)) return true;
  }
  return false;
}
setInterval("treesCheckCollision(treeList)",10);
//====//


//==canvas of ball==//
var canvas_ball = document.getElementById("ball");
var ballTx = canvas_ball.getContext("2d");

function Ball() {
  this.posX = randomNum(20,710);//0-730
	this.posY = randomNum(120,480);//100-500
	this.showOrNot = true;
	this.time = new Date().getTime();
  this.ballImg = new Image();
  this.drawBall = function () {

  	ballTx.drawImage(this.ballImg,0,0,512,512,this.posX,this.posY,60,60);
  };
  this.init = function () {
      this.ballImg.src = "../Resources/ball.png";
      this.ballImg.onload = this.drawBall();
      }
}

function showBall()
{
	ballTx.clearRect(0, 0, 800, 600);

	//tree.drawTree();
	for (ball of ballList){
		if(ball.showOrNot){
      ball.drawBall();
		}
  }
  
}
function addBall()
{
  //for( let i = 0 ; i < numberOfBall ; i++)
  //{
  	var ball = new Ball();
  	ball.init();
  	//setInterval("tree.cut();",10000);
  	ballList.push(ball);
  //}
}
function checkTime_ball(){
	if(minutes == 2 && seconds == 30){
		addBall();
	}else if(minutes == 1 && seconds == 10){
		addBall();
	}
}
var ballList = [];
//addBall(1);
setInterval("checkTime_ball();",1000);
setInterval("showBall();",10);



function isCollided_ball(santa, ball)
{

  var distanceX = Math.abs((santa.posX+santa.santaWidth/2)-(ball.posX+30));
  var distanceY = Math.abs((santa.posY+santa.santaHeight/2) -(ball.posY+30));
  var result = (distanceX < (santa.santaWidth+60)/2 /*- 25*/) &&
     (distanceY < (santa.santaHeight+60)/2/* - 25*/);
  if(result && ball.showOrNot) {
      audio.play();
      changeSantaType_1(santa);
      setFlagToOne();
      ball.showOrNot =false;
      setTimeout("setFlagToZero();changeSantaType_2(santa);",15000)
  }
  return result;
}
//tree.drawTree();
function ballsCheckCollision(listB)
{
	console.log(santa.santaImg.src);
  for(ball of listB){
      if( isCollided_ball(santa,ball)) return true;
  }
  return false;
}
setInterval("ballsCheckCollision(ballList)",10);
//====//