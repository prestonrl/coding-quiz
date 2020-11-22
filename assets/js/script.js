var timerEl = document.querySelector('#time');
var startBtn = document.querySelector('#startButton');
var submitBtn = document.querySelector('#submit-button');
var landingPage = document.querySelector('#title-section');
var questionsPage = document.querySelector("#quiz-section");
var questionEl = document.querySelector('#question-title');
var optionsEl = document.querySelector('#options');
var feedbackEl = document.querySelector('#feedback');
var scoreCardEl = document.querySelector('#high-score-section')
var initialsEl = document.querySelector('initials');
var msgDiv = document.querySelector('#msg');
var timeLeft = 75;
var timeInterval;
var highScores = [];

var currentQuestionIndex = 0;

var questions = [
    {
        title: "Commonly Used data types DO NOT include:",
        choices: ["stings", "alerts", "booleans", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statment is enclosed within _____.",
        choices: ["parentheses", "quotes", "curly brackets", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "What javascipt method can we use to select an html element?",
        choices: ["document.queryselector()", "document.getElementChild", "document.getElementById", "Both 1 and 3"],
        answer: "Both 1 and 3"
    },
    {
        title: "What html tag is NOT included in the HEAD tag?",
        choices: ["link", "meta", "title", "header"],
        answer: "header"
    },
    {
        title: "What attribute is used in html to decorate content?",
        choices: ["css", "class", "src", "style"],
        answer: "style"
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
    console.log(timeLeft);
    clearInterval(timeInterval);
    questionsPage.setAttribute("class", "hide");
    scoreCardEl.setAttribute("class", "show");

    var roundScoreEl = document.querySelector('#round-score');
    roundScoreEl.textContent = timeLeft;
    console.log(roundScoreEl);
}

function displayMessage(type, message) {
    msgDiv.textContent = message;
    msgDiv.setAttribute('class', type);
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
    }
});
    


startBtn.onclick = quizStart;
