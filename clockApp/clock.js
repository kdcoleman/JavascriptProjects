/* Javascript Code for Clock App
Author: Kayla D. Coleman
Author URI: github.com/kdcoleman
*/

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

// Create Dropdown for Timer Method

// function setTimerOptions() {
//   var df = document.createDocumentFragment();
//   for (var i = 1; i < 60; i++) {
//     var option = document.createElement('option');
//     option.value = i;
//     option.appendChild(document.createTextNode("option #" + i));
//     df.appendChild(option);
//   }
//   document.getElementById('timerMinutes').appendChild(df);
//   document.getElementById('timerSeconds').appendChild(df);
// }

// Display Timer Methods
function startTimer() {
  var mins = document.getElementById('timerMinutes').value;
  var secs = document.getElementById('timerSeconds').value;
  document.getElementById('clockTitle').innerHTML = "Timer";
  timerInterval = setInterval(checkTime, 1000);
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
    }
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
