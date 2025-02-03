/* rock paper spider _(:07<)_ */

const choices = ["rock", "paper", "scissors"];
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const img = document.getElementById("img-area");
const img2 = document.getElementById("img-area2");
const heartsDisplay = document.getElementById("heartsDisplay");
const startButton = document.getElementById('startButton');
const startContainer = document.getElementById('startContainer');
const gameContent = document.querySelectorAll('.card-holder');
const scoreboardContainer = document.getElementById("scoreboardContainer");

gameContent.forEach(element => {
    element.style.display = 'none';
});
startButton.addEventListener('click', function() {
    startContainer.style.display = 'none';

    gameContent.forEach(element => {
        element.style.display = 'block';
    });
});

let playerScore = 0;
let playerHearts = 3;
let topScores = [];
let consecutiveWins = 0;

function playGame(playerChoice) {
    if (playerHearts <= 0) {
        return;
    }
    const buttons = document.querySelectorAll('.choices button');
    buttons.forEach(button => {
        button.disabled = true;
    });

    /*game*/
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    let result = "";

    if (playerChoice === "rock") {
        if (computerChoice === "paper") {
            result = "YOU MORON!";
            img.src = "https://stinkguts.neocities.org/Rps/Spoder+pw.gif";
            img2.src = "jimlose.png";
            playerHearts--; // Lose
            consecutiveWins = 0; // Reset consecutive wins on loss
        } else if (computerChoice === "scissors") {
            result = "WIPE THAT DUMB GRIN OFF YOUR FACE";
            img.src = "https://stinkguts.neocities.org/Rps/Spoder+sl.gif";
            img2.src = "jimwin.png";
            playerScore++; // Win
            consecutiveWins++; // Increment consecutive wins
        } else {
            result = "GET OUT OF MY HEAD!";
            img.src = "https://stinkguts.neocities.org/Rps/Spoder+rt.gif";
            img2.src = "jim.png";
        }
    } else if (playerChoice === "paper") {
        if (computerChoice === "scissors") {
            result = "SNIPPY SNIP!";
            img.src = "https://stinkguts.neocities.org/Rps/Spoder+sw.gif";
            img2.src = "jimlose.png";
            playerHearts--; // Lose
            consecutiveWins = 0; 
        } else if (computerChoice === "rock") {
            result = "NO! NO! NO! NO! NO! NO!";
            img.src = "https://stinkguts.neocities.org/Rps/Spoder+rl.gif";
            img2.src = "jimwin.png";
            playerScore++; // Win
            consecutiveWins++;
        } else {
            result = "DING DANGIT";
            img.src = "https://stinkguts.neocities.org/Rps/Spoder+pt.gif";
            img2.src = "jim.png";
        }
    } else if (playerChoice === "scissors") {
        if (computerChoice === "rock") {
            result = "I HAVE CRUSHED YOU!! YOU LOSE!";
            img.src = "https://stinkguts.neocities.org/Rps/Spoder+rw.gif";
            img2.src = "jimlose.png";
            playerHearts--; // Lose
            consecutiveWins = 0; 
        } else if (computerChoice === "paper") {
            result = "NO! DRAT!!";
            img.src = "https://stinkguts.neocities.org/Rps/Spoder+pl.gif";
            img2.src = "jimwin.png";
            playerScore++; // Win
            consecutiveWins++; 
        } else {
            result = "LUCKY GUESS NIMROD";
            img.src = "https://stinkguts.neocities.org/Rps/Spoder+st.gif";
            img2.src = "jim.png";
        }
    }

 
    if (consecutiveWins === 2) {
        img.src = "https://stinkguts.neocities.org/spiderpop.gif"; 
    }

    playerDisplay.textContent = `PLAYER: ${playerChoice}`;
    computerDisplay.textContent = `SPIDER: ${computerChoice}`;
    playerScoreDisplay.textContent = `${playerScore}`;
    heartsDisplay.textContent = `HEARTS: ${playerHearts}`;
    resultDisplay.textContent = result;

    if (playerHearts <= 0) {
        setTimeout(() => {
            showScoreboard();
        }, 2000);
    } else {
        // Update hearts display
        const hearts = document.querySelectorAll('.heart');
        if (playerHearts < hearts.length) {
            hearts[playerHearts].style.display = 'none';
        }
    }

    setTimeout(() => {
        img.src = "https://stinkguts.neocities.org/Rps/Spoder+rpsgo.gif";
    }, 3000);
    setTimeout(() => {
        buttons.forEach(button => {
            button.disabled = false;
        });
    }, 1500);
}

function loadScores() {
    const savedScores = localStorage.getItem('topScores');
    if (savedScores) {
        topScores = JSON.parse(savedScores);
    }
}


function saveScores() {
    localStorage.setItem('topScores', JSON.stringify(topScores));
}

function showScoreboard() {
    scoreboardContainer.style.display = 'block'; 
    const name = prompt("Aw man! I need a hospital:");

    /*scoreboard*/

    if (topScores.length < 5 || (topScores.length > 0 && playerScore > Math.min(...topScores.map(score => score.score)))) {
        if (topScores.length >= 5) {
            topScores.pop(); 
        }
        topScores.push({ name: name || "some guy", score: playerScore });
        topScores.sort((a, b) => b.score - a.score);
        saveScores();
    }

    const scoreboardText = document.getElementById("scoreboardText");
    
    scoreboardText.textContent = `Good Work! ${name || "fella"}`;
    
    const topScoresList = document.getElementById("topScoresList");
    topScoresList.innerHTML = ""; // Clear previous scores
    topScores.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.name}: ${entry.score}`;
        topScoresList.appendChild(li);
    });

    img2.style.display = 'none';
    document.body.classList.add('red-tint');
    scoreboardContainer.style.display = 'block';
    document.getElementById('refreshButton').style.display = 'block';
}


function refreshPage() {
    location.reload();
}

function restartGame() {
    playerScore = 0;
    playerHearts = 3;

    playerScoreDisplay.textContent = `${playerScore}`;
    heartsDisplay.textContent = `HEARTS: ${playerHearts}`;
    playerDisplay.textContent = `PLAYER: `;
    computerDisplay.textContent = `SPIDER: `;
    resultDisplay.textContent = "";
    
    const scoreboardContainer = document.getElementById("scoreboardContainer");
    scoreboardContainer.style.display = 'none'; 

   
    img.src = "https://stinkguts.neocities.org/Rps/Spoder+rpsgo.gif"; // Reset

    // Re-enable buttons
    const buttons = document.querySelectorAll('.choices button');
    buttons.forEach(button => {
        button.disabled = false;
    });
}

// Call loadScores when the script runs
loadScores();
