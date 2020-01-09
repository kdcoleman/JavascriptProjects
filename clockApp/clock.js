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
  addTimerOptions('timerMinutes');
  addTimerOptions('timerSeconds');
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


// Show Party Image when Party Time Button Clicked
function showPartyImage() {
  clockImage.src = "clockImages/partyTime.jpg";
  clockTitle.innerHTML = "What time is it?";
  timeDisplay.innerHTML = "";
}

// Show Warped Clock when Party Time Button Clicked
function showClockImage() {
  document.getElementById('clockImage').src = "clockImages/warpedClock.png";
}

// Display Current Time Methods
var currentTimeInterval;
var timerInterval;

function displayCurrentTime() {
  var d = new Date();
  var now = d.toLocaleTimeString();
  document.getElementById('timeDisplay').innerHTML = now + "!";
}

function startCurrentTime() {
  document.getElementById('clockTitle').innerHTML = "What time is it?";
  currentTimeInterval = setInterval(displayCurrentTime, 500);
}

function stopCurrentTime() {
  clearInterval(currentTimeInterval);
}

// Set Dropdown Options for Timer
function setTimerOptions() {
  df = document.createDocumentFragment();
  for (var i = 0; i < 60; i++) {
    var option = document.createElement('option');
    option.value = i;
    option.appendChild(document.createTextNode(i));
    df.appendChild(option);
  }
  return df
}

// Add Dropdown Options to Element
function addTimerOptions(elemId) {
  docf = setTimerOptions();
  document.getElementById(elemId).appendChild(docf);
}

// Display Timer Methods
var timerRunning;

function startTimer() {
  var mins = document.getElementById('timerMinutes').value;
  var secs = document.getElementById('timerSeconds').value;
  document.getElementById('clockTitle').innerHTML = "Timer";
  function checkIfLessThan10() {
    mins = mins < 10 ? ("0" + mins).slice(-2) : mins;
    secs = secs < 10 ? ("0" + secs).slice(-2) : secs;
  }
  function checkTime() {
    checkIfLessThan10();
    if (mins >= 0 && secs > 0) {
      document.getElementById('timeDisplay').innerHTML= mins+":"+secs;
      secs--;
    }
    else if (mins > 0 && secs == 0) {
      document.getElementById('timeDisplay').innerHTML= mins+":"+secs;
      mins--;
      secs = 59;
    }
    else if (mins == 0 && secs == 0) {
      document.getElementById('timeDisplay').innerHTML = "Time's Up!";
      clearInterval(timerInterval);
      timerRunning = false;
    }
  }

  // Clear timer interval and start a new one if already running
  if (!timerRunning) {
    timerInterval = setInterval(checkTime, 1000);
    timerRunning = true;
  } else {
    clearInterval(timerInterval);
    timerInterval = setInterval(checkTime, 1000);
  }
}

function stopTimer() {
  clearInterval(timerInterval);
}

// Display Stopwatch Methods
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
  document.getElementById('clockTitle').innerHTML = "Stopwatch";
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
  document.getElementById('timeDisplay').innerHTML = "00:00:00:000";
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
  document.getElementById('timeDisplay').innerHTML = h+":"+m+":"+s+":"+ms;
}
