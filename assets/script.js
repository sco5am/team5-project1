// Marvel API
// This includes Warfa's public key and MD5 Hash from Marvel APis
var apiUrl ="https://gateway.marvel.com/v1/public/characters?ts=1&apikey=2cb5be9eaa4db327d3c0f660dc2b9ea4&hash=aec5b6452f0be1b53ed54e18bd0ea134";

// Console logs Marvel API in the console log
fetch(apiUrl, {
  // The browser fetches the resource from the remote server without first looking in the cache.
  // The browser will then update the cache with the downloaded resource.
  cache: 'reload',
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });


// Questions functions and Events

var quizQuestions =[
	{
		question: "Whose power 'exceeds that of the Sorcerer Supreme?'",
		multipleChoice: [
			'Loki',
			'Wong',
			'The Scarlet Witch/Wanda',
      'Hawkeye'
		],
		correctAnswer: 'The Scarlet Witch/Wanda'
	}
];

// Some of the timer elements are here for now...
var questionIndex = 0;

var questionsEl = document.getElementById('questions');
var choicesEl = document.getElementById('choices');
var startBtn = document.getElementById('start');

function startQuiz() {
// after pushing button it hides the start screen
    var startScreenEl = document.getElementById('start');
      startScreenEl.setAttribute('class', 'hide');
    
    questionsEl.removeAttribute('class');
    

//   after the start screen is hidden it calls the questions function to load
    askQuestion();
}

function askQuestion() {
    var currentQuestion = quizQuestions[questionIndex];
  
    var titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.question;
  
    choicesEl.innerHTML = '';
  
    for (var i = 0; i < currentQuestion.multipleChoice.length; i++) {
    
      var choice = currentQuestion.multipleChoice[i];
      var choiceNode = document.createElement('button');
      choiceNode.setAttribute('class', 'choice');
      choiceNode.setAttribute('value', choice);
  
      choiceNode.textContent = choice;

      choicesEl.appendChild(choiceNode);
    }
  }

  startBtn.addEventListener("click", startQuiz);