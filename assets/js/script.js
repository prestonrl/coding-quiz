var timerEl = document.querySelector('#time');
var mainEl = document.getElementById('main');
var startBtn = document.querySelector('#startButton');

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
    var timeLeft = 20;

    // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
        if (timeLeft > 0) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        }
        
        else {
            timerEl.textContent = 'Finished!';
            clearInterval(timeInterval);
        }


    }, 1000);
}

// Displays the message one word at a time


startBtn.onclick = quizStart;
