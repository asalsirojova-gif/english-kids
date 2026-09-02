* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --primary: #6c63ff;
  --primary-dark: #5148d9;
  --secondary: #8f88ff;

  --background: #f7f8ff;
  --card: #ffffff;

  --text: #20243a;
  --muted: #737891;

  --green: #27ae60;
  --green-light: #e2f8ea;

  --red: #e74c3c;
  --red-light: #ffe5e2;

  --yellow: #fff3cd;
  --yellow-text: #946b00;

  --shadow: 0 12px 35px rgba(48, 54, 100, 0.10);

  --radius: 24px;
}


/* ==============================
   BODY
============================== */

body {
  font-family: Arial, sans-serif;
  background: var(--background);
  color: var(--text);
  min-height: 100vh;
}


/* ==============================
   TOP BAR
============================== */

.topbar {
  width: 100%;
  background: white;

  padding: 16px 25px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);

  position: sticky;
  top: 0;

  z-index: 1000;
}


.brand {
  display: flex;
  align-items: center;
  gap: 8px;

  font-size: 23px;
  font-weight: 800;

  color: var(--primary);

  cursor: pointer;
}


.brand-icon {
  font-size: 28px;
}


.xp-box {
  background: var(--yellow);

  color: var(--yellow-text);

  padding: 10px 16px;

  border-radius: 30px;

  font-weight: 800;
}


/* ==============================
   NAVIGATION
============================== */

.navbar {
  max-width: 1100px;

  margin: 20px auto 0;

  padding: 0 20px;

  display: grid;

  grid-template-columns: repeat(6, 1fr);

  gap: 10px;
}


.navbar button {
  border: none;

  background: white;

  padding: 14px 8px;

  border-radius: 16px;

  cursor: pointer;

  font-size: 14px;

  font-weight: 700;

  color: var(--text);

  box-shadow: var(--shadow);

  transition: 0.2s;
}


.navbar button:hover {
  transform: translateY(-3px);

  color: var(--primary);
}


.navbar button:active {
  transform: scale(0.97);
}


/* ==============================
   MAIN
============================== */

main {
  max-width: 1100px;

  margin: auto;

  padding: 25px 20px 60px;
}


/* ==============================
   PAGES
============================== */

.page {
  display: none;
}


.page.active {
  display: block;
}


/* ==============================
   HERO
============================== */

.hero {
  min-height: 330px;

  margin-bottom: 30px;

  padding: 40px;

  border-radius: 32px;

  color: white;

  background:
    linear-gradient(
      135deg,
      #625ff3,
      #8c88ff
    );

  box-shadow: var(--shadow);

  display: flex;

  justify-content: space-between;

  align-items: center;

  overflow: hidden;
}


.hero-content {
  max-width: 600px;
}


.welcome {
  display: inline-block;

  background: rgba(255,255,255,0.18);

  padding: 8px 14px;

  border-radius: 30px;

  margin-bottom: 15px;

  font-weight: 700;
}


.hero h1 {
  font-size: 42px;

  line-height: 1.1;

  margin-bottom: 15px;
}


.hero h1 span {
  color: #fff5a8;
}


.hero p {
  font-size: 17px;

  line-height: 1.6;

  opacity: 0.95;

  margin-bottom: 25px;
}


/* ==============================
   HERO ART
============================== */

.hero-art {
  width: 280px;
  height: 230px;

  position: relative;
}


.sun {
  position: absolute;

  top: 0;
  right: 20px;

  font-size: 65px;

  animation: float 3s ease-in-out infinite;
}


.cloud {
  position: absolute;

  top: 65px;
  left: 10px;

  font-size: 60px;
}


.book-character {
  position: absolute;

  bottom: 0;
  left: 65px;

  font-size: 100px;

  animation: bounce 2.5s ease-in-out infinite;
}


.pencil {
  position: absolute;

  bottom: 5px;
  right: 20px;

  font-size: 70px;

  transform: rotate(-20deg);
}


@keyframes float {

  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-12px);
  }

}


@keyframes bounce {

  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }

}


/* ==============================
   MAIN BUTTON
============================== */

