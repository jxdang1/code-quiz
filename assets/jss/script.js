var questions = document.querySelector("#questions");
var timer = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submit = document.querySelector("#submit");
var start = document.querySelector("#start");
var yourName = document.querySelector("#initials");
var feedback = document.querySelector("#feedback");

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;



function startQuiz() {

    //when you click the start button, it hides the start screeen
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");

    //show questions after clicking start
    questions.removeAttribute("class");

    //when you click the start button, it shows the start timer
    timerId = setInterval(clockTick, 1000);
    timer.textContent = time;

    getQuestions();
}

function getQuestions() {
    //receives the question object from array
    var currentQuestion = questions[currentQuestionIndex];

    var title = document.getElementById("question-title");
    title.textContent = currentQuestion.title;

    choicesEl.innerHTML = "";

    currentQuestion.choices.forEach(function(choice, i) {
        //creates button for each choice
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "choice");
        choiceBtn.setAttribute("value", choice);

        choiceBtn.textContent = i + 1 + ". " + choice;

        choiceBtn.onclick = clickQuestion;

        choicesEl.appendChild(choiceBtn);
    });
}

function clickQuestion () {
    //if user answers wrong, it takes 10 seconds away from total amount of time
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -=10;

        if (time < 0) {
            time = 0;
        } 
        timer.textContent = time;
        feedback.textContent = "Incorrect";
    } else {
        feedback.textContent = "Correct";
        }
//shows the word correct or incorrect when selecting answer choices
feedback.setAttribut("class", "feedback");
setTimeout(function() {
    feedback.setAttribute("class", "feedback hide");
}, 1000);

//goes to next question

currentQuestionIndex++;

//checks the time

    if (currentQuestionIndex === questions.length) {
         quizEnd();
    } else {
        getQuestions();
}

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

//function that will update the time

function clockTick() {
    time--;
    timer.textContent = time;

    if (time <=0) {
        quizEnd();
    }
}

//saves score into local storage when quiz is complete

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
    
    // save to local storage

    highscore.push(newScore);
    window.localStorage.setItem("highscore", JSON.stringify(highscore));

    //goes to the next screen for score
    window.location.href = "score.html" ;

}

//function to save highscore with your initials
function checkEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}

//submit initials
submitBtn.onclick = saveHighscore;

//start quiz
startBtn.onclick = startQuiz;

initials.onkeyup = checkEnter;
