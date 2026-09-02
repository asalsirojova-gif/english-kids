// ======================================
// 🌈 ENGLISH KIDS
// Interactive Learning App
// ======================================

let xp = Number(localStorage.getItem("englishKidsXP")) || 0;
let correctAnswers =
  Number(localStorage.getItem("correctAnswers")) || 0;

let wordsLearned =
  Number(localStorage.getItem("wordsLearned")) || 0;

let lessonsCompleted =
  Number(localStorage.getItem("lessonsCompleted")) || 0;

let gamesPlayed =
  Number(localStorage.getItem("gamesPlayed")) || 0;

let streak =
  Number(localStorage.getItem("streak")) || 0;


// ======================================
// DATA
// ======================================

const vocabulary = [

  {
    word: "Apple",
    translation: "Olma",
    image: "🍎",
    category: "food",
    options: ["Olma", "Kitob", "Mushuk", "Uy"]
  },

  {
    word: "Cat",
    translation: "Mushuk",
    image: "🐱",
    category: "animals",
    options: ["It", "Mushuk", "Qush", "Ot"]
  },

  {
    word: "Dog",
    translation: "It",
    image: "🐶",
    category: "animals",
    options: ["Mushuk", "It", "Sigir", "Baliq"]
  },

  {
    word: "Book",
    translation: "Kitob",
    image: "📚",
    category: "school",
    options: ["Qalam", "Stol", "Kitob", "Sumka"]
  },

  {
    word: "Sun",
    translation: "Quyosh",
    image: "☀️",
    category: "nature",
    options: ["Oy", "Bulut", "Quyosh", "Yulduz"]
  },

  {
    word: "House",
    translation: "Uy",
    image: "🏠",
    category: "all",
    options: ["Maktab", "Uy", "Bog‘", "Do‘kon"]
  },

  {
    word: "Car",
    translation: "Mashina",
    image: "🚗",
    category: "all",
    options: ["Velosiped", "Mashina", "Poyezd", "Samolyot"]
  },

  {
    word: "Fish",
    translation: "Baliq",
    image: "🐟",
    category: "animals",
    options: ["Baliq", "Qush", "Mushuk", "Ot"]
  }

];


const grammar = [

  {
    question: "I ___ a student.",
    options: ["am", "is", "are"],
    answer: "am"
  },

  {
    question: "She ___ happy.",
    options: ["am", "is", "are"],
    answer: "is"
  },

  {
    question: "They ___ friends.",
    options: ["am", "is", "are"],
    answer: "are"
  },

  {
    question: "He ___ a teacher.",
    options: ["am", "is", "are"],
    answer: "is"
  },

  {
    question: "We ___ ready.",
    options: ["am", "is", "are"],
    answer: "are"
  }

];


let currentVocabulary = 0;
let currentGrammar = 0;

let currentGame = 0;


// ======================================
// HELPERS
// ======================================

function getApp() {
  return document.getElementById("app");
}


function saveData() {

  localStorage.setItem(
    "englishKidsXP",
    xp
  );

  localStorage.setItem(
    "correctAnswers",
    correctAnswers
  );

  localStorage.setItem(
    "wordsLearned",
    wordsLearned
  );

  localStorage.setItem(
    "lessonsCompleted",
    lessonsCompleted
  );

  localStorage.setItem(
    "gamesPlayed",
    gamesPlayed
  );

  localStorage.setItem(
    "streak",
    streak
  );

}


function updateXP() {

  const xpElement =
    document.getElementById("xp");

  if (xpElement) {
    xpElement.textContent = xp;
  }

  saveData();
}


function showFeedback(elementId, message, type) {

  const element =
    document.getElementById(elementId);

  if (!element) return;

  element.textContent = message;

  element.className =
    "quiz-result " + type;

}


function speak(text) {

  if ("speechSynthesis" in window) {

    window.speechSynthesis.cancel();

    const speech =
      new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 0.85;

    window.speechSynthesis.speak(speech);

  }

}


// ======================================
// PAGE SYSTEM
// ======================================

function showPage(pageName) {

  const pages =
    document.querySelectorAll(".page");

  pages.forEach(page => {
    page.classList.remove("active");
  });


  const page =
    document.getElementById(pageName);

  if (page) {
    page.classList.add("active");
  }


  if (pageName === "vocabulary") {
    loadWords("all");
  }

  if (pageName === "grammar") {
    renderGrammar();
  }

  if (pageName === "games") {
    newGame();
  }

  if (pageName === "progress") {
    updateProgressPage();
  }

}


// ======================================
// HOME
// ======================================

function showHome() {
  showPage("home");
}


// ======================================
// VOCABULARY
// ======================================

