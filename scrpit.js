
const startScreen = document.querySelector(".startScreen");
const gameScreen = document.querySelector(".gameScreen");
const roundResultScreen = document.querySelector(".roundResultScreen");
const finalResultScreen = document.querySelector(".finalResultScreen");
const startButton = document.getElementById("startButton");
const roundTitle = document.getElementById("roundTitle");
const questionNumber = document.getElementById("questionNumber");
const timerDisplay = document.getElementById("timer");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const roundScoreElement = document.getElementById("roundScore");
const resultMessage = document.getElementById("resultMessage");
const nextRoundButton = document.getElementById("nextRound");
const finalScoreElement = document.getElementById("finalScore");
const finalMessage = document.getElementById("finalMessage");
const restartButton = document.getElementById("restartGame");

// QUIZ QUESTIONS
const rounds = [
    {
        name: "Nature",
        questions: [
            {
                question: "Which gas do plants absorb from the atmosphere?",
                options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Helium"],
                answer: 1
            },
            {
                question: "Which is a renewable energy source?",
                options: ["Coal", "Petrol", "Solar energy", "Diesel"],
                answer: 2
            },
            {
                question: "What is deforestation?",
                options: [
                    "Planting trees",
                    "Cutting down forests",
                    "Cleaning rivers",
                    "Saving wildlife"
                ],
                answer: 1
            },
            {
                question: "Which item can decompose naturally?",
                options: [
                    "Plastic bottle",
                    "Glass jar",
                    "Banana peel",
                    "Plastic bag"
                ],
                answer: 2
            },
            {
                question: "Which action conserves water?",
                options: [
                    "Fixing leaking taps",
                    "Leaving taps running",
                    "Wasting water",
                    "Washing a car daily"
                ],
                answer: 0
            }
        ]
    },
    {
        name: "Wildlife",
        questions: [
            {
                question: "Which animal is an important pollinator?",
                options: ["Bee", "Shark", "Tiger", "Penguin"],
                answer: 0
            },
            {
                question: "Where do fish primarily live?",
                options: ["Deserts", "Water", "Mountains", "Grasslands"],
                answer: 1
            },
            {
                question: "What is a natural habitat?",
                options: [
                    "A factory",
                    "An animal's natural home",
                    "A shopping mall",
                    "A highway"
                ],
                answer: 1
            },
            {
                question: "Which animal is endangered?",
                options: [
                    "Domestic cat",
                    "Bengal tiger",
                    "Domestic chicken",
                    "Goat"
                ],
                answer: 1
            },
            {
                question: "Why are bees important?",
                options: [
                    "They pollinate flowers",
                    "They produce plastic",
                    "They create rainfall",
                    "They clean oceans"
                ],
                answer: 0
            }
        ]
    },
    {
        name: "Planet Earth",
        questions: [
            {
                question: "Which layer protects Earth from much UV radiation?",
                options: [
                    "Ozone layer",
                    "Earth's crust",
                    "Ocean floor",
                    "Earth's core"
                ],
                answer: 0
            },
            {
                question: "What is climate change?",
                options: [
                    "A daily weather change",
                    "A long-term change in climate patterns",
                    "A type of soil",
                    "A water source"
                ],
                answer: 1
            },
            {
                question: "What should you do with recyclable paper?",
                options: [
                    "Put it in a recycling bin",
                    "Throw it into a river",
                    "Burn it",
                    "Leave it in a forest"
                ],
                answer: 0
            },
            {
                question: "What is compost mainly made from?",
                options: [
                    "Organic waste",
                    "Petrol",
                    "Glass",
                    "Plastic bags"
                ],
                answer: 0
            },
            {
                question: "Which action can help reduce air pollution?",
                options: [
                    "Burning rubbish",
                    "Using public transport",
                    "Leaving a car idling",
                    "Burning more coal"
                ],
                answer: 1
            }
        ]
    }
];

// GAME VARIABLES
let currentRound = 0;
let currentQuestion = 0;
let roundScore = 0;
let totalScore = 0;
let timeLeft = 15;
let timerInterval = null;
let answered = false;

const QUESTIONS_PER_ROUND = 5;
const QUALIFYING_SCORE = 5;

