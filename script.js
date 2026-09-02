// ======================================
// ENGLISH KIDS
// Interactive Learning App
// ======================================

let xp = Number(localStorage.getItem("englishKidsXP")) || 0;
let correctAnswers = Number(localStorage.getItem("correctAnswers")) || 0;

const app = document.getElementById("app");


// ======================================
// DATA
// ======================================

const vocabulary = [
  {
    word: "Apple",
    translation: "Olma",
    image: "🍎",
    options: ["Olma", "Kitob", "Mushuk", "Uy"]
  },
  {
    word: "Cat",
    translation: "Mushuk",
    image: "🐱",
    options: ["It", "Mushuk", "Qush", "Ot"]
  },
  {
    word: "Dog",
    translation: "It",
    image: "🐶",
    options: ["Mushuk", "It", "Sigir", "Baliq"]
  },
  {
    word: "Book",
    translation: "Kitob",
    image: "📚",
    options: ["Qalam", "Stol", "Kitob", "Sumka"]
  },
  {
    word: "Sun",
    translation: "Quyosh",
    image: "☀️",
    options: ["Oy", "Bulut", "Quyosh", "Yulduz"]
  },
  {
    word: "House",
    translation: "Uy",
    image: "🏠",
    options: ["Maktab", "Uy", "Bog‘", "Do‘kon"]
  },
  {
    word: "Car",
    translation: "Mashina",
    image: "🚗",
    options: ["Velosiped", "Mashina", "Poyezd", "Samolyot"]
  },
  {
    word: "Fish",
    translation: "Baliq",
    image: "🐟",
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


// ======================================
// XP
// ======================================

function updateXP() {
  const xpElement = document.querySelector(".xp");

  if (xpElement) {
    xpElement.innerHTML = "⭐ " + xp + " XP";
  }

  localStorage.setItem("englishKidsXP", xp);
  localStorage.setItem("correctAnswers", correctAnswers);
}


// ======================================
// HOME
// ======================================

function showHome() {

  app.innerHTML = `
    <div class="section-title">
      <h2>👋 Welcome to English Kids!</h2>
      <p>Learn English through pictures, games and fun.</p>
    </div>

    <div class="cards">

      <div class="card">
        <div class="picture">📚</div>
        <h3>Vocabulary</h3>
        <p>Learn new English words with pictures.</p>
        <button class="primary-btn" onclick="showVocabulary()">
          Start Learning
        </button>
      </div>

      <div class="card">
        <div class="picture">✏️</div>
        <h3>Grammar</h3>
        <p>Practice simple English grammar.</p>
        <button class="primary-btn" onclick="showGrammar()">
          Practice
        </button>
      </div>

      <div class="card">
        <div class="picture">🎮</div>
        <h3>Mini Games</h3>
        <p>Test your English and collect XP.</p>
        <button class="primary-btn" onclick="showVocabulary()">
          Play
        </button>
      </div>

    </div>
  `;
}


// ======================================
// VOCABULARY
// ======================================

function showVocabulary() {

  const item = vocabulary[currentVocabulary];

  app.innerHTML = `
    <div class="section-title">
      <h2>📚 Vocabulary</h2>
      <p>Choose the correct translation.</p>
    </div>

    <div class="word-card">

      <div class="word-picture">
        ${item.image}
      </div>

      <div class="word">
        ${item.word}
      </div>

      <div class="translation">
        What does "${item.word}" mean?
      </div>

      <div class="options">

        ${item.options.map(option => `
          <button
            class="option"
            onclick="checkVocabulary('${option}')">
            ${option}
          </button>
        `).join("")}

      </div>

      <br>

      <button class="primary-btn" onclick="nextVocabulary()">
        Next ➜
      </button>

    </div>
  `;
}


// ======================================
// CHECK VOCABULARY
// ======================================

function checkVocabulary(answer) {

  const correct = vocabulary[currentVocabulary].translation;

  const buttons = document.querySelectorAll(".option");

  buttons.forEach(button => {
    button.disabled = true;

    if (button.innerText === correct) {
      button.classList.add("correct");
    }
  });

  if (answer === correct) {

    xp += 10;
    correctAnswers++;

    updateXP();

    alert("🎉 Great job! +10 XP");

  } else {

    buttons.forEach(button => {
      if (button.innerText === answer) {
        button.classList.add("wrong");
      }
    });

    alert("😊 Try again next time!");
  }
}


// ======================================
// NEXT WORD
// ======================================

function nextVocabulary() {

  currentVocabulary++;

  if (currentVocabulary >= vocabulary.length) {
    currentVocabulary = 0;

    app.innerHTML = `
      <div class="word-card">

        <div class="word-picture">🏆</div>

        <h2>Excellent!</h2>

        <p>
          You finished the vocabulary lesson!
        </p>

        <br>

        <button class="primary-btn" onclick="showVocabulary()">
          Play Again
        </button>

      </div>
    `;

    return;
  }

  showVocabulary();
}


// ======================================
// GRAMMAR
// ======================================

function showGrammar() {

  const item = grammar[currentGrammar];

  app.innerHTML = `
    <div class="section-title">
      <h2>✏️ Grammar</h2>
      <p>Choose the correct answer.</p>
    </div>

    <div class="question-box">

      <div class="question">
        ${item.question}
      </div>

      <div class="answer-list">

        ${item.options.map(option => `
          <button
            class="option"
            onclick="checkGrammar('${option}')">
            ${option}
          </button>
        `).join("")}

      </div>

      <br>

      <button class="primary-btn" onclick="nextGrammar()">
        Next ➜
      </button>

    </div>
  `;
}


// ======================================
// CHECK GRAMMAR
// ======================================

function checkGrammar(answer) {

  const correct = grammar[currentGrammar].answer;

  const buttons = document.querySelectorAll(".answer-list .option");

  buttons.forEach(button => {

    button.disabled = true;

    if (button.innerText === correct) {
      button.classList.add("correct");
    }

  });

  if (answer === correct) {

    xp += 15;
    correctAnswers++;

    updateXP();

    alert("🎉 Correct! +15 XP");

  } else {

    buttons.forEach(button => {

      if (button.innerText === answer) {
        button.classList.add("wrong");
      }

    });

    alert("🙂 Not quite. Keep practicing!");
  }
}


// ======================================
// NEXT GRAMMAR
// ======================================

function nextGrammar() {

  currentGrammar++;

  if (currentGrammar >= grammar.length) {

    currentGrammar = 0;

    app.innerHTML = `
      <div class="word-card">

        <div class="word-picture">🎓</div>

        <h2>Grammar Complete!</h2>

        <p>You completed this grammar lesson.</p>

        <br>

        <button class="primary-btn" onclick="showGrammar()">
          Practice Again
        </button>

      </div>
    `;

    return;
  }

  showGrammar();
}


// ======================================
// GAMES
// ======================================

function showGames() {

  app.innerHTML = `

    <div class="section-title">
      <h2>🎮 Mini Games</h2>
      <p>Choose a game and collect XP!</p>
    </div>

    <div class="cards">

      <div class="card">

        <div class="picture">🧠</div>

        <h3>Word Challenge</h3>

        <p>
          Test how many English words you know.
        </p>

        <button class="primary-btn"
          onclick="showVocabulary()">
          Start
        </button>

      </div>


      <div class="card">

        <div class="picture">✏️</div>

        <h3>Grammar Challenge</h3>

        <p>
          Choose the correct grammar answer.
        </p>

        <button class="primary-btn"
          onclick="showGrammar()">
          Start
        </button>

      </div>


      <div class="card">

        <div class="picture">🏆</div>

        <h3>My Progress</h3>

        <p>
          See your learning progress.
        </p>

        <button class="primary-btn"
          onclick="showProgress()">
          View
        </button>

      </div>

    </div>
  `;
}


// ======================================
// LESSONS
// ======================================

function showLessons() {

  app.innerHTML = `

    <div class="section-title">

      <h2>📖 Lessons</h2>

      <p>
        Start learning English step by step.
      </p>

    </div>


    <div class="cards">

      <div class="card">

        <div class="picture">🔤</div>

        <h3>Alphabet</h3>

        <p>
          Learn the English alphabet.
        </p>

        <button class="primary-btn"
          onclick="alert('🔤 Alphabet lesson is ready!')">
          Open
        </button>

      </div>


      <div class="card">

        <div class="picture">🔢</div>

        <h3>Numbers</h3>

        <p>
          Learn numbers from 1 to 20.
        </p>

        <button class="primary-btn"
          onclick="alert('🔢 Numbers lesson is coming next!')">
          Open
        </button>

      </div>


      <div class="card">

        <div class="picture">🎨</div>

        <h3>Colors</h3>

        <p>
          Learn basic English colors.
        </p>

        <button class="primary-btn"
          onclick="alert('🎨 Colors lesson is coming next!')">
          Open
        </button>

      </div>


      <div class="card">

        <div class="picture">🐶</div>

        <h3>Animals</h3>

        <p>
          Learn animal names in English.
        </p>

        <button class="primary-btn"
          onclick="showVocabulary()">
          Open
        </button>

      </div>

    </div>
  `;
}


// ======================================
// PROGRESS
// ======================================

function showProgress() {

  const total = vocabulary.length + grammar.length;

  const percentage = Math.min(
    100,
    Math.round((correctAnswers / total) * 100)
  );

  app.innerHTML = `

    <div class="section-title">

      <h2>🏆 My Progress</h2>

      <p>
        Keep learning and collect more XP!
      </p>

    </div>


    <div class="progress-box">

      <h3>⭐ Your XP</h3>

      <p>${xp} XP</p>

      <br>

      <h3>✅ Correct Answers</h3>

      <p>${correctAnswers}</p>

      <br>

      <h3>📈 Progress</h3>

      <div class="progress-bar">

        <div
          class="progress-fill"
          style="width:${percentage}%">
        </div>

      </div>

      <p>${percentage}% completed</p>

    </div>

  `;
}


// ======================================
// MENU SYSTEM
// ======================================

function setupMenu() {

  const buttons = document.querySelectorAll(
    ".menu button, nav button"
  );

  buttons.forEach(button => {

    button.addEventListener("click", () => {

      const text = button.innerText.toLowerCase();

      if (text.includes("vocabulary")) {
        showVocabulary();
      }

      else if (text.includes("grammar")) {
        showGrammar();
      }

      else if (
        text.includes("game") ||
        text.includes("games")
      ) {
        showGames();
      }

      else if (
        text.includes("lesson") ||
        text.includes("lessons")
      ) {
        showLessons();
      }

      else if (
        text.includes("progress") ||
        text.includes("profile")
      ) {
        showProgress();
      }

      else if (
        text.includes("home") ||
        text.includes("bosh")
      ) {
        showHome();
      }

    });

  });

}


// ======================================
// START APP
// ======================================

document.addEventListener("DOMContentLoaded", () => {

  updateXP();

  setupMenu();

  showHome();

});
