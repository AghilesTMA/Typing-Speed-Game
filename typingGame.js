//defining variables:
const difficulty = document.querySelector("#select");
const timeLeft = document.querySelector(".timeLeft");
const scoreNum = document.querySelector(".scoreNum");
const playBtn = document.querySelector(".playBtn");
const word = document.querySelector(".word");
const typing = document.querySelector(".typing");
const words = document.querySelector(".words");
const gameContent = document.querySelector(".gameContent");
let difficultyTime = 60;
// const result = document.querySelector(".result");
const gameWords = [
  "leetcode",
  "github",
  "meta",
  "javascript",
  "assembly",
  "linkedin",
  "spaceX",
  "Tesla",
  "software",
  "programming",
  "calculus",
  "algebra",
  "algorithms",
  "systems",
  "backend",
  "frontend",
  "fullstack",
  "development",
  "databases",
  "cryptography",
  "transistor",
  "compiler",
  "network",
  "robotics",
  "internet",
  "storage",
  "Architecture",
  "Processing",
  "Complexity",
  "Kernel",
  "Cybersecurity",
  "Web",
  "computer",
  "smart",
  "Bitcoin",
  "Debugging",
  "Graph",
  "Array",
  "Virtualization",
  "Probability",
  "Linear",
  "Abstraction",
  "Matrices",
  "Geometry",
  "theory",
  "Model",
  "Proof",
  "Automation",
  "Intelligence",
  "statistics"
];
//game logic:
difficulty.addEventListener("change", (e) => {
  let dif = e.target.value;
  if (dif == "medium") {
    timeLeft.innerHTML = "40";
    difficultyTime = 40;
  } else if (dif == "hard") {
    timeLeft.innerHTML = "25";
    difficultyTime = 25;
  } else {
    timeLeft.innerHTML = "60";
    difficultyTime = 60;
  }
});
playBtn.addEventListener("click", (e) => {
  playBtn.innerHTML = "Play Again";
  words.innerHTML = "";
  typing.disabled = false;
  difficulty.disabled = true;
  typing.focus();
  for (let i = 0; i < gameWords.length; i++) {
    let div = document.createElement("div");
    div.textContent = gameWords[i];
    div.classList.add("card");
    words.appendChild(div);
  }
  word.classList.remove("hide");
  playBtn.classList.add("hide");
  playGame();
});
function playGame() {
  genWord();
  timeLeft.innerHTML = difficultyTime;
  let result = document.querySelector(".result");
  typing.value = "";
  scoreNum.innerHTML = "";
  if (result) {
    result.remove();
  }
  let gameStart = setInterval(() => {
    timeLeft.innerHTML--;
    if (timeLeft.innerHTML === "0") {
      clearInterval(gameStart);
      typing.blur();
      let div = document.createElement("div");
      div.textContent = "Bad luck,You lost!!";
      div.classList.add("result");
      div.classList.add("loser");
      gameContent.appendChild(div);
      typing.disabled = true;
      difficulty.disabled = false;
      playBtn.classList.remove("hide");
    } else if (scoreNum.innerHTML === "30") {
      clearInterval(gameStart);
      typing.disabled = true;
      let winDiv = document.createElement("div");
      winDiv.textContent = "Congratz,You win!!";
      winDiv.classList.add("result");
      winDiv.classList.add("winner");
      gameContent.appendChild(winDiv);
      difficulty.disabled = false;
      playBtn.classList.remove("hide");
    } else {
      typing.addEventListener("input", (e) => {
        if (typing.value.toLowerCase() == word.textContent.toLowerCase()) {
          scoreNum.innerHTML++;
          genWord();
          typing.value = "";
        }
      });
    }
  }, 1000);
}
function genWord() {
  let currWord = gameWords[Math.floor(Math.random() * gameWords.length)];
  word.textContent = currWord;
}
// prevent paste into input field:
typing.addEventListener("paste", (e) => {
  e.preventDefault();
});
