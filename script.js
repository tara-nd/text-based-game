// Game data and player stats
let currentEventIndex = 0;
let mentalStability = 100;

// Define events and choices (include additional events here as needed)
const events = [
  {
    story: "You enter the Entrance Hall. An inscription reads: 'I am something. I am nothing. Without me, you cannot breathe, yet too much of me, and you shall cease to exist.'",
    choices: [
      { text: "Oxygen", correct: true },
      { text: "Water", correct: false },
      { text: "Time", correct: false }
    ],
    feedback: {
      correct: "The door unlocks with a hiss, and you advance.",
      incorrect: "A strange gas fills the room, and you feel dizzy. Choose wisely next time."
    }
  },
  // Additional events go here...
  {
    story: "You enter the Hall of Reflections. The inscription says: 'Many seek to see through me, yet none can touch me. I reveal, but only to those who dare to look deep.'",
    choices: [
      { text: "Light", correct: false },
      { text: "Truth", correct: false },
      { text: "Mirror", correct: true }
    ],
    feedback: {
      correct: "The mirrors shift, revealing a hidden path forward.",
      incorrect: "The mirrors distort, showing twisted versions of yourself. A wave of disorientation washes over you."
    }
  }
];

// Function to start or reset the game
function startGame() {
  currentEventIndex = 0;
  mentalStability = 100;
  document.getElementById("restart-button").style.display = "none"; // Hide restart button
  updateStatus();
  displayEvent();
}

// Function to update and display the player's mental stability
function updateStatus() {
  document.getElementById("status").innerText = `Mental Stability: ${mentalStability}%`;
}

// Function to display the current event and choices
function displayEvent() {
  const event = events[currentEventIndex];
  document.getElementById("story-text").innerText = event.story;
  const choicesContainer = document.getElementById("choices-container");
  choicesContainer.innerHTML = "";

  event.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.innerText = choice.text;
    button.onclick = () => handleChoice(choice.correct, event.feedback);
    choicesContainer.appendChild(button);
  });
}

// Function to handle choice selection
function handleChoice(isCorrect, feedback) {
  const storyText = document.getElementById("story-text");

  if (isCorrect) {
    storyText.innerText = feedback.correct;
    document.getElementById("next-button").style.display = "inline-block";
  } else {
    mentalStability -= 20;
    storyText.innerText = feedback.incorrect;
    if (mentalStability <= 0) {
      endGame("You've lost all mental stability. The station has claimed another traveler.");
    } else {
      document.getElementById("next-button").style.display = "inline-block";
    }
  }
  updateStatus();
}

// Function to advance to the next event
function nextEvent() {
  currentEventIndex++;
  if (currentEventIndex < events.length) {
    document.getElementById("next-button").style.display = "none";
    displayEvent();
  } else {
    endGame("Congratulations! You've solved the mysteries of Starlost Station and survived.");
  }
}

// Function to end the game and display the restart option
function endGame(message) {
  document.getElementById("story-text").innerText = message;
  document.getElementById("choices-container").innerHTML = "";
  document.getElementById("next-button").style.display = "none";
  document.getElementById("restart-button").style.display = "inline-block"; // Show restart button
}

// Start the game initially
startGame();
