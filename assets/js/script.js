//List sections(html)
var quizSections = document.querySelectorAll(".quiz-section");

// Start Game
var startSection = document.getElementById("start");
var startBtn = document.getElementById("start-btn");

//Question variables
var quizSection = document.getElementById("quiz-questions");
var timeRemaining = document.getElementById("time-remaining");
var question = document.getElementById("question");
var answers = document.getElementById("answers");
var answerStatus = document.getElementById(".answer-status");
var correct = document.getElementById("correct");
var wrong = document.getElementById("wrong");

//End variables
var endSection = document.getElementById("end-game");
var endMessage = document.getElementById("end-message");
var score = document.getElementById("score");
var nameInput = document.getElementById("name");
var enterScore = document.getElementById("enter-score");
var errorMessage = document.getElementById("error-message");

//Questions
var question1 = new Question("Commonly used data types DO NOT include:", ["strings", "booleans", "alerts", "numbers"], 2 );
var question2 = new Question("The condition in an if / else statement is enclosed within _____", ["quotes", "curly brackets", "parantheses", "square brackets"], 2);
var question3 = new Question("Arrays in JavaScript can be used to store______.",["numbers and strings", "other arrays", "booleans", "all of the above"], 3);
var question4 = new Question("String values must be enclosed within ______ when being assigned to variables.", ["commas", "curly brackets", "quotes", "parantheses"], 2);
var question5 = new Question("A very useful tool used during development and debugging for printing content to the debugger is:", ["JavaScript", "terminal/bash", "for loops", "console.log"], 3);

var questionList = [question1, question2, question3, question4, question5 ];

var currentQuestion = 0;

//Event listeners for click and submit buttons
startBtn.addEventListener("click", startGame);
answers.addEventListener("click", selectAnswer);

//Show elements
function showElement(siblingList, showElement){
    for (element of siblingList){
        hideElement(element);
    }
    showElement.classList.remove("hidden");
}

// Hide elements
function hideElement (element){
    if (!element.classList.contains ("hiddent")){
        element.classList.add("hidden")
    }
}

