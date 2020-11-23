var timerEl = document.querySelector('#time');
var startBtn = document.querySelector('#startButton');
var submitBtn = document.querySelector('#submit-button');
var resetBtn = document.querySelector('#reset-btn');
var scoreBtn = document.querySelector('#score-btn');
var landingPage = document.querySelector('#intro-section');
var questionsPage = document.querySelector("#quiz-section");
var questionEl = document.querySelector('#question-title');
var optionsEl = document.querySelector('#options');
var feedbackEl = document.querySelector('#feedback');
var scoreCardEl = document.querySelector('#show-score')
var initialsEl = document.querySelector('initials');
var msgDiv = document.querySelector('#msg');
var highScoreEl = document.querySelector('#high-score');
var scoresListEl = document.querySelector('#scores-list');
var timeLeft = 75;
var timeInterval;
var scores = [];

var currentQuestionIndex = 0;

var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "alerts", "booleans", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statment is enclosed within _____.",
        choices: ["parentheses", "quotes", "curly brackets", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log"
    },
    {
        title: "String values must be enclosed within ______ when being assigned to variables",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "Arrays in JavaScript can be used to store _______.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    }
]



// Timer that counts down from 75
function quizStart() {
    landingPage.setAttribute("class", "hide");
    questionsPage.setAttribute("class", "show");
    

    // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    timeInterval = setInterval(function () {
        if (timeLeft > 0) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        }
        
        else {
            timerEl.textContent = 'Finished!';
            clearInterval(timeInterval);
            endQuiz();
        }


    }, 1000);

    displayQuestions();
}

var displayQuestions = function() {
    
    var selectedQuestion = questions[currentQuestionIndex];

    optionsEl.innerHTML = "";

    questionEl.textContent = selectedQuestion.title;


    selectedQuestion.choices.forEach(function (choice, i) {
        var answerButton = document.createElement("button");
        answerButton.setAttribute("class", "options");

        answerButton.setAttribute("value", choice);

        answerButton.textContent = i + 1 + ". " + choice;

        answerButton.onclick = questionClick;

        questionEl.appendChild(answerButton);
    });
    
}

var questionClick = function() {
    
    if (this.value !== questions[currentQuestionIndex].answer) {
        timeLeft -= 10;
        timerEl.textContent = timeLeft;
        feedbackEl.textContent = "Wrong!"
    }
    else {
        feedbackEl.textContent = "Correct!"
    }

    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        endQuiz();
    }
    else {
        displayQuestions();
    }
}

var endQuiz = function() {
    timerEl.textContent = timeLeft;
    clearInterval(timeInterval);
    questionsPage.setAttribute("class", "hide");
    scoreCardEl.setAttribute("class", "show");

    var roundScoreEl = document.querySelector('#round-score');
    roundScoreEl.textContent = timeLeft;
}

function displayMessage(type, message) {
    msgDiv.textContent = message;
    msgDiv.setAttribute('class', type);
}

var showHighScores = function() {
    scoreCardEl.setAttribute('class', 'hide');
    questionsPage.setAttribute("class", "hide");
    landingPage.setAttribute("class", "hide");
    highScoreEl.setAttribute('class', 'show');

    loadScores();

    scores.sort(function (a, b) {
        return b.score - a.score;
    });

    for (var i = 0; i <scores.length; i++) {
        var liItem = document.createElement('li');
        liItem.textContent = scores[i].initials + " - " + scores[i].score;
        scoresListEl.appendChild(liItem);
    }
}

submitBtn.addEventListener('click', function(event) {
    event.preventDefault();

    var userInitials = document.querySelector('#initials').value;
    userInitials = userInitials.trim();


    if (userInitials === '') {
        displayMessage('error','Please enter initials');
    }
    else {
        displayMessage('success', 'Saved score')
        var currentScore = {
            initials: userInitials,
            score: timeLeft
        };

        loadScores();

        scores.push(currentScore);

        localStorage.setItem("scores", JSON.stringify(scores));

        showHighScores();
    }
});

var loadScores = function() {

    var savedScores = localStorage.getItem('scores');
    if (!savedScores) {
        savedScores = [];
    }
    else {
        savedScores = JSON.parse(savedScores);
    }

    scores = savedScores;

}

resetBtn.addEventListener('click', function (event) {
    event.preventDefault();
    window.localStorage.removeItem("scores");    
});

startBtn.onclick = quizStart;
scoreBtn.addEventListener('click', showHighScores);
