// Marvel API
// This includes Warfa's public key and MD5 Hash from Marvel APis
var apiUrl ="https://gateway.marvel.com/v1/public/comics?ts=1&apikey=2cb5be9eaa4db327d3c0f660dc2b9ea4&hash=aec5b6452f0be1b53ed54e18bd0ea134";

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
    comicEl.textContent = comic.title;
    comicListEl.appendChild(comicEl);
  }

  console.log(data);
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
  },
  {
    question: "Who was able to pick up Thors hammer in Endgame?'",
		multipleChoice: [
			'Loki',
			'Ironman',
			'Thanos',
      'Captain America'
		],
    correctAnswer: 'Captain America'
  },
  {
		
    question: "What year was 1st spidey comic released?",
		multipleChoice: [
			'2022',
			'1955',
			'1962',
      '1970'
		],
		correctAnswer: '1962',
	},
  {
		
    question: "What is the Hulk's real identity? extra points for full name",
		multipleChoice: [
			'Kristin Brewer',
			'Samuel Oaks',
			'Yizhong Wang',
      'Bruce Banner'
		],
		correctAnswer: 'Bruce Banner',
	},
  {
		
    question: "What is the most recent Marvel movie",
		multipleChoice: [
			' Fetch recent movie from OMDB',
			' Fetch recent movie from OMDB',
			' Fetch recent movie from OMDB',
      ' Fetch recent movie from OMDB'
		],
		correctAnswer: ' Fetch recent movie from OMDB #2',
	},
];

// Some of the timer elements are here for now...
var questionIndex = 0;


var questionsEl = document.getElementById('questions');
var choicesEl = document.getElementById('choices');
var startBtn = document.getElementById('start');
var feedbackEl = document.getElementById('feedback');
var responseEl = document.getElementById('response');
var nextBtn = document.getElementById('next-btn');
var quizEl = document.getElementById('quiz');
var collapseEl = document.getElementById('collapse');



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

  function pickAnswer(event) {
    var buttonEl = event.target;

    // if the clicked element is not a choice button, do nothing.
    if (!buttonEl.matches('.choice')) {
      return;
    }
  
    // check if user guessed wrong
    if (buttonEl.value !== quizQuestions[questionIndex].correctAnswer) {
     
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
    questionIndex++;
  
    // check if we've run out of questions
    if (questionIndex === quizQuestions.length) {
      results();
    } else {
      askQuestion();
    }
}

  function results() {
    var endScreenEl = document.getElementById('end-screen');
    endScreenEl.removeAttribute('class');

    var finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = '3';

    quizEl.setAttribute('class', 'hide');
    collapseEl.setAttribute('class', 'hide');
    
    var resetNode = document.createElement('button')
    endScreenEl.appendChild(resetNode)
    resetNode.onclick= reloadPage;
    function reloadPage(){
      window.location.reload();
    }
  }

  nextBtn.addEventListener('click', askQuestion)

  startBtn.addEventListener("click", startQuiz);
  choicesEl.addEventListener("click", pickAnswer);
