
// Flag of game status
var gameover = 0;

// Time left variable
var minutes = 3;
var seconds = 30;

//==canvas of ball==//
var canvas_ball = document.getElementById("ball");
var ballTx = canvas_ball.getContext("2d");

//==canvas of tree==//
var canvas_tree = document.getElementById("tree");
var treeTx = canvas_tree.getContext("2d");

var chanceBonus = 1;

// Check if the game is over (win/lose)
function checkFin(){
	if(gameover == 1)
	{
		if(chanceBonus == 0)
		{
			var canvas_fin = document.getElementById("fin");
			var finTx = canvas_fin.getContext("2d");
			finTx.font = "50px Georgia"
			//finTx.fillStyle = "#FFFFFF";
			//finTx.fillRect(0, 0, 800, 600);
			var gradient=finTx.createLinearGradient(0,0,canvas_fin.width,0);
			gradient.addColorStop("0","magenta");
			gradient.addColorStop("0.5","blue");
			gradient.addColorStop("1.0","red");
			// 用渐变填色
			finTx.fillStyle=gradient;
			finTx.fillText("You lost with "+gift+" gifts remaining",50,200);
			setTimeout("window.alert('GAME OVER');location.reload();",100);
		}
		if (chanceBonus == 1){
			chanceBonus -=1;
			askQuestion();
			var result = winOrLose();
			if(result == 1){
				gameover = 0;
				if(money <= 0) money = 50;
				if(minutes == 0 && seconds <= 0) second +=59;
				santa.posX = 0;
				santa.posY = 0;
			}else{
				
			}
		}
	}
	else if(gameover == 2)
	{
		var canvas_fin = document.getElementById("fin");
		var finTx = canvas_fin.getContext("2d");
		finTx.font = "50px Georgia"
		var gradient=finTx.createLinearGradient(0,0,canvas_fin.width,0);
		gradient.addColorStop("0","magenta");
		gradient.addColorStop("0.5","blue");
		gradient.addColorStop("1.0","red");
		// 用渐变填色
		finTx.fillStyle=gradient;
		finTx.fillText("You won with "+money+" euros",120,200);
		setTimeout("window.alert('GAME OVER');location.reload();",100);
	}
}


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

//==显示剩余礼物==//
var gift = 100;
function setGift() {
document.getElementById("demo_gift").innerHTML = gift;
if(gift <=0){
	gameover = 2;
}
}

//==显示获得金钱==//
var money = 100;
function setMoney() {
  document.getElementById("demo_money").innerHTML = money;
  if(money <=0){
		gameover = 1;
	}
}


// Definition of the object tree
function Tree() 
{
	this.posX = randomNum(20,710);//0-730
	this.posY = randomNum(120,480);//100-500
	
	//Type of tree
	if(randomNum(1,10)>3)
	{
		this.type = 0;
	}
	else
	{
		this.type = 1;
	}
	this.showOrNot = true;
	this.time = new Date().getTime();

	this.treeImg = new Image();
	this.drawTree = function () {
	  	if(this.type == 0)
	  	{
	  		treeTx.drawImage(this.treeImg,295,200,55,100,this.posX,this.posY,60,110);
	  	}
	  	else
	  	{
	  		treeTx.drawImage(this.treeImg,295,290,57,100,this.posX,this.posY,60,110);
	  	}
	};
  
  
	this.init = function () {
		this.treeImg.src = "../Resources/tree.png";
		this.treeImg.onload = this.drawTree();
	}
}

// Show all the tree in the canvasTree
function showTree()
{
	treeTx.clearRect(0, 0, 800, 600);

	//tree.drawTree();
	for (tree of treeList){
		if(tree != null){
			tree.drawTree();
		}
  }
  
}

// add one/some trees in the listTree
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

// Set the time 10s/20s to erase the tree
function checkTime(){
	var timeNow = new Date().getTime();
	for (tree of treeList){
		if(tree.type == 0){
			if(timeNow - tree.time  > 20000){
				treeList.remove(tree);
			}
		}else if (tree.type == 1){
			if(timeNow - tree.time  > 10000){
				treeList.remove(tree);
			}
		}
		}
	if(minutes == 3 && seconds == 30){
		bgm1.stop();
		bgm1.play();
		
	}
	if(minutes == 1 && seconds == 42){
		bgm2.play();
	}
}

// Check single tree collision with santa
function isCollided_tree(santa, tree)
{

  var distanceX = Math.abs((santa.posX+santa.santaWidth/2)-(tree.posX+30));
  var distanceY = Math.abs((santa.posY+santa.santaHeight/2) -(tree.posY+55));
  var result = (distanceX < (santa.santaWidth+60)/2 -25  ) && (distanceY < (santa.santaHeight+110)/2  -25 );
  if(result && tree.showOrNot) {
      audio.play();
      if(tree.type == 0 && gift>0){
      	gift -= 5;
      }else {
    	  if(gift == 5){
    		  gift -=5;
    	  }else if(gift >10)
    		  gift -= 10;
      }
      treeList.remove(tree);
      hohoho.play();
  }
  return result;
}

// Check tree/trees collision event
function treesCheckCollision(listT)
{
  for(tree of listT){
      if( isCollided_tree(santa,tree)) return true;
  }
  return false;
}

// Definition of Ball Object
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

// Display all the balls in the ballList
function showBall()
{
	ballTx.clearRect(0, 0, 800, 600);

	for (ball of ballList){
		if(ball.showOrNot){
      ball.drawBall();
		}
  }
  
}

// Add a ball to ballList
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

// Set the time when ball show ip
function checkTime_ball(){
	if(minutes == 2 && seconds == 30){
		addBall();
	}else if(minutes == 1 && seconds == 10){
		addBall();
	}else if(minutes == 0 && seconds == 20){
		for (demon of listDemon){
	        demon.speedUp();
	    }
	}
}

// check ball collision
function isCollided_ball(santa, ball)
{
  var distanceX = Math.abs((santa.posX+santa.santaWidth/2)-(ball.posX+30));
  var distanceY = Math.abs((santa.posY+santa.santaHeight/2) -(ball.posY+30));
  var result = (distanceX < (santa.santaWidth+60)/2 /*- 25*/) && (distanceY < (santa.santaHeight+60)/2/* - 25*/);
  if(result && ball.showOrNot) {
      audio.play();
      changeSantaType_1(santa);
      setFlagToOne();
      
      ball.showOrNot =false;
      
      var startTime = new Date().getTime();
      var interval = setInterval(function(){
          if(new Date().getTime() - startTime > 15000){
              clearInterval(interval);
              return;
          }
          setFlagToOne();
          for (demon of listDemon){
  	        demon.speedToZero();
  	    }
      }, 100);
      
      setTimeout("setFlagToZero();changeSantaType_2(santa);for (demon of listDemon){demon.speedToOne();}",15000);
  }
  return result;
}

// check ball/balls and Santa collision
function ballsCheckCollision(listB)
{
	
  for(ball of listB){
      if( isCollided_ball(santa,ball)) return true;
  }
  return false;
}




var ballList = [];
var treeList = [];
var n = 0;
addTree(1);
setInterval("setGift();",100);
setInterval("setMoney();",100);
setInterval("treesCheckCollision(treeList)",1);
setInterval("addTree(1);",10000)
setInterval("checkTime();",10);
setInterval("showTree();",10);
setInterval("checkTime_ball();",1000);
setInterval("showBall();",10);
setInterval("ballsCheckCollision(ballList)",10);
setInterval("checkFin();",100);