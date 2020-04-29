//variable declarations and values
let timerEl = document.querySelector("#timer");
var startBtn = document.querySelector("#start");
var openingPg = document.querySelector("#opening-page");
var questionsPg = document.querySelector("#questions-page");
var feedbackEl = document.querySelector("#feedback");
var submitHighscoresPg = document.querySelector("#submit-highscores-page");
var viewHighscoresPg = document.querySelector("#view-highscores-page");
var questionEl = document.querySelector("#question");
var choicesEl = document.querySelector("#choices");
var finalscoreEl = document.querySelector("#finalscore");
var submitBtn = document.querySelector("#submit");
var goBackBtn = document.querySelector("#go-back");
var clearBtn = document.querySelector("#clear-highscores");
var currentQuestionIndex = 0;
var score = 0;
var time = questions.length * 10;

//logic
function startTimer() {
    timerEl.textContent = "Time: " + time;
    //add timer here
}

function reset () {
    viewHighscoresPg.classList.add("hide");
    openingPg.classList.remove("hide");
    currentQuestionIndex = 0;
    score = 0;
    time = questions.length * 10;
    timerEl.textContent = "Time: 0";
}

function viewHighscores (event) {
    event.preventDefault();
    submitHighscoresPg.classList.add("hide");
    viewHighscoresPg.classList.remove("hide");
    goBackBtn.addEventListener("click", reset)

}

function submitHighscores () {
    questionsPg.classList.add("hide");
    submitHighscoresPg.classList.remove("hide");
    finalscoreEl.textContent = (score * 10) + "%";
    submitBtn.addEventListener("click", viewHighscores);
    feedbackEl.classList.add("hide");
}

function analyzeAnswer () {
    if (this.value === questions[currentQuestionIndex].answer) {
        score++;
        feedbackEl.classList.remove("hide");
        feedbackEl.textContent = "Correct";
    } else {
        time = time - 5;
        timerEl.textContent = "Time: " + time;
        feedbackEl.classList.remove("hide");
        feedbackEl.textContent = "Incorrect";
    }
    currentQuestionIndex++;
    // feedbackEl.classList.add("hide");
    getQuestions();
}

function getQuestions () {
    if (currentQuestionIndex === questions.length) {
        submitHighscores ();
    } else {
        var currentQuestion = questions[currentQuestionIndex];
        questionEl.textContent = currentQuestion.title;
        choicesEl.innerHTML = "";
        currentQuestion.choices.forEach(function (choice) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "choice");
        choiceBtn.setAttribute("value", choice)
        choiceBtn.textContent = choice;
        choicesEl.appendChild(choiceBtn);
        choiceBtn.addEventListener("click", analyzeAnswer);
    })
    }
}

function startQuestions () {
    startTimer()
    openingPg.classList.add("hide");
    questionsPg.classList.remove("hide");
    getQuestions();
}


//launch functions and event listeners
startBtn.addEventListener("click", startQuestions);