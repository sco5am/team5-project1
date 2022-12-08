// Marvel API
// This includes Warfa's public key and MD5 Hash from Marvel APis
var apiUrl =
  "https://gateway.marvel.com/v1/public/comics?ts=1&apikey=2cb5be9eaa4db327d3c0f660dc2b9ea4&hash=aec5b6452f0be1b53ed54e18bd0ea134";
// Console logs Marvel API in the console log
fetch(apiUrl, {
  // The browser fetches the resource from the remote server without first looking in the cache.
  // The browser will then update the cache with the downloaded resource.
  cache: "reload",
})
  .then(function (response) {
    return response.json();
  })
  .then(handleApiMarvel);

const comicListEl = document.getElementById("comic-list");

function handleApiMarvel(data) {
  const results = data.data.results;
  // const comicCover = results[1];
  for (let i = 0; i < results.length; i++) {
    const comic = results[i];
    const comicEl = document.createElement("div");
    comicUrl = comic.thumbnail.path;
    comicEl.innerHTML =
      "<img src =" + comicUrl + "/portrait_xlarge" + ".jpg" + ">";
    comicListEl.appendChild(comicEl);
  }

  console.log(data);
}

// Questions functions and Events

var quizQuestions = [
  {
    question: "Whose power 'exceeds that of the Sorcerer Supreme?'",
    multipleChoice: ["Loki", "Wong", "The Scarlet Witch/Wanda", "Hawkeye"],
    correctAnswer: "The Scarlet Witch/Wanda",
  },
  {
    question: "Who was able to pick up Thors hammer in Endgame?'",
    multipleChoice: ["Loki", "Ironman", "Thanos", "Captain America"],
    correctAnswer: "Captain America",
  },
  {
    question: "What year was 1st spidey comic released?",
    multipleChoice: ["2022", "1955", "1962", "1970"],
    correctAnswer: "1962",
  },
  {
    question: "What is the Hulk's real identity? extra points for full name",
    multipleChoice: [
      "Kristin Brewer",
      "Samuel Oaks",
      "Yizhong Wang",
      "Bruce Banner",
    ],
    correctAnswer: "Bruce Banner",
  },
  {
    question: "Which Marvel movie did Stan Lee NOT have a cameo",
    multipleChoice: [
      " Black Widow",
      " Captain America",
      " Fantastic Four",
      " Iron Man",
    ],
    correctAnswer: " Black Widow",
  },
];

// Some of the timer elements are here for now...
var questionIndex = 0;
var totalAnswer = 5;

var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices");
var startBtn = document.getElementById("start");
var feedbackEl = document.getElementById("feedback");
var collapseEl = document.getElementById("collapse");
var chtrBtn = document.getElementById("chtrBtn");
var characterEl = document.getElementById("character-stuff");

function startQuiz() {
  // after pushing button it hides the start screen
  var startScreenEl = document.getElementById("start");
  startScreenEl.setAttribute("class", "hide");

  questionsEl.removeAttribute("class");

  //   after the start screen is hidden it calls the questions function to load
  askQuestion();
}

function askQuestion() {
  var currentQuestion = quizQuestions[questionIndex];

  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.question;

  choicesEl.innerHTML = "";

  for (var i = 0; i < currentQuestion.multipleChoice.length; i++) {
    var choice = currentQuestion.multipleChoice[i];
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = choice;

    choicesEl.appendChild(choiceNode);
  }
}

function pickAnswer(event) {
  var buttonEl = event.target;

  // if the clicked element is not a choice button, do nothing.
  if (!buttonEl.matches(".choice")) {
    return;
  }

  // check if user guessed wrong
  if (buttonEl.value !== quizQuestions[questionIndex].correctAnswer) {
    feedbackEl.textContent = "Wrong!";
    totalAnswer--;
  } else {
    feedbackEl.textContent = "Correct!";
  }

  // flash right/wrong feedback on page for half a second
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
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
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  var finalScoreEl = document.getElementById("final-score");
  if (totalAnswer <= 2) {
    finalScoreEl.textContent =
      "you got " + totalAnswer + " correct... you stink!";
  } else {
    finalScoreEl.textContent = "you got " + totalAnswer + " correct!";
  }

  collapseEl.setAttribute("class", "hide");

  var resetNode = document.getElementById("reset");
  endScreenEl.appendChild(resetNode);
  resetNode.onclick = reloadPage;
  function reloadPage() {
    window.location.reload();
  }
}
function removeChildren(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

var tableEl = document.getElementById("thisTable");
var characters = [];
var storedCharacters = localStorage.getItem("characters");
if (storedCharacters) {
  characters = JSON.parse(storedCharacters);
}

startBtn.addEventListener("click", startQuiz);
choicesEl.addEventListener("click", pickAnswer);
chtrBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var tableBodyEl = document.getElementById("tableBody");
  removeChildren(tableBodyEl);
  characters.push({
    name: document.getElementById("fname").value, 
    value: document.getElementById("search-input").value,
  })
localStorage.setItem("characters", JSON.stringify(characters));
  for (let i = 0; i < characters.length; i ++) {
    var firstName = characters[i].name;
    var searchValue = characters[i].value;

    var rowEL = document.createElement("tr");
    var rowNumberEl = document.createElement("th");
    var nameEl = document.createElement("td");
    var charEl = document.createElement("td");
    rowEL.appendChild(rowNumberEl);
    rowEL.appendChild(nameEl);
    rowEL.appendChild(charEl);
    rowNumberEl.textContent = i + 1; 
    nameEl.textContent = firstName;
    charEl.textContent = searchValue; 
    tableBodyEl.appendChild(rowEL); 
  }


});

//As the page loads, a random movie poster shows in our movie card
//created array of movie titles related to our quiz characters
var randomMovieArray = [
  "The Incredible Hulk",
  "Doctor Strange",
  "Spider-Man No Way Home",
  "Avengers:Endgame",
  "Black Panther",
];
//randomized movie order
var randomNumber = Math.floor(Math.random() * randomMovieArray.length - 1 + 1);
console.log(randomNumber);
var APIkey2 = "25214ad2";
//gets movie card from HTML
var movieCardEL = document.querySelector("#movieCard");
//function to call img
function getPosterPhoto() {
  var randomMovie = randomMovieArray[randomNumber];
  console.log(randomMovie);
  //establishing api url, &t= calls movie title
  var APIUrl2 = "http://omdbapi.com/?apikey=" + APIkey2 + "&t=" + randomMovie;

  fetch(APIUrl2)
    .then(function (response) {
      console.log("THIS IS RESPONSE: ", response);
      return response.json();
    })
    .then(function (data) {
      console.log("This IS DATA: ", data);
      console.log(data);
      //calls movie poster url
      var posterUrl = data.Poster;
      //removes "" so we can insert link into innerHTML
      var posterUrlLink = posterUrl.replaceAll("", "");
      console.log(posterUrl);
      movieCardEL.innerHTML = "<img src =" + posterUrlLink + ">";
    });
}

getPosterPhoto();
