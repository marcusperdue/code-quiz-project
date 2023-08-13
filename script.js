var currentQuestionIndex = 0;
var interval;
var timer = 75;
var score = 0;
var questions = [{
	question: 'Inside which HTML element do we put the JavaScript?:',
	options: ['<scripting>', '<js>', '<script>', '<javascript>'],
	answer: 2
}, {
	question: 'Where is the correct place to insert a JavaScript?:',
	options: [' The <head> section', 'The <body> section ', 'Both <head> and <body>', 'The <script> section'],
	answer: 1
}, {
	question: 'What is the correct syntax for referring to an external script called "xxx.js"?:',
	options: [' <script name="xxx.js">', '<script src="xxx.js">', '<script href="xxx.js">', '<script img="xxx.js">'],
	answer: 2
}, {
	question: 'Which of the following is the correct way to comment out multiple lines in JavaScript?:',
	options: ['//This is a comment', '/*This is a comment*/', '<!--This is a comment-->', '--This is a comment'],
	answer: 2
}, {
	question: 'What is the correct JavaScript syntax to change the content of the following HTML element: <p id="demo">This is a demonstration.</p>?:',
	options: ['document.getElementByName("p").innerText = "Hello World!";', 'document.getElementById("demo").textContent = "Hello World!";', 'document.getElement("p").innerHTML = "Hello World!";', 'document.getElementById("demo").innerText() = "Hello World!";'],
	answer: 2
}, {
	question: 'Which of the following is NOT a valid JavaScript variable name?:',
	options: ['2names', '_first_and_last_names', 'FirstAndLast', '$character'],
	answer: 1
}, {
	question: 'How does a FOR loop start in JavaScript?:',
	options: ['for i = 1 to 5', 'for (i <= 5; i++)', 'for (i = 0; i <= 5)', 'for (i = 0; i < 5; i++)'],
	answer: 4
}, {
	question: 'How can you declare a variable in JavaScript?:',
	options: ['variable carName;', 'v carName;', 'var carName;', 'vari carName;'],
	answer: 3
}, {
	question: 'Which event occurs when the user clicks on an HTML element?:',
	options: ['onchange', 'onmouseclick', 'onmouseover', 'onclick'],
	answer: 4
}, {
	question: 'How do you declare a function in JavaScript?:',
	options: ['function = myFunction()', 'function:myFunction()', 'function myFunction()', 'function_myFunction()'],
	answer: 3
}]

function startQuiz() {
	document.getElementById('high-scores-section').style.display = 'none';
	document.getElementById('title').style.display = 'none';
	document.getElementById('intro').style.display = 'none';
	document.getElementById('start-btn').style.display = 'none';
	document.getElementById('quiz-section').style.display = 'block';
	timer = 75;
	score = 0;
	interval = setInterval(function() {
		timer--;
		document.getElementById('timer').innerText = "Time: " + timer;
		if (timer <= 0) {
			endQuiz();
		}
	}, 1000);
	currentQuestionIndex = 0;
	displayQuestion();
}

function displayQuestion() {
	if (currentQuestionIndex >= questions.length) {
		endQuiz();
		return;
	}
	var questionObj = questions[currentQuestionIndex];
	var questionElement = document.getElementById('question');
	questionElement.innerText = questionObj.question;
	questionElement.style.fontSize = '2.5em';
	questionElement.style.textAlign = 'left';
	questionElement.style.marginBottom = '30px';
	var buttons = document.getElementsByClassName('option-btn');
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].innerText = questionObj.options[i];
		buttons[i].style.fontSize = '1.4em';
		buttons[i].style.textAlign = 'left';
		buttons[i].style.display = 'block';
		buttons[i].style.marginLeft = '0';
		buttons[i].style.marginTop = '10px';
	}
}

function submitAnswer(options) {
	if (questions[currentQuestionIndex].answer - 1 === options) {
		score += 10;
	} else {
		timer -= 10;
	}
	currentQuestionIndex++;
	displayQuestion();
}

function endQuiz() {
	clearInterval(interval);
	document.getElementById('quiz-section').style.display = 'none';
	var finalScoreElement = document.getElementById('final-score');
	finalScoreElement.innerText = score;
	finalScoreElement.style.fontSize = '5em';
	document.getElementById('end-game').style.display = 'block';
}

function saveScore() {
	var initials = document.getElementById('initials').value;
	if (initials === "") {
		alert("Please enter your initials!");
		return;
	}
	var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
	highScores.push({
		initials: initials,
		score: score
	});
	localStorage.setItem("highScores", JSON.stringify(highScores));
	document.getElementById('title').style.display = 'none';
	document.getElementById('intro').style.display = 'none';
	document.getElementById('start-btn').style.display = 'none';
	document.getElementById('end-game').style.display = 'none';
	showHighScores();
}

function showHighScores() {
	var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
	var highScoresList = document.getElementById('high-scores-list');
	highScoresList.style.fontSize = '2em';
	highScoresList.style.lineHeight = '2.5';
	highScoresList.style.listStyle = 'none';
	highScoresList.innerHTML = '';
	highScores.forEach(function(scoreEntry) {
		var listItem = document.createElement('li');
		listItem.textContent = scoreEntry.initials + ': ' + scoreEntry.score;
		highScoresList.appendChild(listItem);
	});
	document.getElementById('high-scores-section').style.display = 'block';
	document.getElementById('title').style.display = 'none';
	document.getElementById('intro').style.display = 'none';
	document.getElementById('start-btn').style.display = 'none';
}

function hideHighScores() {
	document.getElementById('high-scores-section').style.display = 'none';
	document.getElementById('title').style.display = 'block';
	document.getElementById('intro').style.display = 'block';
	document.getElementById('start-btn').style.display = 'block';
}

function clearScores() {
	localStorage.removeItem("highScores");
	var highScoresList = document.getElementById('high-scores-list');
	highScoresList.innerHTML = '';
}