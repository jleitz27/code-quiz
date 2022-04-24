// Start Game


//Questions
var question1 = new Question("Commonly used data types DO NOT include:", ["strings", "booleans", "alerts", "numbers"], 2 );
var question2 = new Question("The condition in an if / else statement is enclosed within _____", ["quotes", "curly brackets", "parantheses", "square brackets"], 2);
var question3 = new Question("Arrays in JavaScript can be used to store______.",["numbers and strings", "other arrays", "booleans", "all of the above"], 3);
var question4 = new Question("String values must be enclosed within ______ when being assigned to variables.", ["commas", "curly brackets", "quotes", "parantheses"], 2);
var question5 = new Question("A very useful tool used during development and debugging for printing content to the debugger is:", ["JavaScript", "terminal/bash", "for loops", "console.log"], 3);

var questionList = [question1, question2, question3, question4, question5 ];

var currentQuestion = 0;