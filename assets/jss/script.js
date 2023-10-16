var questions = document.querySelector("#questions");
var timer = document.querySelector("#time");
var choices = document.querySelector("#choices");
var submit = document.querySelector("#submit");
var start = document.querySelector("#start");
var yourName = document.querySelector("#initials");

var questionIndex = 0;
var time = questions.length * 15;
var timerId;



function startQuiz() {
    timerId = setInterval(clockTick, 1000);

    //when you click the start button, it shows the start timer

    timer.textContent = time;
    getQuestions();
}

function getQuestions() {
    //receives the question object from array
    var currentQuestion = questions[currentQuestionIndex];

    var title = document.getElementById("question-title");
    title.textContent = currentQuestion.title;

    choices.innerHTML = "";

    currentQuestion.choices.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "choice");
        choiceBtn.setAttribute("value", choice);

        choiceBtn.textContent = i + 1 + ". " + choice;

        choiceBtn.onclick = clickQuestion;

        choices.appendChilt(choiceBtn);
    });
}

function clickQuestion () {
    //if user answers wrong, it takes 10 seconds away from total amount of time
    if (this. value !== question[currentQuestionIndex].answer) {
        time -=10;

        if (time < 0) {
            time = 0;
        }

    }
}

//goes to next question

currentQuestionIndex++;

//checks the time

if (currentQuestionIndex === questions.length) {
    quizEnd();
} else {
    getQuestions();
}

//when the timer stops, it will show the end screen

function quizEnd() {
    //timer stops
    clearInterval(timerId);

    //show end screen
    var screenEnd = document.getElementById("end-screen");
    screenEnd.removeAttribute("class");

    //show final score
    var finalScore = document.getElementById("final-score");
    finalScore.textContent = time;

    //on end screen, hides questions 
    questions.setAttribute("class", "hide");

}

function saveHighscore() {
    //input box value
    var initials = yourName.value.trim();

    if (initials !== "") {
        // from local storage, able to get saved scores and set it as an empty array
        var highscore =
        JSON.parse(window.localStorage.getItem("highscore")) || [];

    }

    //formats new score as an object for user

    var newScore = {
        score: time,
        initials: initials
    };
}