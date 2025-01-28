// Selecting DOM elements
let startButton = document.getElementById("button");
let textArea = document.getElementById("textarea");
let staticText = document.querySelector(".text1 p").textContent.trim();
let timerElement = document.getElementById("timeLeft");
let wpmElement = document.getElementById("wpm");
let accuracyElement = document.getElementById("accuracy");

let timer = 60; // Timer in seconds
let timerInterval;
let totalWords = staticText.split(" ").length;

// Disable the textarea initially
textArea.disabled = true;

// Function to start the test
function startTest() {
  // Reset variables
  textArea.value = "";
  textArea.disabled = false;
  textArea.focus();
  startButton.disabled = true;
  timer = 60;
  timerElement.textContent = `Time: ${timer}s`;
  wpmElement.textContent = `WPM: 0`;
  accuracyElement.textContent = `Accuracy: 0%`;

  // Start the timer
  startTimer();
}

// Timer function
function startTimer() {
  timerInterval = setInterval(() => {
    timer--;

    if (timer >= 0) {
      timerElement.textContent = `Time: ${timer}s`;
    } else {
      clearInterval(timerInterval);
      textArea.disabled = true;
      calculateResults();
      startButton.disabled = false;
    }
  }, 1000);
}

// Function to calculate WPM and accuracy
function calculateResults() {
  let typedText = textArea.value.trim();
  let typedWords = typedText.split(" ");
  let correctWords = 0;

  // Compare typed words with static text
  typedWords.forEach((word, index) => {
    if (word === staticText.split(" ")[index]) {
      correctWords++;
    }
  });

  let wpm = Math.round((correctWords / totalWords) * 60);
  let accuracy = Math.round((correctWords / totalWords) * 100);

  // Display results
  wpmElement.textContent = `WPM: ${wpm}`;
  accuracyElement.textContent = `Accuracy: ${accuracy}%`;
}

// Add event listener to the start button
startButton.addEventListener("click", startTest);

// Optional: Disable typing once time runs out
textArea.addEventListener("input", () => {
  if (timer === 0) {
    textArea.disabled = true;
  }
});
