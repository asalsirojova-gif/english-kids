let xp = 0;

function startLearning() {
  alert("🚀 Let's start learning English!");
  addXP(10);
}

function openSection(section) {
  alert("📚 " + section + " is coming soon!");
  addXP(5);
}

function startChallenge() {
  alert("🔥 Daily Challenge started!\n\nLearn 5 new English words today!");
  addXP(20);
}

function addXP(amount) {
  xp += amount;

  const xpElement = document.querySelector(".xp");

  if (xpElement) {
    xpElement.textContent = "⭐ " + xp + " XP";
  }
}
