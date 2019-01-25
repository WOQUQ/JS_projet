let questionAnswer = [["Is JQuery a library of Javascript: ","yes"],
					["In which tag of HTML we put the code Javascript: (without<>)","script"],
					["Name the best programing language in the world(Tip : Javas.....): ","javascript"]];

let correctCount = 0;
let ansewer;


function askQuestion(){
	var noUse = prompt("You lost, but We will give you one more chance to save your game, you will have 3 questions to answer, you will have to give 2 or more answers correct to save your game! <Enter to continue>");
	for (let i=0;i < questionAnswer.length; i++)
	{
		answer = prompt(questionAnswer[i][0]);
		if(answer.toLowerCase() == questionAnswer[i][1]){
			correctCount += 1;
		}
	}
}

let context = '';
function winOrLose(){
	
	let flag = -1;
	
	if(correctCount >= 2)
	{
		flag = 1;
		context += "You got " + correctCount + " question(s) correct so you have 50euros(1min) as bonus";
	}

	if(correctCount == 1 || correctCount == 0)
	{
		flag = 0;
		context += "Sorry, you gave 2 or more anwsers wrong, so you won't get the bonus money to continue";
		
	}
	context += " Enter to continue";
	var nothing = prompt(context);
	return flag;
}