// SHOW ONE SCREEN AT A TIME
function showScreen(screenToShow) {
    const screens = [
        startScreen,
        gameScreen,
        roundResultScreen,
        finalResultScreen
    ];

    screens.forEach(screen => {
        screen.style.display =
            screen === screenToShow ? "flex" : "none";
    });
}

// START OR RESTART GAME
function startGame() {
    clearInterval(timerInterval);

    currentRound = 0;
    currentQuestion = 0;
    roundScore = 0;
    totalScore = 0;

    showScreen(gameScreen);
    loadQuestion();
}

// LOAD QUESTION
function loadQuestion() {
    clearInterval(timerInterval);
    answered = false;

    const round = rounds[currentRound];
    const question = round.questions[currentQuestion];

    roundTitle.textContent =
        `Round ${currentRound + 1}: ${round.name}`;

    questionNumber.textContent =
        `Question ${currentQuestion + 1}/${round.questions.length}`;

    questionElement.textContent = question.question;
    optionsElement.innerHTML = "";

    question.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.textContent = option;

        button.addEventListener("click", () => {
            checkAnswer(index);
        });

        optionsElement.appendChild(button);
    });

    // RESET TIMER FOR EACH QUESTION
    timeLeft = 15;
    timerDisplay.textContent = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            answered = true;
            disableOptions();

            setTimeout(nextQuestion, 700);
        }
    }, 1000);
}

// CHECK ANSWER
function checkAnswer(selectedIndex) {
    if (answered) return;

    answered = true;
    clearInterval(timerInterval);

    const question = rounds[currentRound].questions[currentQuestion];
    const buttons = optionsElement.querySelectorAll("button");

    buttons.forEach((button, index) => {
        button.disabled = true;

        if (index === question.answer) {
            button.style.backgroundColor = "rgba(80, 200, 100, 0.8)";
        } else if (index === selectedIndex) {
            button.style.backgroundColor = "rgba(240, 90, 90, 0.8)";
        }
    });

    if (selectedIndex === question.answer) {
        roundScore++;
        totalScore++;
    }

    setTimeout(nextQuestion, 700);
}

// DISABLE OPTIONS WHEN TIME RUNS OUT
function disableOptions() {
    optionsElement.querySelectorAll("button").forEach(button => {
        button.disabled = true;
    });
}

// MOVE TO NEXT QUESTION
function nextQuestion() {
    clearInterval(timerInterval);

    currentQuestion++;

    if (currentQuestion < QUESTIONS_PER_ROUND) {
        loadQuestion();
    } else {
        showRoundResult();
    }
}

// DISPLAY ROUND SCORE
function showRoundResult() {
    clearInterval(timerInterval);
    showScreen(roundResultScreen);

    roundScoreElement.textContent =
        `Round Score: ${roundScore}/${QUESTIONS_PER_ROUND}`;

    if (roundScore === QUALIFYING_SCORE) {
        resultMessage.textContent =
            "Perfect score! You have qualified for the next round.";

        if (currentRound === rounds.length - 1) {
            nextRoundButton.textContent = "View Final Result";
        } else {
            nextRoundButton.textContent = "Next Round";
        }

        nextRoundButton.style.display = "inline-block";
    } else {
        resultMessage.textContent =
            "Keep learning to protect our planet! You need 5/5 to qualify. Restart to try again.";

        nextRoundButton.style.display = "none";
    }
}

// NEXT ROUND OR FINAL RESULT
function goToNextRound() {
    if (roundScore !== QUALIFYING_SCORE) return;

    if (currentRound === rounds.length - 1) {
        showFinalResult();
        return;
    }

    currentRound++;
    currentQuestion = 0;
    roundScore = 0;

    showScreen(gameScreen);
    loadQuestion();
}

// FINAL RESULT
function showFinalResult() {
    clearInterval(timerInterval);
    showScreen(finalResultScreen);

    finalScoreElement.textContent =
        `Final Score: ${totalScore}/${rounds.length * QUESTIONS_PER_ROUND}`;

    finalMessage.textContent =
        "Congratulations, Earth Champion! Keep making choices that help our planet.";
}

// RESTART BUTTON
function restartGame() {
    startGame();
}

// CONNECT BUTTONS
startButton.addEventListener("click", startGame);
nextRoundButton.addEventListener("click", goToNextRound);
restartButton.addEventListener("click", restartGame);

// SHOW START SCREEN ON PAGE LOAD
showScreen(startScreen);
