var questions = document.querySelector("#questions");
var timer = document.querySelector("#time");
var choices = document.querySelector("#choices");
var submit = document.querySelector("#submit");
var start = document.querySelector("#start");
var yourName = document.querySelector("#initials");
var feedback = document.querySelector("#feedback");

var questionIndex = 0;
var time = questions.length * 15;
var timerId;



function startQuiz(){
    timerId = setInterval(clockTick, 1000);

    //when you click the start button, it shows the start timer

    timer.textContent = time;
    
    getQuestions();
}

