const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const pieceElement = document.getElementById("piece");
const titleElement = document.getElementById("title");
const footerElement = document.getElementById("footer");
pieceElement.disabled = true;
const startGameButtonElement = document.getElementById("startGameButton")
const countdownElement = document.getElementById("countdown");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const TRANSITION = "all .2s";
const TRANSITION_TIME = 200;
const BORDER = "1em double rgb(40,40,40)";
const WIDTH = "5em";
const HEIGHT = "5em";
const MAX = 90;
const MIN = 10;
const DURATION = 30;
const START_SCORE = 0;

let seconds = DURATION;
let score = START_SCORE;


function updateTimer() {
    timerDisplay.textContent = seconds;
    seconds--;

    if (seconds < 0) {
      clearInterval(interval);
      endGame();
    }
}

function updateScore() {
    scoreDisplay.textContent = score;
}

function generatePiece(){
    pieceElement.style.top = String(Math.floor(Math.random() * (MAX - MIN)) + MIN) + "%";
    pieceElement.style.left = String(Math.floor(Math.random() * (MAX - MIN)) + MIN) + "%";
    
    pieceElement.style.border = BORDER;
    pieceElement.style.width = WIDTH;
    pieceElement.style.height = HEIGHT;

}


async function startGame() {    
    startGameButtonElement.style.transform = "scale(0)";
    startGameButtonElement.disabled = true;

    titleElement.style.transition = "transform .5s";
    titleElement.style.transform = "scale(0)";

    footerElement.style.transition = "transform .5s";
    footerElement.style.transform = "scale(0)";

    pieceElement.disabled = false;

    await delay(500);

    countdownElement.style.opacity = "1"
    countdownElement.innerHTML = "3";
    await delay(500);
    countdownElement.style.opacity = "0"
    await delay(500);
    countdownElement.style.opacity = "1"

    countdownElement.innerHTML = "2";
    await delay(500);
    countdownElement.style.opacity = "0"
    await delay(500);
    countdownElement.style.opacity = "1"

    countdownElement.innerHTML = "1";
    await delay(500);
    countdownElement.style.opacity = "0"
    await delay(500);
    
    interval = setInterval(updateTimer, 1000);
    generatePiece();
}

async function endGame(){
    pieceElement.style.border = "none";
    pieceElement.style.width = "0";
    pieceElement.style.height = "0";
    pieceElement.disabled = true;

    startGameButtonElement.style.transform = "scale(1)";
    startGameButtonElement.disabled = false;

    timerDisplay.textContent = '';
    seconds = DURATION;

    scoreDisplay.textContent = 'Last score: ' + score;
    score = START_SCORE;

    titleElement.style.transform = "scale(1)";

    footerElement.style.transform = "scale(1)";
}

async function pieceClicked(){
    pieceElement.style.transition = TRANSITION;
    pieceElement.style.border = "none";
    pieceElement.style.width = "0";
    pieceElement.style.height = "0";

    score++;
    scoreDisplay.textContent = score;

    await delay(TRANSITION_TIME);

    generatePiece();

}