.main-btn,
.primary-btn,
.challenge button,
.next-btn {
  border: none;

  background: var(--primary);

  color: white;

  padding: 13px 21px;

  border-radius: 14px;

  cursor: pointer;

  font-size: 15px;

  font-weight: 700;

  transition: 0.2s;
}


.main-btn:hover,
.primary-btn:hover,
.challenge button:hover,
.next-btn:hover {
  background: var(--primary-dark);

  transform: translateY(-2px);
}


.main-btn {
  background: white;

  color: var(--primary);
}


.main-btn:hover {
  background: #f5f4ff;
}


/* ==============================
   SECTION TITLE
============================== */

.section-title {
  margin-bottom: 22px;
}


.section-title h2 {
  font-size: 28px;

  margin-bottom: 6px;
}


.section-title p {
  color: var(--muted);

  line-height: 1.5;
}


/* ==============================
   HOME GRID
============================== */

.home-grid {
  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 18px;

  margin-bottom: 25px;
}


.feature-card {
  background: white;

  padding: 22px;

  border-radius: var(--radius);

  box-shadow: var(--shadow);

  cursor: pointer;

  transition: 0.25s;

  border: 2px solid transparent;
}


.feature-card:hover {
  transform: translateY(-6px);

  border-color: var(--primary);
}


.feature-card .big-icon {
  font-size: 55px;

  margin-bottom: 12px;
}


.feature-card h3 {
  margin-bottom: 7px;
}


.feature-card p {
  color: var(--muted);

  font-size: 14px;

  line-height: 1.4;

  margin-bottom: 12px;
}


.feature-card span {
  color: var(--primary);

  font-weight: 800;
}


.pink {
  background: #fff2f5;
}


.blue {
  background: #f0f4ff;
}


.green {
  background: #effbf4;
}


.yellow {
  background: #fff9e8;
}


/* ==============================
   DAILY CHALLENGE
============================== */

.challenge {
  background: white;

  padding: 25px;

  border-radius: var(--radius);

  box-shadow: var(--shadow);

  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 20px;
}


.challenge-label {
  color: var(--red);

  font-size: 13px;

  font-weight: 900;
}


.challenge h2 {
  margin: 7px 0;
}


.challenge p {
  color: var(--muted);
}


/* ==============================
   PAGE HEADING
============================== */

.page-heading {
  display: flex;

  align-items: center;

  gap: 15px;

  margin-bottom: 25px;
}


.page-heading > span {
  font-size: 48px;
}


.page-heading h1 {
  font-size: 32px;

  margin-bottom: 5px;
}


.page-heading p {
  color: var(--muted);
}


/* ==============================
   CATEGORY BUTTONS
============================== */

.category-buttons {
  display: flex;

  flex-wrap: wrap;

  gap: 10px;

  margin-bottom: 25px;
}


.category-buttons button {
  border: 2px solid #e4e5f2;

  background: white;

  padding: 10px 16px;

  border-radius: 30px;

  cursor: pointer;

  font-weight: 700;

  transition: 0.2s;
}


.category-buttons button:hover {
  border-color: var(--primary);

  color: var(--primary);
}


/* ==============================
   WORD GRID
============================== */

.word-grid {
  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 18px;
}


.word-grid .word-card {
  max-width: none;
}


.word-card {
  background: white;

  padding: 30px;

  border-radius: 28px;

  text-align: center;

  box-shadow: var(--shadow);

  margin: auto;
}


.word-picture {
  font-size: 85px;

  margin-bottom: 15px;
}


.word-card h2 {
  margin-bottom: 10px;
}


.word-card > p {
  color: var(--muted);

  font-size: 18px;

  margin-bottom: 18px;
}


.word {
  font-size: 40px;

  font-weight: 800;

  color: var(--primary);
}


.translation {
  font-size: 20px;

  color: var(--muted);

  margin: 10px 0 25px;
}


/* ==============================
   OPTIONS
============================== */

.options,
.quiz-options,
.game-options {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 12px;
}


.option {
  padding: 15px;

  border: 2px solid #e4e5f2;

  background: white;

  border-radius: 15px;

  cursor: pointer;

  font-size: 16px;

  font-weight: 700;

  transition: 0.2s;
}


.option:hover:not(:disabled) {
  border-color: var(--primary);

  transform: translateY(-2px);
}


