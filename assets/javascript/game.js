$(document).ready(function(){

	var count; //used to call on the index of questions
	var correct; //used to store number of correct answers
	var incorrect; // ^ for incorrect answers
	var unanswered; // ^^ for unanswered questions
	var timer; //starts timer
	var countDown; // used to start/stop interval
	var questions = [
						{
						"question":"this is question 1",
						"answer":2,
						"choices":["a","b","c","d"],
						"graphic":"source",
						},
						{
						"question":"this is question 2",
						"answer":0,
						"choices": ["a","b","c","d"],
						"graphic":"source",
						},

					];

	function reset(){
		count = 0;
		correct = 0;
		incorrect = 0;
		unanswered = 0;
	}

	function startPage(){

		var startButton = $("<button>");
		startButton.addClass("startButton");
		startButton.html("Let's get goin'!");
		startButton.on("click", function(){
			console.log("yeehaw!");
			reset();
			nextQuestion();
		});

		$(".gameplay").html(startButton);
	}

	//displays the next question in an array;
	function nextQuestion(){
		$(".gameplay").empty();
		//initialize timer to 30 secs
		timer = 15;
		//dynamically create a new div to timer.
		var timerDiv = $("<div>");
		timerDiv.attr("id", "timer");
		timerDiv.html("Time Left: " + timer + " seconds");
		$(".gameplay").html(timerDiv);
		timerSet();
		countDown = setInterval(timerSet, 1000);
	};

	//timerSet 
	function timerSet(){
		var timerDiv = $("<div>");
		timerDiv.attr("id", "timer");
		timerDiv.html("Time Left: " + timer + " seconds");
		$(".gameplay").html(timerDiv);

		var questionDiv = $("<div>");
		questionDiv.attr("id", "questions");
		questionDiv.html(questions[count].question);
		$(".gameplay").append(questionDiv);

		var answerDiv = $("<div>");
		answerDiv.attr("id", "answers");
		var answerChoices = questions[count].choices;
		for (var i = 0; i < answerChoices.length; i++);
			var buttonDiv = $("<div>");
			var answerButton = $("<button>");
			answerButton.addClass("answerButton");
			answerButton.html(answerChoices[i]);
			

		if (timer === 0){
			clearInterval(countDown);
			timeIsUp();
		}		
		timer -= 1;
	}

	function timeIsUp(){
		console.log("time is up");
		var whatHappened = $("<div>");
		whatHappened.attr("id", "result");
		whatHappened.html("Sorry, Bud! Y'ere mighty slow.");
		$(".gameplay").append(whatHappened);
		var answer = questions[count].choices[questions[count].answer];
		
		var correctAnswer = $("<div>");
		correctAnswer.attr("id", "answer");
		correctAnswer.html("The correct answer is: " + answer);

		$(".gameplay").append(correctAnswer);
		unanswered++;
		count++;

		if (count === questions.length){
			showResults();
		}
		setTimeout(nextQuestion,1000*10);

	}


	startPage();

});