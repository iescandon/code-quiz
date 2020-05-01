//variable declarations and values
let timerEl = document.querySelector("#timer");
var startBtn = document.querySelector("#start");
var highscoresBtn = document.querySelector("#highscores");
var openingPg = document.querySelector("#opening-page");
var questionsPg = document.querySelector("#questions-page");
var feedbackEl = document.querySelector("#feedback");
var submitHighscoresPg = document.querySelector("#submit-highscores-page");
var viewHighscoresPg = document.querySelector("#view-highscores-page");
var questionEl = document.querySelector("#question");
var choicesEl = document.querySelector("#choices");
var continueBtn = document.querySelector("#continue");
var finalscoreEl = document.querySelector("#finalscore");
var submitBtn = document.querySelector("#submit");
var userInitials = document.querySelector("#inputInitials");
var initialsEl = document.querySelector("#initials");
var goBackBtn = document.querySelector("#go-back");
var clearBtn = document.querySelector("#clear-highscores");
var currentQuestionIndex = 0;
var score = 0;
var time = (questions.length * 10) + 1;
var timerInterval = 0;

//logic
function startTimer() {
    timerInterval = setInterval(function() {
        time--;
        timerEl.textContent = "Time: " + time;
        if(time === 0) {
          clearInterval(timerInterval);
          sendMessage();
        }
      }, 1000);
}

function sendMessage () {
    alert("TIME'S UP!");
    submitHighscores();
}

function clear () {
    window.localStorage.clear();
    initialsEl.innerHTML = "";
}

function resetApp () {
    viewHighscoresPg.classList.add("hide");
    openingPg.classList.remove("hide");
    feedbackEl.classList.add("hide");
    currentQuestionIndex = 0;
    score = 0;
}

//prevent default doesnt work when submitBtn function isnt working.
function viewHighscores (event) {
    event.preventDefault();
    openingPg.classList.add("hide");
    submitHighscoresPg.classList.add("hide");
    viewHighscoresPg.classList.remove("hide");
    var initials = localStorage.getItem("initials", initials);
    var newDiv = document.createElement("div");
    newDiv.textContent = initials;
    initialsEl.prepend(newDiv);
    goBackBtn.addEventListener("click", resetApp);
    clearBtn.addEventListener("click", clear);
}

function submitHighscores () {
    questionsPg.classList.add("hide");
    submitHighscoresPg.classList.remove("hide");
    clearInterval(timerInterval);
    time = questions.length * 10 + 1;
    timerEl.textContent = "Time: 0";
    finalscoreEl.textContent = (score * 10) + "%";
    // submitBtn.addEventListener("click", viewHighscores);
    submitBtn.addEventListener("click", function (event) {
        var initials = userInitials.value;
        if (initials === "") {
            alert("Initials cannot be blank");
            event.preventDefault();
        } else {
        localStorage.setItem("initials", initials);
        console.log("success");
        viewHighscores();
        }
    })
}

function analyzeAnswer () {
    if (this.value === questions[currentQuestionIndex].answer) {
        score++;
        feedbackEl.classList.remove("hide");
        continueBtn.classList.remove("hide");
        feedbackEl.textContent = "Correct!";
    } else {
        time = time - 5;
        timerEl.textContent = "Time: " + time;
        feedbackEl.classList.remove("hide");
        continueBtn.classList.remove("hide");
        feedbackEl.textContent = "Incorrect!";
    }
    currentQuestionIndex++;
    continueBtn.addEventListener("click", getQuestions);
}

function getQuestions () {
    feedbackEl.classList.add("hide");
    continueBtn.classList.add("hide");
    if (currentQuestionIndex === questions.length) {
        submitHighscores ();
    } else {
        var currentQuestion = questions[currentQuestionIndex];
        questionEl.textContent = currentQuestion.title;
        choicesEl.innerHTML = "";
        currentQuestion.choices.forEach(function (choice) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "choice");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = choice;
        choicesEl.append(choiceBtn);
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
highscoresBtn.addEventListener("click", viewHighscores);