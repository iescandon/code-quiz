//variable declarations and values
let timerEl = document.querySelector("#timer");
var startBtn = document.querySelector("#start");
var highscoresBtn = document.querySelector("#highscores");
var openingPg = document.querySelector("#opening-page");
var questionsPg = document.querySelector("#questions-page");
var imgEl = document.querySelector("#img");
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
var highScoresArray = [];
// var choiceBtn;

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
    feedbackEl.classList.add("hide");
    currentQuestionIndex = 0;
    score = 0;
    time = questions.length * 10 + 1;
}

/*function allStorage() {

    var archive = {}, // Notice change here
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        archive[ keys[i] ] = localStorage.getItem( keys[i] );
    }

    return archive;
}*/

// function allStorage() {

//     var archive = [],
//         keys = Object.keys(localStorage),
//         i = 0, key;

//     for (; key = keys[i]; i++) {
//         archive.push( key + '=' + localStorage.getItem(key));
//     }

//     return archive;
// }

function viewHighscores () {
    // var score = allStorage();
    // console.log(score);
    // //{IE: "0", ip: "1"}
    // var tE = document.querySelector(".theseInitials")
    // for (let i = 0; i < score.length; i++) {
    //      console.log(score[i]);
    //      var newLi = document.createElement('p')
    //      newLi.innerHTML = score[i]
    //      tE.append(newLi)
    //     //loop through object and append initials and scores to the pages
        
    // }
    openingPg.classList.add("hide");
    submitHighscoresPg.classList.add("hide");
    viewHighscoresPg.classList.remove("hide");
    initialsEl.innerHTML = "";
    for (var i = 0; i < highScoresArray.length; i++) {
        var initialInput = highScoresArray[i];
        var li = document.createElement("li");
        li.textContent = initialInput;
        initialsEl.prepend(li);
    }
    goBackBtn.addEventListener("click", resetApp);
    clearBtn.addEventListener("click", clear);
}

function submitHighscores () {
    questionsPg.classList.add("hide");
    submitHighscoresPg.classList.remove("hide");
    clearInterval(timerInterval);
    userInitials.value = "";
    timerEl.textContent = "Time: 0";
    scorePercentage = (score * 10) + "%";
    finalscoreEl.textContent = scorePercentage
    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();
        var initials = userInitials.value.trim();
        localStorage.setItem(initials, scorePercentage);
        highScoresArray.push(initials);
        if (initials === "") {
            alert("Initials cannot be blank");
            return;
        }
        viewHighscores();
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
        choice.style.backgroundColor = "red";
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
    startTimer()
    openingPg.classList.add("hide");
    questionsPg.classList.remove("hide");
    getQuestions();
}


//launch functions and event listeners
startBtn.addEventListener("click", startQuestions);
highscoresBtn.addEventListener("click", viewHighscores);