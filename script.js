var currentQuestionIndex = 0;
var interval;
var timer = 75;
var score = 0;
var questions = [{
	question: 'Inside which HTML element do we put the JavaScript?:',
	options: ['<scripting>', '<js>', '<script>', '<javascript>'],
	answer: 3
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
    // Hide the high scores section to ensure a fresh start
    document.getElementById('high-scores-section').style.display = 'none';

    // Hide the title, intro, and start quiz button
    document.getElementById('title').style.display = 'none';
    document.getElementById('intro').style.display = 'none';
    document.getElementById('start-btn').style.display = 'none';

    // Display the quiz section to start the quiz
    document.getElementById('quiz-section').style.display = 'block';

    // Reset the timer and score for a new quiz 
    timer = 75;
    score = 0;

    // Set up a timer interval that updates every second
    interval = setInterval(function() {
        timer--;
        document.getElementById('timer').innerText = "Time: " + timer;
        
        // If the timer reaches zero, end the quiz
        if (timer <= 0) {
            endQuiz();
        }
    }, 1000);

    // Reset the index of the current question
    currentQuestionIndex = 0;

    // Display the first question to begin the quiz
    displayQuestion();
}

function displayQuestion() {
    // Check if all questions have been displayed
    if (currentQuestionIndex >= questions.length) {
        endQuiz(); // End the quiz if all questions are displayed
        return;
    }

    // Gets the current question object from the questions array
    var questionObj = questions[currentQuestionIndex];

    // Update the question elements content and style
    var questionElement = document.getElementById('question');
    questionElement.innerText = questionObj.question;
    questionElement.style.fontSize = '2.5em';
    questionElement.style.textAlign = 'left';
    questionElement.style.marginBottom = '30px';

    // Update answer option buttons based on the current question
    var buttons = document.getElementsByClassName('option-btn');
    for (var i = 0; i < buttons.length; i++) {
        // Set the text of the button to the current answer option
        buttons[i].innerText = questionObj.options[i];

        // Adjust button style for consistent appearance
        buttons[i].style.fontSize = '1.4em';
        buttons[i].style.textAlign = 'left';
        buttons[i].style.display = 'block';
        buttons[i].style.marginLeft = '0';
        buttons[i].style.marginTop = '10px';
    }
}


function submitAnswer(options) {
    // Compare the selected option with the correct answer
    if (questions[currentQuestionIndex].answer - 1 === options) {
        // Increase score by 10 if the answer is correct
        score += 10;
    } else {
        // Decrease timer by 10 seconds for a wrong answer
        timer -= 10;
    }

    // Move on to the next question
    currentQuestionIndex++;

    // Display the next question or end the quiz if all questions are answered
    displayQuestion();
}


function endQuiz() {
    // Stop the timer interval
    clearInterval(interval); 

    // Hide the quiz section to display the end-game section
    document.getElementById('quiz-section').style.display = 'none';

    // Display the final score in the end-game section
    var finalScoreElement = document.getElementById('final-score');
    finalScoreElement.innerText = score;
    finalScoreElement.style.fontSize = '5em'; // Set the font size for score display

    // Show the end-game section
    document.getElementById('end-game').style.display = 'block';
}


function saveScore() {
    // Get the player's initials from the input field
    var initials = document.getElementById('initials').value;

    // Check if initials are provided
    if (initials === "") {
        alert("Please enter your initials!");
        return;
    }

    // Retrieve high scores from local storage or initialize an empty array
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    
  

    // Add the current player's initials and score to the high scores array
    highScores.push({
        initials: initials,
        score: score
    });

  // Sorts highscores on their score values, doesnt work everytime
    highScores.sort((a, b) => b.score - a.score);

    // Store the updated high scores array back in local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Hide other sections and display the high scores
    document.getElementById('title').style.display = 'none';
    document.getElementById('intro').style.display = 'none';
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('end-game').style.display = 'none';

    // Show the high scores section
    showHighScores();
}


function showHighScores() {
    // Retrieve high scores from local storage or initialize an empty array
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");

    // Get the HTML element where high scores will be displayed
    var highScoresList = document.getElementById('high-scores-list');

    // Adjust styles for the high scores list
    highScoresList.style.fontSize = '2em';
    highScoresList.style.lineHeight = '2.5';
    highScoresList.style.listStyle = 'none';
   
    

    // Clear the list to prepare for new high scores
    highScoresList.innerHTML = '';

    // Populate the list with high scores using a forEach loop
    highScores.forEach(function(scoreEntry) {
        var listItem = document.createElement('li');
        listItem.textContent = scoreEntry.initials + ': ' + scoreEntry.score;
        highScoresList.appendChild(listItem);
        
    });

    // Show the high scores section and hide other sections
    document.getElementById('high-scores-section').style.display = 'block';
    document.getElementById('title').style.display = 'none';
    document.getElementById('intro').style.display = 'none';
    document.getElementById('start-btn').style.display = 'none';
}


function hideHighScores() {
    // Hide the high scores section to go back to the main menu
    document.getElementById('high-scores-section').style.display = 'none';

    // Show the title, intro, and start quiz button
    document.getElementById('title').style.display = 'block';
    document.getElementById('intro').style.display = 'block';
    document.getElementById('start-btn').style.display = 'block';
}


function clearScores() {
    // Clear scores from local storage
    localStorage.removeItem("highScores");

    // clear  list of high scores 
    var highScoresList = document.getElementById('high-scores-list');
    highScoresList.innerHTML = '';
    
}