function loadWords(category = "all") {

  const grid =
    document.getElementById("word-grid");

  if (!grid) return;


  let words = vocabulary;

  if (category !== "all") {

    words =
      vocabulary.filter(
        item =>
          item.category === category
      );

  }


  grid.innerHTML = words.map((item, index) => `

    <div class="word-card">

      <div class="word-picture">
        ${item.image}
      </div>

      <h2>
        ${item.word}
      </h2>

      <p>
        ${item.translation}
      </p>

      <button
        class="primary-btn"
        onclick="speak('${item.word}')">

        🔊 Listen

      </button>

    </div>

  `).join("");

}


function showVocabulary() {
  showPage("vocabulary");
}


// ======================================
// GRAMMAR
// ======================================

function renderGrammar() {

  const questionNumber =
    document.getElementById(
      "question-number"
    );

  const question =
    document.getElementById(
      "quiz-question"
    );

  const options =
    document.getElementById(
      "quiz-options"
    );

  const result =
    document.getElementById(
      "quiz-result"
    );

  const next =
    document.getElementById(
      "next-question"
    );


  if (!question || !options) return;


  const item =
    grammar[currentGrammar];


  if (questionNumber) {
    questionNumber.textContent =
      currentGrammar + 1;
  }


  question.textContent =
    item.question;


  options.innerHTML =
    item.options.map(option => `

      <button
        class="option"
        onclick="checkGrammar('${option}')">

        ${option}

      </button>

    `).join("");


  if (result) {
    result.textContent = "";
    result.className = "quiz-result";
  }


  if (next) {
    next.hidden = true;
  }

}


function checkGrammar(answer) {

  const correct =
    grammar[currentGrammar].answer;


  const buttons =
    document.querySelectorAll(
      "#quiz-options .option"
    );


  buttons.forEach(button => {

    button.disabled = true;


    if (
      button.textContent.trim()
      === correct
    ) {

      button.classList.add("correct");

    }

  });


  if (answer === correct) {

    xp += 15;
    correctAnswers++;

    showFeedback(
      "quiz-result",
      "🎉 Correct! +15 XP",
      "success"
    );

    updateXP();

    const next =
      document.getElementById(
        "next-question"
      );

    if (next) {
      next.hidden = false;
    }

  } else {

    buttons.forEach(button => {

      if (
        button.textContent.trim()
        === answer
      ) {

        button.classList.add("wrong");

      }

    });


    showFeedback(
      "quiz-result",
      "🙂 Not quite. Try again!",
      "error"
    );


    const next =
      document.getElementById(
        "next-question"
      );

    if (next) {
      next.hidden = false;
    }

  }

}


function nextQuestion() {
  nextGrammar();
}


function nextGrammar() {

  currentGrammar++;


  if (
    currentGrammar >= grammar.length
  ) {

    currentGrammar = 0;

    lessonsCompleted++;

    saveData();


    const app = getApp();

    app.innerHTML = `

      <div class="word-card">

        <div class="word-picture">
          🎓
        </div>

        <h2>
          Grammar Complete!
        </h2>

        <p>
          Great work! You completed
          the grammar lesson.
        </p>

        <button
          class="primary-btn"
          onclick="showGrammar()">

          Practice Again

        </button>

      </div>

    `;

    return;

  }


  renderGrammar();

}


function showGrammar() {

  showPage("grammar");

}


// ======================================
// GAMES
// ======================================

const gameQuestions = [

  {
    image: "🐱",
    answer: "Cat",
    options: [
      "Cat",
      "Dog",
      "Fish",
      "Bird"
    ]
  },

  {
    image: "🍎",
    answer: "Apple",
    options: [
      "Apple",
      "Book",
      "Car",
      "Tree"
    ]
  },

  {
    image: "🐶",
    answer: "Dog",
    options: [
      "Cat",
      "Dog",
      "Fish",
      "Horse"
    ]
  },

  {
    image: "☀️",
    answer: "Sun",
    options: [
      "Moon",
      "Sun",
      "Cloud",
      "Star"
    ]
  },

  {
    image: "📚",
    answer: "Book",
    options: [
      "Book",
      "Car",
      "House",
      "Apple"
    ]
  }

];


function showGames() {
  showPage("games");
}


function newGame() {

  const picture =
    document.getElementById(
      "game-picture"
    );

  const options =
    document.getElementById(
      "game-options"
    );

  const result =
    document.getElementById(
      "game-result"
    );

  const next =
    document.getElementById(
      "next-game"
    );


  if (!picture || !options) return;


  const item =
    gameQuestions[currentGame];


  picture.textContent =
    item.image;


  options.innerHTML =
    item.options.map(option => `

      <button
        class="option"
        onclick="checkGame('${option}')">

        ${option}

      </button>

    `).join("");


  if (result) {
    result.textContent = "";
    result.className = "quiz-result";
  }


  if (next) {
    next.hidden = true;
  }

}


