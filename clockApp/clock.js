/* Javascript Code for Clock App
Author: Kayla D. Coleman
Author URI: github.com/kdcoleman
*/

var bodyElement = document.getElementById('mainBody');
var startTimerElement = document.getElementById('startTimer');
var stopTimerElement = document.getElementById('stopTimer');
var startStopwatchElement = document.getElementById('startStopwatch');
var pauseStopwatchElement = document.getElementById('pauseStopwatch');
var resetStopwatchElement = document.getElementById('resetStopwatch');
var currentTimeElement = document.getElementById('currentTime');
var partyTimeElement = document.getElementById('partyTime');
var clockImage = document.getElementById('clockImage');
var clockTitle = document.getElementById('clockTitle');
var timeDisplay = document.getElementById('timeDisplay');

// Show current time and add timer options on load
bodyElement.onload = function() {
  displayCurrentTime();
  startCurrentTime();
  addTimerOptions('timerHours', 0, 23);
  addTimerOptions('timerMinutes', 0, 59);
  addTimerOptions('timerSeconds', 0, 59);
};

// Add onclick event listeners for time buttons
startTimerElement.addEventListener('click', function(){
  showClockImage();
  stopCurrentTime();
  startTimer();
});

stopTimerElement.addEventListener('click', function(){
  stopTimer();
});

startStopwatchElement.addEventListener('click', function(){
  showClockImage();
  stopCurrentTime();
  stopTimer();
  startStopwatch();
});

pauseStopwatchElement.addEventListener('click', function(){
  pauseStopwatch();
});

resetStopwatchElement.addEventListener('click', function(){
  resetStopwatch();
});

currentTimeElement.addEventListener('click', function(){
  showClockImage();
  stopTimer();
  pauseStopwatch();
  startCurrentTime();
});

partyTimeElement.addEventListener('click', function(){
  stopCurrentTime();
  stopTimer();
  pauseStopwatch();
  showPartyImage();
});

// Update textContent
function updateText(element, value) {
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
var currentTimeInterval;
var timerInterval;

function displayCurrentTime() {
  var d = new Date();
  var now = d.toLocaleTimeString();
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
var timerRunning;
var hrs;
var mins;
var secs;

// Set Dropdown Options for Timer
function setTimerOptions(min, max) {
  df = document.createDocumentFragment();
  for (var i = min; i <= max; i++) {
    var option = document.createElement('option');
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
function displayTimeLeft() {
  hrs = hrs < 10 ? ("0" + hrs).slice(-2) : hrs;
  mins = mins < 10 ? ("0" + mins).slice(-2) : mins;
  secs = secs < 10 ? ("0" + secs).slice(-2) : secs;
  updateText(timeDisplay, hrs+":"+mins+":"+secs);
}

// Check how much time is left
function checkTimeLeft() {
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
var startTime;
var savedTime;
var updatedTime;
var difference;
var stopwatchInterval;
var paused = false;
var running = false;

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
    startStopwatchs();
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

function getNewTime() {
  updatedTime = new Date().getTime();

  // If the stopwatch was paused continue from the paused time
  if (savedTime) {
    difference = savedTime + (updatedTime - startTime);
  }
  else {
    difference = updatedTime - startTime;
  }

  // Convert the difference to time
  var h = Math.floor((difference % (1000*60*60*24))/(1000*60*60));
  var m = Math.floor((difference % (1000*60*60))/(1000*60));
  var s = Math.floor((difference % (1000*60))/1000);
  var ms = Math.floor((difference % (1000*60))/100);

  // Add zero for single digit values
  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;
  ms = (ms < 100) ? (ms > 10) ? "0" + ms : "00" + ms : ms;

  // Display time
  updateText(timeDisplay, h+":"+m+":"+s+":"+ms);
}
