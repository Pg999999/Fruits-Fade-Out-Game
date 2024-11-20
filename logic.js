const fruits = ['🍍', '🍏', '🍌', '🍊', '🍉', '🍈', '🍇'];
let score = 0;
let timeLeft = 30;
let gameInterval, timerInterval;

function randomPosition() {
    const gameArea = document.getElementById('gameArea');
    const x = Math.random() * (gameArea.clientWidth - 50);
    const y = Math.random() * (gameArea.clientHeight - 50);
    return { x, y };
}

function createFruit() {
    const fruitElement = document.createElement('div');
    const { x, y } = randomPosition();
    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];

    fruitElement.innerText = randomFruit;
    fruitElement.classList.add('fruit');
    fruitElement.style.left = `${x}px`;
    fruitElement.style.top = `${y}px`;

    fruitElement.addEventListener('click', () => {
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;
        playSliceSound();
        
 
        createFruitPieces(fruitElement, x, y);
        
        setTimeout(() => {
            fruitElement.remove();
            createFruit();
        }, 500);
    });

    document.getElementById('fruits').appendChild(fruitElement);
}

function createFruitPieces(fruitElement, x, y) {
    const pieceCount = 3; 
    for (let i = 0; i < pieceCount; i++) {
        const piece = document.createElement('div');
        piece.innerText = fruitElement.innerText;
        piece.classList.add('fruit-piece');
        piece.style.left = `${x + (Math.random() * 40 - 20)}px`;
        piece.style.top = `${y + (Math.random() * 40 - 20)}px`; 
        document.getElementById('fruits').appendChild(piece);
        
        setTimeout(() => {
            piece.style.transform = `translateY(${Math.random() * 100}px) rotate(${Math.random() * 360}deg)`;
            piece.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            piece.remove();
        }, 1000);
    }
}

function startGame() {
    score = 0;
    timeLeft = 30;
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('timer').innerText = `Time: ${timeLeft}`;
    document.getElementById('endGame').classList.add('hidden');

    createFruit();
    gameInterval = setInterval(createFruit, 2000);
    timerInterval = setInterval(updateTimer, 1000);
    playBackgroundMusic();
}

function updateTimer() {
    timeLeft--;
    document.getElementById('timer').innerText = `Time: ${timeLeft}`;
    if (timeLeft <= 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    document.getElementById('finalScore').innerText = score;
    document.getElementById('endGame').classList.remove('hidden');
    stopBackgroundMusic();
}

function restartGame() {
    const fruitsContainer = document.getElementById('fruits');
    while (fruitsContainer.firstChild) {
        fruitsContainer.removeChild(fruitsContainer.firstChild);
    }
    startGame();
}

function playSliceSound() {
    const sliceSound = document.getElementById('sliceSound');
    sliceSound.currentTime = 0; 
    sliceSound.play();
}

function playBackgroundMusic() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.play();
}

function stopBackgroundMusic() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.pause();
}

startGame();
