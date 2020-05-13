/* Javascript Code for Clock App
Author: Kayla D. Coleman
Author URI: github.com/kdcoleman
*/

let startTimerElement = document.getElementById('startTimer');
let stopTimerElement = document.getElementById('stopTimer');
let startStopwatchElement = document.getElementById('startStopwatch');
let pauseStopwatchElement = document.getElementById('pauseStopwatch');
let resetStopwatchElement = document.getElementById('resetStopwatch');
let currentTimeElement = document.getElementById('currentTime');
let partyTimeElement = document.getElementById('partyTime');
let clockImage = document.getElementById('clockImage');
let clockTitle = document.getElementById('clockTitle');
let timeDisplay = document.getElementById('timeDisplay');

// Show current time and add timer options on load
window.addEventListener('load', () => {
  displayCurrentTime();
  startCurrentTime();
  addTimerOptions('timerHours', 0, 23);
  addTimerOptions('timerMinutes', 0, 59);
  addTimerOptions('timerSeconds', 0, 59);
});

// Add onclick event listeners for time buttons
startTimerElement.addEventListener('click', () => {
  showClockImage();
  stopCurrentTime();
  startTimer();
});

stopTimerElement.addEventListener('click', () => {
  stopTimer();
});

startStopwatchElement.addEventListener('click', () => {
  showClockImage();
  stopCurrentTime();
  stopTimer();
  startStopwatch();
});

pauseStopwatchElement.addEventListener('click', () => {
  pauseStopwatch();
});

resetStopwatchElement.addEventListener('click', () => {
  resetStopwatch();
});

currentTimeElement.addEventListener('click', () => {
  showClockImage();
  stopTimer();
  pauseStopwatch();
  startCurrentTime();
});

partyTimeElement.addEventListener('click', () => {
  stopCurrentTime();
  stopTimer();
  pauseStopwatch();
  showPartyImage();
});

// Update textContent
const updateText = (element, value) => {
  element.textContent = value;
}


// Show party time image
function showPartyImage() {
  clockImage.src = "clockImages/partyTime.jpg";
  updateText(clockTitle, "What time is it?");
  updateText(timeDisplay, "");
}

// Show warped clock image
function showClockImage() {
  clockImage.src = "clockImages/warpedClock.png";
}

// CURRENT TIME METHODS
let currentTimeInterval;
let timerInterval;

function displayCurrentTime() {
  let d = new Date();
  let now = d.toLocaleTimeString();
  updateText(timeDisplay, now + "!");
}

function startCurrentTime() {
  updateText(clockTitle, "What time is it?");
  currentTimeInterval = setInterval(displayCurrentTime, 500);
}

function stopCurrentTime() {
  clearInterval(currentTimeInterval);
}

// TIMER METHODS
let timerRunning;
let hrs;
let mins;
let secs;

// Set Dropdown Options for Timer
const setTimerOptions = (min, max) => {
  df = document.createDocumentFragment();
  for (let i = min; i <= max; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.appendChild(document.createTextNode(i));
    df.appendChild(option);
  }
  return df
}

// Add Dropdown Options to Element
function addTimerOptions(elemId, min, max) {
  docf = setTimerOptions(min, max);
  document.getElementById(elemId).appendChild(docf);
}

// Display how much time is left
const displayTimeLeft = () => {
  hrs = hrs < 10 ? ("0" + hrs).slice(-2) : hrs;
  mins = mins < 10 ? ("0" + mins).slice(-2) : mins;
  secs = secs < 10 ? ("0" + secs).slice(-2) : secs;
  updateText(timeDisplay, hrs+":"+mins+":"+secs);
}

// Check how much time is left
const checkTimeLeft = () => {
  if (hrs >= 0 && mins >= 0 && secs > 0) {
    displayTimeLeft();
    secs--;
  }
  else if (hrs >= 0 && mins > 0 && secs == 0) {
    displayTimeLeft();
    mins--;
    secs = 59;
  }
  else if (hrs > 0 && mins == 0 && secs == 0) {
    displayTimeLeft();
    hrs--;
    mins = 59;
    secs = 59;
  }
  else if (hrs == 0 && mins == 0 && secs == 0) {
    updateText(timeDisplay, "Time's Up!");
    clearInterval(timerInterval);
    timerRunning = false;
  }
}

function startTimer() {
  hrs = document.getElementById('timerHours').value;
  mins = document.getElementById('timerMinutes').value;
  secs = document.getElementById('timerSeconds').value;
  checkTimeLeft();
  updateText(clockTitle, "Timer");

  // Clear timer interval and start a new one if already running
  if (!timerRunning) {
    timerInterval = setInterval(checkTimeLeft, 1000);
    timerRunning = true;
  } else {
    clearInterval(timerInterval);
    timerInterval = setInterval(checkTimeLeft, 1000);
  }
}

function stopTimer() {
  clearInterval(timerInterval);
}

// STOPWATCH METHODS
let startTime;
let savedTime;
let updatedTime;
let difference;
let stopwatchInterval;
let paused = false;
let running = false;

function startStopwatch() {
  if(!running) {
    startTime = new Date().getTime();
    stopwatchInterval = setInterval(getNewTime, 1);
    paused = false;
    running = true;
  }
  updateText(clockTitle, "Stopwatch");
}

function pauseStopwatch() {
  if (!difference) {
    // Do nothing if the stopwatch never started
  }
  else if (!paused) {
    clearInterval(stopwatchInterval);
    savedTime = difference;
    paused = true;
    running = false;
  }
  else {
    // If the stopwatch was already paused, start the stopwatch again
    startStopwatch();
  }
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  savedTime = 0;
  difference = 0;
  paused = false;
  running = false;
  updateText(timeDisplay, "00:00:00:000");
}

const getNewTime = () => {
  updatedTime = new Date().getTime();

  // If the stopwatch was paused continue from the paused time
  if (savedTime) {
    difference = savedTime + (updatedTime - startTime);
  }
  else {
    difference = updatedTime - startTime;
  }

  // Convert the difference to time
  let h = Math.floor((difference % (1000*60*60*24))/(1000*60*60));
  let m = Math.floor((difference % (1000*60*60))/(1000*60));
  let s = Math.floor((difference % (1000*60))/1000);
  let ms = Math.floor((difference % (1000*60))/100);

  // Add zero for single digit values
  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;
  ms = (ms < 100) ? (ms > 10) ? "0" + ms : "00" + ms : ms;

  // Display time
  updateText(timeDisplay, h+":"+m+":"+s+":"+ms);
}
