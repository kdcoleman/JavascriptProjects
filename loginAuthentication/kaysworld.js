/* Javascript Code for Login Authentication
Author: Kayla D. Coleman
Author URI: github.com/kdcoleman
*/

// Welcome
var welcomeAlert = document.getElementById('welcomeAlert');
var welcomeMsg = document.getElementById('welcomeMsg');
var closeWelcome = document.getElementById('closeWelcome');
let emailAddress = getUrlVariable('emailAddress');
let firstName = getUrlVariable('firstName');
let signupEmail = getUrlVariable('signupEmail');

// Close welcome alert onclick of close button
closeWelcome.addEventListener('click', function(){
  welcomeAlert.classList.remove('active');
})

let bodyElement = document.getElementsByTagName('body')[0];
bodyElement.onload = showWelcomeMessage;

// Get url variables
function getUrlVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
   var pair = vars[i].split("=");

   if (pair[0] == variable){
     if (pair[1].includes("%40")) {
       newPair = pair[1].replace("%40","@");
       return newPair
     } else {
       return pair[1];
     }
   }
  }
  return false;
}

// Update welcome message method
function updateMessage(element, value) {
  element.innerHTML = value;
}

function showWelcomeMessage() {
  if (firstName) {
    newUserMsg = "Welcome " + firstName +
    "! We're so glad you decided to explore the land of Kay. We sent a confirmation email to " + signupEmail +
    ". <br><br> Please confirm your account."
    updateMessage(welcomeMsg,newUserMsg);
  } else if (emailAddress){
    returningUserMsg = "Welcome back! Check out what's new since your last time here. Happy exploring!"
    updateMessage(welcomeMsg,returningUserMsg);
  }
}
