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
    currentQuestionIndex = 0;
    score = 0;
    time = (questions.length * 10) + 1;
}

function viewHighscores () {
    var storedScores = JSON.parse(localStorage.getItem("initialValues"));
    clearInterval(timerInterval);
    timerEl.textContent = "Time: 0";
    openingPg.classList.add("hide");
    questionsPg.classList.add("hide");
    submitHighscoresPg.classList.add("hide");
    viewHighscoresPg.classList.remove("hide");
    initialsEl.innerHTML = "";
    if (storedScores !== null) {
        for (var i = 0; i < storedScores.length; i++) {
        var li = document.createElement("li");
        li.textContent = `initials: ${storedScores[i].initials} score: ${storedScores[i].value}`;
        initialsEl.prepend(li);
        }
    }
    goBackBtn.addEventListener("click", resetApp);
    clearBtn.addEventListener("click", clear);
}

function submitHighscores () {
    var highScoresArray = [];
    var initialValues = localStorage.getItem("initialValues")
    if (initialValues !== null) {
        highScoresArray = JSON.parse(initialValues);
    }
    let userInfo = {
    initials: userInitials.value.trim(),
    value: score
    }
    highScoresArray.push(userInfo);
    userInitials.value = "";
    localStorage.setItem("initialValues", JSON.stringify(highScoresArray));
    viewHighscores();
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
        imgEl.setAttribute("src", "assets/images/correct.png");
        imgEl.setAttribute("alt", "Correct!")
        imgEl.setAttribute("style", "width:200px");
        imgEl.classList.remove("hide");
        continueBtn.classList.remove("hide");
    } else {
        time = time - 5;
        timerEl.textContent = "Time: " + time;
        var choice = this;
        choice.style.backgroundColor = "#ff1a1a";
        imgEl.setAttribute("src", "assets/images/incorrect.png");
        imgEl.setAttribute("alt", "Incorrect!")
        imgEl.setAttribute("style", "width:200px;");
        imgEl.classList.remove("hide");
        continueBtn.classList.remove("hide");
        for (var i = 0; i < choiceBtns.length; i++) {
            if (choiceBtns[i].value === questions[currentQuestionIndex].answer) {
                choiceBtns[i].style.backgroundColor = "#3bb300";
            }
        }
    }
    currentQuestionIndex++;
    continueBtn.addEventListener("click", getQuestions);
}

function getQuestions () {
    imgEl.classList.add("hide");
    continueBtn.classList.add("hide");
    if (currentQuestionIndex === questions.length) {
        questionsPg.classList.add("hide");
        submitHighscoresPg.classList.remove("hide");
        clearInterval(timerInterval);
        timerEl.textContent = "Time: 0";
        score = (score * 10) + "%";
        finalscoreEl.textContent = score;
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
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    if (userInitials.value === "") {
        alert("Initials cannot be blank");
        return;
    }
    submitHighscores ()
})