function checkGame(answer) {

  const correct =
    gameQuestions[currentGame].answer;


  const buttons =
    document.querySelectorAll(
      "#game-options .option"
    );


  buttons.forEach(button => {

    button.disabled = true;


    if (
      button.textContent.trim()
      === correct
    ) {

      button.classList.add("correct");

    }

  });


  gamesPlayed++;


  if (answer === correct) {

    xp += 10;
    correctAnswers++;

    showFeedback(
      "game-result",
      "🎉 Great job! +10 XP",
      "success"
    );

    updateXP();

  } else {

    buttons.forEach(button => {

      if (
        button.textContent.trim()
        === answer
      ) {

        button.classList.add("wrong");

      }

    });


    showFeedback(
      "game-result",
      "😊 Good try! Keep learning!",
      "error"
    );

  }


  const next =
    document.getElementById(
      "next-game"
    );

  if (next) {
    next.hidden = false;
  }


  saveData();

}


function showNextGame() {

  currentGame++;

  if (
    currentGame >= gameQuestions.length
  ) {

    currentGame = 0;

    const app = getApp();

    app.innerHTML = `

      <div class="word-card">

        <div class="word-picture">
          🏆
        </div>

        <h2>
          Amazing!
        </h2>

        <p>
          You completed the game!
        </p>

        <button
          class="primary-btn"
          onclick="showGames()">

          Play Again

        </button>

      </div>

    `;

    return;

  }

  newGame();

}


// HTMLdagi tugma newGame() deb chaqiradi.
// Shu sabab keyingi savol uchun alohida funksiya:

function nextGame() {
  showNextGame();
}


// ======================================
// LESSONS
// ======================================

function showLessons() {

  const app = getApp();

  app.innerHTML = `

    <div class="section-title">

      <h2>
        📖 Lessons
      </h2>

      <p>
        Learn English step by step.
      </p>

    </div>


    <div class="cards">


      <div class="card">

        <div class="picture">
          🔤
        </div>

        <h3>
          Alphabet
        </h3>

        <p>
          Learn the English alphabet.
        </p>

        <button
          class="primary-btn"
          onclick="showLessonMessage('🔤 Alphabet', 'A, B, C, D... Let’s learn the English alphabet!')">

          Open

        </button>

      </div>


      <div class="card">

        <div class="picture">
          🔢
        </div>

        <h3>
          Numbers
        </h3>

        <p>
          Learn numbers from 1 to 20.
        </p>

        <button
          class="primary-btn"
          onclick="showLessonMessage('🔢 Numbers', 'One, two, three... Let’s learn English numbers!')">

          Open

        </button>

      </div>


      <div class="card">

        <div class="picture">
          🎨
        </div>

        <h3>
          Colors
        </h3>

        <p>
          Learn basic English colors.
        </p>

        <button
          class="primary-btn"
          onclick="showLessonMessage('🎨 Colors', 'Red, blue, green, yellow and more!')">

          Open

        </button>

      </div>


      <div class="card">

        <div class="picture">
          🐶
        </div>

        <h3>
          Animals
        </h3>

        <p>
          Learn animal names in English.
        </p>

        <button
          class="primary-btn"
          onclick="showVocabulary()">

          Open

        </button>

      </div>


    </div>

  `;

}


function showLessonMessage(title, text) {

  const app = getApp();

  app.innerHTML = `

    <div class="word-card">

      <div class="word-picture">
        📖
      </div>

      <h2>
        ${title}
      </h2>

      <p>
        ${text}
      </p>

      <button
        class="primary-btn"
        onclick="showLessons()">

        ← Back to Lessons

      </button>

    </div>

  `;

}


// ======================================
// STORIES
// ======================================

function readStory() {

  const text =
    "It is a beautiful morning. " +
    "The sun is shining. " +
    "A little bird is in the tree. " +
    "The bird sings a happy song.";

  speak(text);

}


// ======================================
// DAILY CHALLENGE
// ======================================

function startDailyChallenge() {

  currentVocabulary = 0;

  showVocabulary();

}


// ======================================
// PROGRESS
// ======================================

function updateProgressPage() {

  const xpElement =
    document.getElementById("xp");

  if (xpElement) {
    xpElement.textContent = xp;
  }


  const words =
    document.getElementById(
      "words-count"
    );

  const lessons =
    document.getElementById(
      "lessons-count"
    );

  const games =
    document.getElementById(
      "games-count"
    );

  const streakElement =
    document.getElementById(
      "streak-count"
    );

  const level =
    document.getElementById(
      "level"
    );


  if (words) {
    words.textContent =
      wordsLearned;
  }

  if (lessons) {
    lessons.textContent =
      lessonsCompleted;
  }

  if (games) {
    games.textContent =
      gamesPlayed;
  }

  if (streakElement) {
    streakElement.textContent =
      streak;
  }

  if (level) {

    level.textContent =
      Math.max(
        1,
        Math.floor(xp / 100) + 1
      );

  }

}


function showProgress() {

  showPage("progress");

  updateProgressPage();

}


// ======================================
// INITIALIZE
// ======================================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    updateXP();

    showPage("home");

  }
);
