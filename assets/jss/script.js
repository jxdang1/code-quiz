var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitButton = document.querySelector("#submit");
var startButton = document.querySelector("#start");
var yourInitials= document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

var currentQuestionIndex = 0;

//total time of quiz overall (there are 10 questions, therefore, 100 seconds in total )
var time = questions.length * 10;
var timerId;



function startQuiz() {

    //when you click the start button, it hides the start screeen
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");

    //show questions after clicking start
    questionsEl.removeAttribute("class");

    //when you click the start button, it shows the start timer
    timerId = setInterval(clockTick, 1000);
    timerEl.textContent = time;

    getQuestions();
}

function getQuestions() {
    //receives the question object from array
    var currentQuestion = questions[currentQuestionIndex];

    var titleEl = document.getElementById("question-header");
    titleEl.textContent = currentQuestion.title;
    
    //clears question choices
    choicesEl.innerHTML = "";

    currentQuestion.choices.forEach(function(choice, i) {
        //creates button for each choice
        var choiceButton = document.createElement("button");
        choiceButton.setAttribute("class", "choice");
        choiceButton.setAttribute("value", choice);

        choiceButton.textContent = i + 1 + ". " + choice;

        choiceButton.onclick = clickQuestion;

        choicesEl.appendChild(choiceButton);
    });
}

function clickQuestion () {
    //if user answers wrong, it takes 10 seconds away from total amount of time
    if (this.value !== questions[currentQuestionIndex].answer) {
        // penalize time
        time -= 15;
    
        if (time < 0) {
          time = 0;
        }
        // display incorrect/correct under question container when user chooses an answer
        timerEl.textContent = time;
        feedbackEl.textContent = "Incorrect";
        feedbackEl.style.color = "red";
      } else {
        feedbackEl.textContent = "Correct";
        feedbackEl.style.color = "green";
      }
//shows the word correct or incorrect when selecting answer choices
feedbackEl.setAttribute("class", "feedback");
setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
}, 500);

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
    //questions.setAttribute("class", "hide");

}

//function that will update the time

function clockTick() {
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
        quizEnd();
    }
}

//saves score into local storage when quiz is complete

function saveHighscore() {
    //input box value
    var initials = yourInitials.value.trim();

    if (initials !== "") {
        // from local storage, able to get saved scores and set it as an empty array
        var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];


    //formats new score as an object for user

    var newScore = {
        score: time,
        initials: initials
    };
    
    // save to local storage

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    //goes to the next screen for score
    window.location.href = "score.html" ;
    }   
}

//function to save highscore with your initials
function checkEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
    }
}

//submit initials
submitButton.onclick = saveHighscore;

//start quiz
startButton.onclick = startQuiz;

