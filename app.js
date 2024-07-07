let userScore = 0;
let compScore = 0;
let playerName = 'You';

const userScorePara = document.querySelector(".user-score");
const compScorePara = document.querySelector(".comp-score");
const playerNamePara = document.querySelector(".player-name");
const startGameButton = document.getElementById("startGame");
const playerNameInput = document.getElementById("playerName");

startGameButton.addEventListener('click', () => {
    if (playerNameInput.value.trim() === "") {
        alert("Please enter your name to start the game.");
    } else {
        playerName = playerNameInput.value;
        playerNamePara.innerText = playerName;
        document.querySelector(".name-input").style.display = "none";
        document.querySelector(".main").classList.add("game-started");
    }
});

// display this if choices matched
function draw() {
    let msg = document.querySelector(".msgBox");
    msg.innerText = 'Draw! Try Again!';
    msg.style.backgroundColor = "#364652";
}

// to display winner i.e. user or computer will get one point.
const showWinner = (userWin, userChoice, compChoice) => {
    let msg = document.querySelector(".msgBox");
    msg.style.backgroundColor = "Red";
    if (userWin) {
        msg.innerText = `${playerName} win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
        userScore++;
        userScorePara.innerText = userScore;
    } else {
        msg.innerText = `You lose! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "Red";
        compScore++;
        compScorePara.innerText = compScore;
    }
};

// game condition 
const playGame = (userChoice) => {
    const compChoice = genCompChoice();
    if (userChoice === compChoice) {
        draw();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissor" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
};

// getting user choice
const choices = document.querySelectorAll(".choice");

choices.forEach((choice) => {
    choice.addEventListener('click', () => {
        if (!document.querySelector(".main").classList.contains("game-started")) {
            alert("Please enter your name and start the game first.");
            return;
        }
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

// random choice from computer
const genCompChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randomIdx = Math.floor(Math.random() * 3);
    return options[randomIdx];
};
