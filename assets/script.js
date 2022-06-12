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
]

function hideElement (section) {
    section.style.display = "none"
}

function showElement (section) {
    section.style.display = "block"
}

function showNextQuestion() {
    var question = questions[nextQuestion]
    document.getElementById("question-title").innerHTML = question.title
    var ul = document.querySelector("#questions ul")
    ul.innerHTML = ""
    for(var i=0; i<question.choices.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = question.choices[i];
        ul.append(li)

    }
}

function startQuiz () {
    hideElement(startSection)
    hideElement(answerOutcome)
    showElement(questionsSection)
    showNextQuestion()

}
