$(document).ready(function(){

	var count; //used to call on the index of questions
	var correct; //used to store number of correct answers
	var incorrect; // ^ for incorrect answers
	var unanswered; // ^^ for unanswered questions
	var timer; //starts timer
	var countDown; // used to start/stop interval
	// questions and related information is in the object below
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

						"graphic":"assets/images/texasFlags.jpg",
						"caption":"Texas Flags",
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
						"graphic":"assets/images/oilDerrick.jpg",
						"caption":"Oil Derrick",
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
						"graphic":"assets/images/emancipationProclamation.jpg",
						"caption":"Emancipation Proclamation",
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
						"graphic":"assets/images/deepInTheHeart.jpg",
						"caption":"Deep in the heart of Texas",
						},

						{
						"question":"Texas comes from the Hasinai Indian word Tejas, which means",
						"answer":0,
						"choices": [
									"Friends or Allies",
									"Cowboys",
									"Gods",
									"Football players"
									],
						"graphic":"assets/images/friendlyTexas.jpg",
						"caption":"Drive Friendly - The Texas Way",
						},

												{
						"question":"Everything is _________ in Texas.",
						"answer":2,
						"choices": [
									"cheaper",
									"friendlier",
									"bigger",
									"drier"
									],
						"graphic":"assets/images/biggerInTexas.jpg",
						"caption":"Bigger in Texas",
						},


					];

	//some Variables that are being called by multiple functions
	var timerDiv = $("<div>");
	timerDiv.attr("id", "timer");
	timerDiv.html("Time Left: ");
	
	var timeSpan = $("<span>");

	var answerDiv = $("<div>");
	answerDiv.attr("id", "answers");

	var showScreen = 5; // specifies how long to show the answer screen

	//resets the value for the scores, and question to display
	function reset(){
		count = 0;
		correct = 0;
		incorrect = 0;
		unanswered = 0;
	}// reset function ends here

	//Dynamically creates a start button and renders it on the screen.
	function startPage(){

		//division added for styling purposes
		var startDiv = $("<div>");
		startDiv.addClass("startDiv");
		var startButton = $("<button>");
		startButton.addClass("startButton");
		startButton.html("Let's get goin'!");
		startButton.on("click", function(){
			//ensures that all variables are cleared
			reset();
			//displays the question from the questions object on the screen
			nextQuestion();
		});
		//adding image div for styling purpose
		var imageDiv = $("<div>");
		imageDiv.addClass("imageDiv");
		var startImg = $("<img>");
		startImg.attr({"src":"assets/images/greetings.jpg", "alt":"Greeting from Texas",})
		imageDiv.html(startImg);
		$(".gameplay").append(imageDiv);
		// pushing the button onto the page
		startDiv.html(startButton);
		$(".gameplay").append(startDiv);
	} //startPage function ends here

	//displays the next question in an array;
	function nextQuestion(){
		//ensure that nothing is being displayed on the screen
		$(".gameplay").empty();

		//if the count has reached the length of the array with questions, game is over and results are displayed
		if (count === questions.length){
			showResults();
		}

		else{
			//initialize timer to 30 secs.
			timer = 30;

			//Display the time that user has to answer this question
			timerDiv.html("Time Left: ");
			timeSpan.html(timer + "seconds");
			timerDiv.append(timeSpan);
			$(".gameplay").html(timerDiv);

			//Calling the function once, to display the original time that user has
			timerSet();
			//calls the function timerSet with an interval of 1 second
			countDown = setInterval(timerSet, 1000);

			//Display the question on the screen
			var questionDiv = $("<div>");
			questionDiv.attr("id", "questions");
			questionDiv.html(questions[count].question);
			$(".gameplay").append(questionDiv);

			//Display the answer choices on the screen. The choices are given as button, so the user can pick the answer
			var answerChoices = questions[count].choices;
			//loops through the array of answer choices, creates button for them, and adds the html to the div.
			for (var i = 0; i < answerChoices.length; i++){
				var buttonDiv = $("<div>");
				var answerButton = $("<button>");
				answerButton.addClass("answerButton");
				//assigns the value to a button so user input can be compared to the correct answer, later.
				answerButton.val(answerChoices[i]);
				answerButton.html(answerChoices[i]);
				buttonDiv.html(answerButton);
				answerDiv.append(buttonDiv);
			}

			$(".gameplay").append(answerDiv);

			//Adds an event listener on the buttons to listen to user input
			$(".answerButton").on("click", function(){

				var userInput = $(this).val();
				console.log(userInput);
				var answer = questions[count].choices[questions[count].answer];
				//stops the timer once the user selects an answer.
				clearInterval(countDown);
				//deletes the answer choices from the screen.
				answerDiv.empty();

				if (userInput === answer){
					rightAnswer();
				}
				else {
					wrongAnswer();
				}

			}); //on click function for the answer buttons ends here
		} // else statement ends here
	}; // nextQuestion function ends here

	//subtracts one second from the timer and shows is on the screen. 
	function timerSet(){
		timeSpan.html(timer + " seconds");
		timerDiv.append(timeSpan);
		// $(".gameplay").html(timerDiv);

		// if timere reaches zero, switches the screen to show the answer and proceed with rest of the game.
		if (timer === 0){
			clearInterval(countDown);
			timeIsUp();
			answerDiv.empty();
		}		
		timer -= 1;
	}

	//If user runs out of time
	function timeIsUp(){
		console.log("time is up");
		var whatHappened = $("<div>");
		whatHappened.attr("id", "result");
		whatHappened.html("Sorry, Bud! Y'ere mighty slow.");
		$(".gameplay").append(whatHappened);

		//Show the user what the correct answer is
		var answer = questions[count].choices[questions[count].answer];		
		var correctAnswer = $("<div>");
		correctAnswer.attr("id", "answer");
		correctAnswer.html("The correct answer is: " + answer);

		//Display the graphic associated with the question
		var imageDiv = $("<div>");
		imageDiv.addClass("imageDiv");
		var displayImg = $("<img>");
		displayImg.addClass("displayPic");
		var source = questions[count].graphic;
		var caption = questions[count].caption;
		displayImg.attr({"src": source, "alt": caption,});
		imageDiv.html(displayImg);

		$(".gameplay").append(correctAnswer);
		$(".gameplay").append(imageDiv);
		//log unanswered score
		unanswered++;
		//increase the count by one to go to the next question
		count++;

		//keep the screen for specified number of seconds, set in line 103. Currently set to 5 seconds.
		setTimeout(nextQuestion,1000*showScreen);
	} //timeIsUp function ends here

	//What to do if user answer is correct
	function rightAnswer(){
		
		var whatHappened = $("<div>");
		whatHappened.attr("id", "result");
		whatHappened.html("YEEHAW!");

		//Display the graphic associated with the question
		var imageDiv = $("<div>");
		imageDiv.addClass("imageDiv");
		var displayImg = $("<img>");
		displayImg.addClass("displayPic");
		var source = questions[count].graphic;
		var caption = questions[count].caption;
		displayImg.attr({"src": source, "alt": caption,});
		imageDiv.html(displayImg);

		$(".gameplay").append(whatHappened);
		$(".gameplay").append(imageDiv);

		//log score for the correct answers
		correct++;
		//increase count by one to go to the next question
		count++;

		//keep the screen for specified number of seconds, set in line 103. Currently set to 5 seconds.
		setTimeout(nextQuestion,1000*showScreen);
	} // function for the right answer ends here

	//What to do if user answer is incorrect
	function wrongAnswer(){
		
		var whatHappened = $("<div>");
		whatHappened.attr("id", "result");

		//insult the user in true Texas way.
		whatHappened.html("If brains were leather, you couldn't saddle a flea.");
		$(".gameplay").append(whatHappened);
		var answer = questions[count].choices[questions[count].answer];
		
		//Drop some knowledge on the user
		var correctAnswer = $("<div>");
		correctAnswer.attr("id", "answer");
		correctAnswer.html("The correct answer is: " + answer);

		//Display the graphic associated with the question.
		var imageDiv = $("<div>");
		imageDiv.addClass("imageDiv");
		var displayImg = $("<img>");
		displayImg.addClass("displayPic");
		var source = questions[count].graphic;
		var caption = questions[count].caption;
		displayImg.attr({"src": source, "alt": caption,});
		imageDiv.html(displayImg);

		$(".gameplay").append(correctAnswer);
		$(".gameplay").append(imageDiv);
		//log the score for the incorrect answer
		incorrect++;
		//increase the count by one to go to the next question
		count++;

		//keep the screen for specified number of seconds, set in line 103. Currently set to 5 seconds.
		setTimeout(nextQuestion,1000*showScreen);
	} // wrongAnswer function ends here

	//When the user goes through all the questions, show the results.
	function showResults(){
		clearInterval(countDown);
		$(".gameplay").empty();
		var pageHeading = $("<div>");
		pageHeading.attr("id", "pageHeading");
		pageHeading.html("Results");
		var correctDiv = $("<div>");
		correctDiv.addClass("finalResult");
		correctDiv.html("Questions answered correctly: " + correct);
		var incorrectDiv = $("<div>");
		incorrectDiv.addClass("finalResult");
		incorrectDiv.html("Questions answered incorrectly: " + incorrect);
		var unansweredDiv = $("<div>");
		unansweredDiv.addClass("finalResult");
		unansweredDiv.html("Questions not answered: " + unanswered);

		//create a button to offer an option of restarting the game from the beginning.
		var startoverDiv = $("<div>");
		startoverDiv.addClass("startDiv");
		var startoverButton = $("<button>");
		startoverButton.addClass("startButton");
		startoverButton.html("Wanna give it another go?");
		startoverDiv.html(startoverButton);
		startoverButton.on("click", function(){
			reset();
			nextQuestion();
		});

		$(".gameplay").append(pageHeading);
		$(".gameplay").append(correctDiv);
		$(".gameplay").append(incorrectDiv);
		$(".gameplay").append(unansweredDiv);
		$(".gameplay").append(startoverDiv);

	}

	//calls the start page function to render the start page
	startPage();

});