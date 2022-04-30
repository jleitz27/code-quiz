//List sections(html)
var quizSections = document.querySelectorAll(".quiz-section");

// Start Quiz
var startSection = document.getElementById("start");
var startBtn = document.getElementById("start-btn");

//Question variables
var quizSection = document.getElementById("quiz-questions");
var timeLeft = document.getElementById("time-remaining");
var question = document.getElementById("question");
var answers = document.getElementById("answers");
var answerStatus = document.querySelectorAll(".answer-status");
var correct = document.getElementById("correct");
var wrong = document.getElementById("wrong");

//End variables
var endSection = document.getElementById("end-quiz");
var endMessage = document.getElementById("end-message");
var endScore = document.getElementById("score");
var nameInput = document.getElementById("name");
var enterScore = document.getElementById("enter-score");
var nameError = document.getElementById("error-message");

//Questions
class Question {
    constructor(question, answers, indexOfCorrectChoice) {
        this.question = question;
        this.answers = answers;
        this.indexOfCorrectChoice = indexOfCorrectChoice;
    }
}
var question1 = new Question("Commonly used data types DO NOT include:", ["strings", "booleans", "alerts", "numbers"], 2 );
var question2 = new Question("The condition in an if / else statement is enclosed within _____", ["quotes", "curly brackets", "parantheses", "square brackets"], 2);
var question3 = new Question("Arrays in JavaScript can be used to store______.",["numbers and strings", "other arrays", "booleans", "all of the above"], 3);
var question4 = new Question("String values must be enclosed within ______ when being assigned to variables.", ["commas", "curly brackets", "quotes", "parantheses"], 2);
var question5 = new Question("A very useful tool used during development and debugging for printing content to the debugger is:", ["JavaScript", "terminal/bash", "for loops", "console.log"], 3);

var questionList = [question1, question2, question3, question4, question5 ];

var currentQuestion = 0;

//Time variables
var totalTime = 75;
var totalTimeInterval;
var answerStatusTimeout; 

//Event listeners for click and submit buttons 
startBtn.addEventListener('click', startGame);
answers.addEventListener('click', selectAnswer);
enterScore.addEventListener('submit', processInput);

//Start quiz
function startGame() {
    showElement(quizSections, quizSection);
    
    showTime();  
    showQuestion();

    startTimer();
}

//Show elements
function showElement(quizList,showElement) {
    for (element of quizList) {
        hideElement(element);
    }
    showElement.classList.remove("hidden");
} 

// Hide elements
function hideElement(element) {
    if (!element.classList.contains("hidden")) {
        element.classList.add("hidden");
    }
}

//Question function
function showQuestion() {
    question.textContent = questionList[currentQuestion].question;

    displayAnswerList();
}

function displayAnswerList() {
    answers.innerHTML = "";

    questionList[currentQuestion].answers.forEach(function(answer, index) {
        var li = document.createElement("li");
        li.dataset.index = index;
        var button = document.createElement("button");
        button.textContent = (index + 1) + ". " + answer;
        li.appendChild(button);
        answers.appendChild(li);
    });
}

//answering a question
function selectAnswer(event) {
    var userAnswer = parseInt(event.target.parentElement.dataset.index);

    resetAnswerStatusEffects();
    checkAnswer(userAnswer);
    getNextQuestion();
}

//display answer status
function resetAnswerStatusEffects() {
    clearTimeout(answerStatusTimeout);
}

function styleTimeLeftWrong() {
    timeLeft.style.color = "#E81648";
}

function checkAnswer(userAnswer) {
    if (isAnswerCorrect(userAnswer)) {
        displayAnswerCorrectEffects();
    } else {
        displayAnswerWrongEffects();
    }
}

function isAnswerCorrect(choice) {
    return choice === questionList[currentQuestion].indexOfCorrectChoice;
    }

    function displayAnswerWrongEffects() {
    deductTimeBy(10);

    styleTimeLeftWrong();
    showElement(answerStatus, wrong);

    answerStatusTimeout = setTimeout(function() {
        hideElement(wrong);
    }, 1000);
}

function deductTimeBy(seconds) {
    totalTime -= seconds;
    checkTime();
    showTime();
}

function displayAnswerCorrectEffects() {
    showElement(answerStatus, correct);

    answerStatusTimeout = setTimeout(function() {
        hideElement(correct);
    }, 1000);
}

//next question
function getNextQuestion() {
    currentQuestion++;
    if (currentQuestion >= questionList.length) {
        endQuiz();
    } else {
        showQuestion();
    }
}

//Timer  
function showTime() {
    timeLeft.textContent = totalTime;
}

function startTimer() {
    totalTimeInterval = setInterval(function() {
        totalTime--;
        showTime();
        checkTime();

    }, 1000);
}

function checkTime() {
    if (totalTime <= 0) {
        totalTime = 0;
        endQuiz();
    }
}

//Putting name in
function processInput(event) {
    event.preventDefault();

    var initials = nameInput.value.toUpperCase();

    if (isInputValid(initials)) {
        var score = totalTime;
        var highscoreEntry = getNewHighscoreEntry(initials, score);
        saveHighscoreEntry(highscoreEntry);
        window.location.href= "./high-scores.html";
    }
}

function getNewHighscoreEntry(initials, score) {
    var entry = {
        initials: initials,
        score: score,
    }
    return entry;
}

function isInputValid(initials) {
    var errorMessage = "";
    if (initials === "") {
        errorMessage = "You must include initials!";
        displayFormError(errorMessage);
        return false;
    } else if (initials.match(/[^a-z]/ig)) {
        errorMessage = "Initials may only include letters."
        displayFormError(errorMessage);
        return false;
    } else {
        return true;
    }
}

function displayFormError(errorMessage) {
    nameError.textContent = errorMessage;
    if (!nameInput.classList.contains("error")) {
        nameInput.classList.add("error");
    }
}

function saveHighscoreEntry(highscoreEntry) {
    var currentScores = getScoreList();
    placeEntryInHighscoreList(highscoreEntry, currentScores);
    localStorage.setItem('scoreList', JSON.stringify(currentScores));
}

function getScoreList() {
    var currentScores = localStorage.getItem('scoreList');
    if (currentScores) {
        return JSON.parse(currentScores);
    } else {
        return [];
    }
}

function placeEntryInHighscoreList(newEntry, scoreList) {
    var newScoreIndex = getNewScoreIndex(newEntry, scoreList);
    scoreList.splice(newScoreIndex, 0, newEntry);
}

function getNewScoreIndex(newEntry, scoreList) {
    if (scoreList.length > 0) {
        for (var i = 0; i < scoreList.length; i++) {
            if (scoreList[i].score <= newEntry.score) {
            return i;
            }
        } 
    }
    return scoreList.length;
}

// End of quiz
function endQuiz() {
    clearInterval(totalTimeInterval);
    
    showElement(quizSections, endSection);
    displayScore();
    setEndHeading();
}

function displayScore() {
    endScore.textContent = totalTime;
}

function setEndHeading() {
    if (totalTime === 0) {
        endMessage.textContent = "Sorry! Your time is up!";
    } else {
        endMessage.textContent = "Congrats! Your done!";
    }
}
