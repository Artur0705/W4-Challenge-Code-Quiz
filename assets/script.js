var startSection = document.getElementById("start");
var questionsSection = document.getElementById("questions");
var allDoneSection = document.getElementById("all-done");
var answerOutcome = document.getElementById("answer-outcome");
var timerElement = document.getElementById("timer");
var quizSection = document.getElementById("quiz");
var scoresSection = document.getElementById("scores");


var score = 0
var nextQuestion = 0

var questions = [
    {
        title: "Commonly used data types DO NOT include",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: 2
    },

    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["parentheses", "quotes", "curly brackets", "square brackets"],
        answer: 0
    },

    {   title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: 3
    },

    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: 2
    },

    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: 3
    },
]

var timer
var timePerQuestion = 20
var timerCount = questions.length * timePerQuestion

function hideElement (section) {
    section.style.display = "none"
}

function showElement (section) {
    section.style.display = "block"
}

function showNextQuestion() {
    if(questions.length <= nextQuestion) {
        finishQuiz()
        return

    }

    
    var question = questions[nextQuestion]
    document.getElementById("question-title").innerHTML = question.title
    var ul = document.querySelector("#questions ul")
    ul.innerHTML = ""
    for(var i=0; i<question.choices.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = (i+1) + ". " + question.choices[i];
        li.setAttribute("data-index", i);
        li.addEventListener("click", onOptionClick)
        ul.append(li)

    }
}

function onOptionClick (event) {
    var choice = parseInt(event.target.getAttribute("data-index"))
    var question = questions[nextQuestion]

    if(choice == question.answer) {
        answerOutcome.innerHTML = "Correct!"
        score++
    }
    else {
        answerOutcome.innerHTML = "Wrong!"
        timerCount -= timePerQuestion 
    }
    nextQuestion++
    showElement(answerOutcome)
    showNextQuestion()
}

function setTimeValue(val) {
    timerElement.textContent = "Time: " + val;

}

function startTimer() {
    setTimeValue(timerCount)
    timer = setInterval(function() {
      timerCount--;
      setTimeValue(timerCount)
      if (timerCount === 0) {
        clearInterval(timer);
        finishQuiz();
      }
    }, 1000);
  }

function startQuiz () {
    timerCount = questions.length * timePerQuestion
    hideElement(startSection)
    showElement(questionsSection)
    showNextQuestion()
    startTimer()
}

function finishQuiz() {
    clearInterval(timer);
    hideElement(questionsSection)

    document.getElementById("final-score").textContent = score
    nextQuestion = 0
    showElement(allDoneSection)
    
}

function saveScore(event) {
    event.preventDefault()
    var input = event.target.querySelector("input")
    var result = {
        score,
        initials: input.value
    }

    var scores = JSON.parse(localStorage.getItem("scores")) || []
    scores.push(result)
    score = 0
    setTimeValue(0)
    input.value = ""
    
    localStorage.setItem("scores", JSON.stringify(scores))
    viewHighScores(event)
}

function viewHighScores(event) {
    event.preventDefault()
    hideElement(quizSection)

    renderHighScores()
    showElement(scoresSection)
}

function renderHighScores() {
    var ul = document.querySelector("#scores ul")
    var scores = JSON.parse(localStorage.getItem("scores")) || []
    scores = sortScores(scores)
    ul.innerHTML = ""
    for(var i=0; i<scores.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = (i+1) + ". " + scores[i].initials + " - " +scores[i].score;
        ul.append(li)

    }
}

function clearHighScores() {
    localStorage.setItem("scores", JSON.stringify([]))
    renderHighScores()
}

function viewQuiz() {
    hideElement(scoresSection)
    hideElement(allDoneSection)
    hideElement(answerOutcome)
    hideElement(questionsSection)
    showElement(startSection)
    showElement(quizSection)
}

function sortScores(scores) {
    return scores.sort(function (a, b){
        return b.score - a.score

    })

}