.option:disabled {
  cursor: default;
}


.option.correct {
  background: var(--green-light);

  border-color: var(--green);

  color: #187a40;
}


.option.wrong {
  background: var(--red-light);

  border-color: var(--red);

  color: #b52d21;
}


/* ==============================
   FEEDBACK
============================== */

.quiz-result {
  min-height: 32px;

  margin-top: 18px;

  padding: 8px;

  border-radius: 12px;

  font-size: 17px;

  font-weight: 800;

  text-align: center;
}


.quiz-result.success {
  background: var(--green-light);

  color: #187a40;
}


.quiz-result.error {
  background: var(--red-light);

  color: #b52d21;
}


/* ==============================
   GRAMMAR LESSON
============================== */

.lesson-card {
  background: white;

  padding: 30px;

  border-radius: var(--radius);

  box-shadow: var(--shadow);

  margin-bottom: 22px;

  text-align: center;
}


.lesson-icon {
  font-size: 70px;

  margin-bottom: 10px;
}


.lesson-card h2 {
  margin-bottom: 10px;
}


.lesson-text {
  color: var(--muted);

  line-height: 1.6;

  margin-bottom: 20px;
}


.grammar-examples {
  display: grid;

  gap: 10px;
}


.grammar-examples div {
  background: #f5f5ff;

  padding: 13px;

  border-radius: 12px;

  font-weight: 600;
}


/* ==============================
   QUIZ
============================== */

.quiz-card,
.question-box {
  max-width: 700px;

  margin: auto;

  background: white;

  padding: 30px;

  border-radius: 25px;

  box-shadow: var(--shadow);

  text-align: center;
}


.quiz-number {
  color: var(--muted);

  font-weight: 700;

  margin-bottom: 15px;
}


.quiz-card h2,
.question {
  font-size: 25px;

  margin-bottom: 25px;
}


.next-btn {
  margin-top: 18px;
}


/* ==============================
   GAMES
============================== */

.game-card {
  max-width: 700px;

  margin: auto;

  background: white;

  padding: 30px;

  border-radius: 28px;

  box-shadow: var(--shadow);

  text-align: center;
}


.game-top {
  display: flex;

  justify-content: space-between;

  gap: 10px;

  margin-bottom: 20px;

  color: var(--primary);

  font-weight: 800;
}


.game-card h2 {
  margin-bottom: 20px;
}


.game-picture {
  width: 170px;
  height: 170px;

  margin: 0 auto 25px;

  border-radius: 30px;

  background: linear-gradient(
    135deg,
    #eef0ff,
    #fff4dd
  );

  display: flex;

  justify-content: center;

  align-items: center;

  font-size: 95px;

  box-shadow: inset 0 0 20px
    rgba(0,0,0,0.04);
}


/* ==============================
   STORIES
============================== */

.story-card {
  max-width: 750px;

  margin: auto;

  background: white;

  padding: 30px;

  border-radius: 28px;

  box-shadow: var(--shadow);
}


.story-picture {
  background: #eff8e9;

  border-radius: 22px;

  padding: 35px;

  text-align: center;

  font-size: 70px;

  margin-bottom: 25px;
}


.story-card h2 {
  margin-bottom: 15px;
}


.story-card p {
  color: var(--muted);

  line-height: 1.7;

  margin-bottom: 15px;

  font-size: 17px;
}


.story-words {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 10px;

  margin: 20px 0 25px;
}


.story-words span {
  background: #f5f5ff;

  padding: 12px;

  border-radius: 12px;

  font-weight: 600;
}


/* ==============================
   PROGRESS
============================== */

.progress-hero {
  background: linear-gradient(
    135deg,
    #625ff3,
    #8c88ff
  );

  color: white;

  text-align: center;

  padding: 35px;

  border-radius: 28px;

  box-shadow: var(--shadow);

  margin-bottom: 22px;
}


.trophy {
  font-size: 75px;

  margin-bottom: 10px;
}


.progress-hero h2 {
  margin-bottom: 8px;
}


.level {
  display: inline-block;

  margin-top: 15px;

  padding: 10px 18px;

  background: rgba(255,255,255,0.18);

  border-radius: 30px;

  font-weight: 800;
}


.stats {
  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 15px;

  margin-bottom: 22px;
}


