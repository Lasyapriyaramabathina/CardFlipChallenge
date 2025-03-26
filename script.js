const gameContainer = document.getElementById("game-container");
const movesDisplay = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");

let cardsArray = ["🍎", "🍎", "🍌", "🍌", "🍒", "🍒", "🍇", "🍇", "🍉", "🍉", "🥑", "🥑", "🍍", "🍍", "🥝", "🥝"];
let flippedCards = [];
let matchedCards = [];
let moves = 0;
let timer = 0;
let timerInterval;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startGame() {
    gameContainer.innerHTML = "";
    shuffledCards = shuffle(cardsArray);
    flippedCards = [];
    matchedCards = [];
    moves = 0;
    timer = 0;
    movesDisplay.textContent = moves;
    timerDisplay.textContent = timer;

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer++;
        timerDisplay.textContent = timer;
    }, 1000);

    shuffledCards.forEach((emoji) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.emoji = emoji;
        card.textContent = "❓";

        card.addEventListener("click", () => flipCard(card));
        gameContainer.appendChild(card);
    });
}

function flipCard(card) {
    if (flippedCards.length < 2 && !flippedCards.includes(card) && !card.classList.contains("matched")) {
        card.classList.add("flipped");
        card.textContent = card.dataset.emoji;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moves++;
            movesDisplay.textContent = moves;
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCards.push(card1, card2);
       
        flippedCards = [];

        if (matchedCards.length === cardsArray.length) {
            clearInterval(timerInterval);
            setTimeout(showWinPopup, 300);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.textContent = "❓";
            card2.textContent = "❓";
            flippedCards = [];
        }, 800);
    }
}

function showWinPopup() {
    let popup = document.createElement("div");
    popup.classList.add("win-popup");
    popup.innerHTML = `<h2>🎉 You Win!</h2><p>Moves: ${moves}, Time: ${timer}s</p><button class="restart-btn" onclick="restartGame()">Restart</button>`;
    document.body.appendChild(popup);
    popup.style.display = "block";

    startCelebrations();
}

function restartGame() {
    document.querySelector(".win-popup").remove();
    startGame();
}

function startCelebrations() {
    for (let i = 0; i < 15; i++) {
        let firework = document.createElement("div");
        firework.classList.add("firework");
        firework.style.left = Math.random() * window.innerWidth + "px";
        firework.style.top = Math.random() * window.innerHeight / 2 + "px";
        document.body.appendChild(firework);

        setTimeout(() => firework.remove(), 1000);
    }

    for (let i = 0; i < 30; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * window.innerWidth + "px";
        confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }
}

startGame();
