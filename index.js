const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Coding is fun and challenging.",
    "Use the Play CDN to try Tailwind right in the browser without any build step. The Play CDN is designed for development purposes only, and is not the best "
];

const textContainer = document.getElementById("text-container");
const userInput = document.getElementById("user-input");
const timer = document.getElementById("timer");
const result = document.getElementById("result");

let currentText = "";
let startTime;
let isTyping = false;
let timerInterval;
let isCompleted = false;

function getRandomText() {
    return sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
}

function startTypingTest() {
    currentText = getRandomText();
    renderText();
    userInput.value = "";
    userInput.focus();
    isTyping = true;
    isCompleted = false;
    startTime = new Date().getTime();
    updateTimer();
}

function renderText() {
    const typedText = userInput.value;
    let output = "";

    for (let i = 0; i < currentText.length; i++) {
        if (i < typedText.length) {
            if (currentText[i] === typedText[i]) {
                output += `<span class="correct">${currentText[i]}</span>`;
            } else {
                output += `<span class="incorrect">${currentText[i]}</span>`;
            }
        } else {
            output += currentText[i];
        }
    }

    textContainer.innerHTML = output;
}

function updateTimer() {
    if (!isTyping || isCompleted) {
        return;
    }

    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - startTime) / 1000;
    const remainingTime = Math.max(0, 60 - elapsedTime);

    if (remainingTime === 0) {
        // Time's up
        timer.textContent = "Time's up!";
        isTyping = false;
        clearInterval(timerInterval);
        displayResult();
    } else {
        timer.textContent = `Time: ${Math.ceil(remainingTime)}s`;
    }
}

function displayResult() {
    if (isCompleted) {
        result.textContent = "Good typing!";
    }
}

userInput.addEventListener("input", function () {
    if (!isTyping || isCompleted) {
        return;
    }

    renderText();

    if (currentText === userInput.value) {
        isCompleted = true;
        isTyping = false;
        clearInterval(timerInterval);
        displayResult();
    }
});

// Start the typing test
startTypingTest();
timerInterval = setInterval(updateTimer, 1000);