.stat {
  background: white;

  padding: 22px;

  border-radius: 20px;

  box-shadow: var(--shadow);

  text-align: center;
}


.stat strong {
  display: block;

  font-size: 30px;

  color: var(--primary);

  margin-bottom: 7px;
}


.stat span {
  color: var(--muted);

  font-size: 14px;
}


.achievement {
  background: white;

  padding: 25px;

  border-radius: 25px;

  box-shadow: var(--shadow);
}


.achievement h2 {
  margin-bottom: 20px;
}


.badges {
  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 15px;
}


.badge {
  background: #f7f7ff;

  padding: 20px 10px;

  border-radius: 18px;

  text-align: center;

  font-size: 38px;
}


.badge span {
  display: block;

  margin-top: 8px;

  font-size: 13px;

  font-weight: 700;

  color: var(--muted);
}


/* ==============================
   FOOTER
============================== */

footer {
  text-align: center;

  padding: 30px;

  color: var(--muted);
}


footer p {
  font-size: 20px;

  font-weight: 800;

  color: var(--primary);

  margin-bottom: 5px;
}


/* ==============================
   TABLET
============================== */

@media (max-width: 900px) {

  .navbar {
    grid-template-columns:
      repeat(3, 1fr);
  }


  .home-grid {
    grid-template-columns:
      repeat(2, 1fr);
  }


  .word-grid {
    grid-template-columns:
      repeat(2, 1fr);
  }


  .stats {
    grid-template-columns:
      repeat(2, 1fr);
  }


  .badges {
    grid-template-columns:
      repeat(2, 1fr);
  }


  .hero-art {
    width: 220px;
  }

}


/* ==============================
   MOBILE
============================== */

@media (max-width: 600px) {

  .topbar {
    padding: 13px 14px;
  }


  .brand {
    font-size: 19px;
  }


  .brand-icon {
    font-size: 23px;
  }


  .xp-box {
    padding: 8px 11px;

    font-size: 13px;
  }


  .navbar {
    padding: 0 14px;

    grid-template-columns:
      repeat(2, 1fr);

    gap: 8px;
  }


  .navbar button {
    padding: 12px 5px;

    font-size: 13px;
  }


  main {
    padding: 20px 14px 45px;
  }


  .hero {
    padding: 25px;

    min-height: auto;

    display: block;
  }


  .hero h1 {
    font-size: 31px;
  }


  .hero p {
    font-size: 15px;
  }


  .hero-art {
    width: 100%;

    height: 150px;

    margin-top: 20px;
  }


  .book-character {
    left: 50%;

    transform: translateX(-50%);

    font-size: 75px;
  }


  .book-character {
    animation: none;
  }


  .sun {
    font-size: 45px;

    right: 10%;
  }


  .cloud {
    font-size: 45px;

    left: 5%;
  }


  .pencil {
    font-size: 50px;

    right: 5%;
  }


  .home-grid {
    grid-template-columns: 1fr;

    gap: 13px;
  }


  .challenge {
    display: block;

    padding: 20px;
  }


  .challenge button {
    margin-top: 15px;

    width: 100%;
  }


  .page-heading h1 {
    font-size: 25px;
  }


  .page-heading > span {
    font-size: 38px;
  }


  .word-grid {
    grid-template-columns: 1fr;
  }


  .word-card {
    padding: 25px 18px;
  }


  .word {
    font-size: 32px;
  }


  .word-picture {
    font-size: 75px;
  }


  .options,
  .quiz-options,
  .game-options {
    grid-template-columns: 1fr;
  }


  .quiz-card,
  .question-box,
  .game-card,
  .story-card {
    padding: 22px 16px;
  }


  .game-picture {
    width: 145px;
    height: 145px;

    font-size: 78px;
  }


  .story-words {
    grid-template-columns: 1fr;
  }


  .stats {
    grid-template-columns: 1fr 1fr;

    gap: 10px;
  }


  .stat {
    padding: 18px 8px;
  }


  .stat strong {
    font-size: 25px;
  }


  .badges {
    grid-template-columns: 1fr 1fr;

    gap: 10px;
  }


  .badge {
    padding: 15px 5px;

    font-size: 30px;
  }

    }
