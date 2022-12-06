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
  .then(handleApiMarvel);
      
const comicListEl = document.getElementById("comic-list");

function handleApiMarvel(data) {
  const results = data.data.results;

  for (let i = 0; i < results.length; i++) {
    const comic = results[i];
    const comicEl = document.createElement("div");
    comicEl.textContent = comic.name;
    comicListEl.appendChild(comicEl);
  }
};




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
var feedbackEl = document.getElementById('feedback')

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

  function questionClick(event) {
    var buttonEl = event.target;
  
    // if the clicked element is not a choice button, do nothing.
    if (!buttonEl.matches('.choice')) {
      return;
    }
  
    // check if user guessed wrong
    if (buttonEl.value !== question[questionIndex].correctAnswer) {
      
      feedbackEl.textContent = 'Wrong!';
    } else {
     
  
      feedbackEl.textContent = 'Correct!';
    }
  
    // flash right/wrong feedback on page for half a second
    feedbackEl.setAttribute('class', 'feedback');
    setTimeout(function () {
      feedbackEl.setAttribute('class', 'feedback hide');
    }, 1000);
  
    // move to next question
    currentQuestionIndex++;
  
    // check if we've run out of questions
    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
  }

  startBtn.addEventListener("click", startQuiz);