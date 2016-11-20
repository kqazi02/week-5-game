$(document).ready(function(){

	var count; //used to call on the index of questions
	var correct; //used to store number of correct answers
	var incorrect; // ^ for incorrect answers
	var unanswered; // ^^ for unanswered questions
	var timer; //starts timer
	var countDown; // used to start/stop interval
	var questions = [
						{
						"question":"How many different flags have flown over Texas?",
						"answer":3,
						"choices":[
									"Three",
									"Four",
									"Five",
									"Six"
									],

						"graphic":"source",
						},

						{
						"question":"Where was the first major oil well in Texas located?",
						"answer":1,
						"choices": [
									"Dallas",
									"Spindletop",
									"Gulf of Mexico",
									"Waco"
									],
						"graphic":"source",
						},

						{
						"question":"What is Juneteenth?",
						"answer":2,
						"choices": [
									"Texas Independence Day",
									"Nothing; it doesn't exist",
									"A day to commemorate the announcement of the Emancipation Proclamation in Texas",
									"Another term for Father's day"
									],
						"graphic":"source",
						},

						{
						"question":"The Stars at night, are big and bright",
						"answer":1,
						"choices": [
									"At the end of the prairie",
									"Deep in the heart of Texas",
									"Not sure. Too much light pollution",
									"During the rush hour"
									],
						"graphic":"source",
						},

						{
						"question":"Where was the first major oil well in Texas located?",
						"answer":0,
						"choices": [
									"Dallas",
									"Spindletop",
									"Gulf of Mexico",
									"Waco"
									],
						"graphic":"source",
						},

					];

	var timerDiv = $("<div>");
	timerDiv.attr("id", "timer");
	timerDiv.html("Time Left: ");
	
	var timeSpan = $("<span>");

	var answerDiv = $("<div>");
	answerDiv.attr("id", "answers");

	var showScreen = 10; // specifies how long to show the answer screen


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
			reset();
			nextQuestion();
		});

		$(".gameplay").html(startButton);
	}

	//displays the next question in an array;
	function nextQuestion(){
		$(".gameplay").empty();

		if (count === questions.length){
			showResults();
		}

		else{
			//initialize timer to 30 secs
			timer = 30;
			//dynamically create a new div to timer.
			// var timerDiv = $("<div>");
			// timerDiv.attr("id", "timer");
			timerDiv.html("Time Left: ");
			timeSpan.html(timer + "seconds");
			timerDiv.append(timeSpan);
			$(".gameplay").html(timerDiv);
			timerSet();
			countDown = setInterval(timerSet, 1000);

			var questionDiv = $("<div>");
			questionDiv.attr("id", "questions");
			questionDiv.html(questions[count].question);
			$(".gameplay").append(questionDiv);

			var answerChoices = questions[count].choices;
			for (var i = 0; i < answerChoices.length; i++){
				var buttonDiv = $("<div>");
				var answerButton = $("<button>");
				answerButton.addClass("answerButton");
				answerButton.val(answerChoices[i]);
				answerButton.html(answerChoices[i]);
				buttonDiv.html(answerButton);
				answerDiv.append(buttonDiv);
			}

			$(".gameplay").append(answerDiv);

			$(".answerButton").on("click", function(){

				var userInput = $(this).val();
				console.log(userInput);
				var answer = questions[count].choices[questions[count].answer];
				console.log(answer);
				clearInterval(countDown);
				answerDiv.empty();

				if (userInput === answer){
					rightAnswer();
				}
				else {
					wrongAnswer();
				}

			});
		}
	};

	//timerSet 
	function timerSet(){
		timeSpan.html(timer + " seconds");
		timerDiv.append(timeSpan);
		// $(".gameplay").html(timerDiv);

		if (timer === 0){
			clearInterval(countDown);
			timeIsUp();
			answerDiv.empty();
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
		setTimeout(nextQuestion,1000*showScreen);
	}

	function rightAnswer(){
		console.log("YEEHAW!");
		var whatHappened = $("<div>");
		whatHappened.attr("id", "result");
		whatHappened.html("YEEHAW!");
		$(".gameplay").append(whatHappened);
		correct++;
		count++;
		setTimeout(nextQuestion,1000*showScreen);
	}

	function wrongAnswer(){
		console.log("Dumbass!");
		var whatHappened = $("<div>");
		whatHappened.attr("id", "result");
		whatHappened.html("If brains were leather, you couldn't saddle a flea.");
		$(".gameplay").append(whatHappened);
		var answer = questions[count].choices[questions[count].answer];
		
		var correctAnswer = $("<div>");
		correctAnswer.attr("id", "answer");
		correctAnswer.html("The correct answer is: " + answer);

		$(".gameplay").append(correctAnswer);
		incorrect++;
		count++;
		setTimeout(nextQuestion,1000*showScreen);
	}

	function showResults(){
		clearInterval(countDown);
		$(".gameplay").empty();
		var pageHeading = $("<div>");
		pageHeading.attr("id", "pageHeading");
		pageHeading.html("Results");
		var correctDiv = $("<div>");
		correctDiv.addClass("result");
		correctDiv.html("Questions answered correctly: " + correct);
		var incorrectDiv = $("<div>");
		incorrectDiv.addClass("result");
		incorrectDiv.html("Questions answered incorrectly: " + incorrect);
		var unansweredDiv = $("<div>");
		unansweredDiv.addClass("result");
		unansweredDiv.html("Questions not answered: " + unanswered);

		var startoverButton = $("<button>");
		startoverButton.addClass("startButton");
		startoverButton.html("Give it another go?");
		
		startoverButton.on("click", function(){
			reset();
			nextQuestion();
		});

		$(".gameplay").append(pageHeading);
		$(".gameplay").append(correctDiv);
		$(".gameplay").append(incorrectDiv);
		$(".gameplay").append(unansweredDiv);
		$(".gameplay").append(startoverButton);

	}


	startPage();

});