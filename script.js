'use strict';
// Select the game area
const gameArea = document.getElementById('game-area');
//const gameWidth = 400;
const gameHeight = 600;
let labelScore = document.getElementById('score');
let labelHighscore = document.getElementById('highscore');
let gameCont = document.getElementById('game-container');
let body = document.querySelector('body').style.top = 0;
const begin = document.querySelector('.play');

let gameOver = false;
let spawnInterval;
let score = 10;
let highscore = 0;
let missedCount = 0;
let backgroundMusic;
let gamestartMusic;
let gameendMusic;




//begin.addEventListener("click", function() {
        //window.location.href = 'index.html';
        //startGame();
    //});

//labelScore.textContent = score;
//labelHighscore.textContent = highscore;

function stopVoice() {
    // Stops any ongoing or queued speech
    window.speechSynthesis.cancel();
}


// Function to generate a random number between min and max
const getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to create a number div and move it upwards
function createFallingNumber() {
    if (gameOver) return;  // Stop creating numbers if the game is over

    const number = document.createElement('div')
    number.classList.add('number');
    number.innerText = getRandomNumber(1, 99);

    // Start position at the bottom of the game area
    //const startX = getRandomNumber(0, gameWidth - 50);
    //number.style.left = startX + 'px';
    number.style.top = gameHeight + 'px';

    // Add the number to the game area
    gameArea.appendChild(number);

    // Add a click event listener to the number to remove it when clicked

    number.addEventListener('click', (numb) => {
         numb.preventDefault();
        number.remove(); // Remove from the game area when clicked
        speakNumber(number.innerText);
        function speakNumber(number) {
    // Create a new SpeechSynthesisUtterance instance
    const utterance = new SpeechSynthesisUtterance(number.toString());

    // Optional: Set voice properties
    utterance.lang = 'en-US';  // Set the language
    utterance.volume = 1;      // Volume (0 to 1)
    utterance.rate = 1;        // Rate (0.1 to 10)
    utterance.pitch = 1;       // Pitch (0 to 2)
    
    // Speak the number
    window.speechSynthesis.speak(utterance);
}

     backgroundMusic = new Audio('pop.mp3');
    backgroundMusic.loop = false; // Loop the music
    backgroundMusic.volume = 0.5; // Set volume level (0 to 1)
    backgroundMusic.play();

       score++
        labelScore.textContent = score;
        

        if(score > highscore){
            highscore = score;
            labelHighscore.textContent = score;
        }
    });

const smallScreen = window.matchMedia('(max-width: 767px)');

if(smallScreen.matches) {
   number.addEventListener('touchstart', (numb) => {
         numb.preventDefault();
        number.remove(); // Remove from the game area when clicked
        
        speakNumber(number.innerText);
        function speakNumber(number) {
    // Create a new SpeechSynthesisUtterance instance
    const utterance = new SpeechSynthesisUtterance(number.toString());

    // Optional: Set voice properties
    utterance.lang = 'en-US';  // Set the language
    utterance.volume = 1;      // Volume (0 to 1)
    utterance.rate = 1;        // Rate (0.1 to 10)
    utterance.pitch = 1;       // Pitch (0 to 2)
    
    // Speak the number
    window.speechSynthesis.speak(utterance);
}
   backgroundMusic = new Audio('pop.mp3');
    backgroundMusic.loop = false; // Loop the music
    backgroundMusic.volume = 0.5; // Set volume level (0 to 1)
    backgroundMusic.play();
     
       score++
        labelScore.textContent = score;
        

        if(score > highscore){
            highscore = score;
            labelHighscore.textContent = score;
        }
    }); 
}



    // Animate the number moving upwards
    let numberY = gameHeight;
    const speed = getRandomNumber(2, 4);

    const interval = setInterval(() => {
        //if (gameOver) {
        //    clearInterval(interval); // Stop this number's movement when game is over
        //    return;
        //}

        numberY -= speed;
        number.style.top = numberY + 'px';

        // Trigger game over if the number reaches the top

        const elementPosition = number.getBoundingClientRect();
if (elementPosition.bottom < 0) {
        gameArea.removeChild(number);
    // Trigger game over or increment missed count
              missedCount++; // Increment the missed count
            if (missedCount > 3) { // Trigger game over if missed count exceeds 3
                gameOver = true;
                gameArea.innerHTML = ''; 
                endGame();
            }

}


          
       // if (numberY < -50) {
          //  clearInterval(interval); // Stop the interval for this number
           // if (gameArea.contains(number)) { // Check if number is still in the game area
           // gameArea.removeChild(number); // Remove from the game area when clicked
        //}
            //gameArea.removeChild(number); // Remove the number from the game area

           
        //}
    }, 20);
}


gameendMusic = new Audio('game-over.mp3');
// Function to end the game
function endGame() {
    // Stop creating new numbers
    clearInterval(spawnInterval);
    gameArea.innerHTML = '';
    
    gameendMusic.loop = false; // Loop the music
    gameendMusic.volume = 1; // Set volume level (0 to 1)
    gameendMusic.play();

    //backgroundMusic.pause(); // Stop background music
    //gameOverSound.play();
    // Display "Game Over" message
    const gameOverMessage = document.createElement('div');
    gameOverMessage.innerText = 'Game Over!';
    gameOverMessage.style.position = 'absolute';
    gameOverMessage.style.top = '50%';
    gameOverMessage.style.left = '50%';
    gameOverMessage.style.transform = 'translate(-50%, -50%)';
    gameOverMessage.style.color = 'red';
    gameOverMessage.style.fontSize = '36px';
    gameOverMessage.style.fontWeight = 'bold';
    gameArea.appendChild(gameOverMessage);
    stopVoice()
}


function quitGame() {
    clearInterval(spawnInterval);
    gameArea.innerHTML = '';
    //backgroundMusic.pause();
    stopVoice()
}



// Function to start spawning numbers
function startGame() {
    gameOver = false;  // Reset game state
    missedCount = 0; 
    spawnInterval = setInterval(createFallingNumber, 2000); // Create a new number every second
    gameendMusic.pause();        // Stop the sound
    
    gameendMusic = new Audio('game-over.mp3');
    gamestartMusic = new Audio('game-start.wav');
    gamestartMusic.loop = false; // Loop the music
    gamestartMusic.volume = 1; // Set volume level (0 to 1)
    gamestartMusic.play();
    
    //gameendMusic.currentTime = 0;
}

function resetGame() {
    gameArea.innerHTML = '';  // Clear all elements from the game area
    gameOver = false;         // Reset the game state
    score = 10;
    labelScore.textContent = score;
    startGame();              // Restart the game
}

const restartButton = document.querySelector('button');
restartButton.addEventListener('click', resetGame);

//const leaveGame = document.getElementById('quit-game');
//leaveGame.addEventListener('click', quitGame);

// Start the game
//startGame();
