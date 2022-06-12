var startSection = document.getElementById("start")
var questionsSection = document.getElementById("questions")
var allDoneSection = document.getElementById("all-done")
var answerOutcome = document.getElementById("answer-outcome")

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
        li.innerHTML = question.choices[i];
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
    }
    else {
        answerOutcome.innerHTML = "Wrong!"
    }
    nextQuestion++
    showElement(answerOutcome)
    showNextQuestion()
}

function startQuiz () {
    hideElement(startSection)
    showElement(questionsSection)
    showNextQuestion()

}

function finishQuiz() {
    hideElement(questionsSection)
    showElement(allDoneSection)
}

