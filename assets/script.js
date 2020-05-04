//variable declarations and values
let timerEl = document.querySelector("#timer");
var startBtn = document.querySelector("#start");
var highscoresBtn = document.querySelector("#highscores");
var openingPg = document.querySelector("#opening-page");
var questionsPg = document.querySelector("#questions-page");
var imgEl = document.querySelector("#img");
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
var highScoresArray = [];

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
    // location.reload();
    viewHighscoresPg.classList.add("hide");
    openingPg.classList.remove("hide");
    currentQuestionIndex = 0;
    score = 0;
    time = (questions.length * 10) + 1;
}

function viewHighscores () {
    openingPg.classList.add("hide");
    submitHighscoresPg.classList.add("hide");
    viewHighscoresPg.classList.remove("hide");
    initialsEl.innerHTML = "";
    for (var i = 0; i < highScoresArray.length; i++) {
        var initialInput = highScoresArray[i];
        var li = document.createElement("li");
        li.textContent = initialInput;
        li.setAttribute("data-index", i);
        initialsEl.prepend(li);
    }
    goBackBtn.addEventListener("click", resetApp);
    clearBtn.addEventListener("click", clear);
}

function init () {
    var storedScores = JSON.parse(localStorage.getItem("initials"));
    if (storedScores !== null) {
        highScoresArray = storedScores
    }
    viewHighscores();
}

function storeHighscores () {
    localStorage.setItem("initials", JSON.stringify(highScoresArray));
    init();
}

function submitHighscores () {
    questionsPg.classList.add("hide");
    submitHighscoresPg.classList.remove("hide");
    clearInterval(timerInterval);
    timerEl.textContent = "Time: 0";
    score = (score * 10) + "%";
    finalscoreEl.textContent = score;
    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();
        if (initials === "") {
            alert("Initials cannot be blank");
            return;
        }
        var initials = userInitials.value.trim();
        highScoresArray.push(initials);
        userInitials.value = "";
        storeHighscores();
    })
}

function analyzeAnswer () {
    var choiceBtns = document.querySelectorAll(".choice");
    for (var i = 0; i < choiceBtns.length; i++) {
        choiceBtns[i].disabled = true;
        choiceBtns[i].classList.add("disabled");
    }
    if (this.value === questions[currentQuestionIndex].answer) {
        score++;
        var choice = this;
        choice.style.backgroundColor = "#3bb300";
        imgEl.setAttribute('src', 'assets/images/correct.png');
        imgEl.setAttribute('style', 'width:200px');
        imgEl.classList.remove("hide");
        continueBtn.classList.remove("hide");
        // setTimeout(function() {
        //     feedbackEl.classList.add("hide");
        // },1000)
    } else {
        time = time - 5;
        timerEl.textContent = "Time: " + time;
        var choice = this;
        choice.style.backgroundColor = "#ff1a1a";
        // var correctAnswer = questions[currentQuestionIndex].answer;
        // console.log(correctAnswer);
        // correctAnswer.style.backgroundColor = "#3bb300";
        imgEl.setAttribute('src', 'assets/images/incorrect.png');
        imgEl.setAttribute('style', 'width:200px;');
        imgEl.classList.remove("hide");
        continueBtn.classList.remove("hide");
        // setTimeout(function() {
        //     feedbackEl.classList.add("hide");
        // },1000)
    }
    currentQuestionIndex++;
    continueBtn.addEventListener("click", getQuestions);
}

function getQuestions () {
    imgEl.classList.add("hide");
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
    startTimer();
    openingPg.classList.add("hide");
    questionsPg.classList.remove("hide");
    getQuestions();
}

//launch functions and event listeners
startBtn.addEventListener("click", startQuestions);
highscoresBtn.addEventListener("click", viewHighscores);