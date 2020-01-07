/* Javascript Code for Login Authentication
Author: Kayla D. Coleman
Author URI: github.com/kdcoleman
*/

var loginLink = document.getElementById('loginLink');
var loginAlert = document.getElementById('loginAlert');
var closeButton = document.getElementById('closeLogin');
var emailMsg = document.getElementById('emailErrorMessage');
var passwdMsg = document.getElementById('passwdErrorMessage');
var loginForm = document.forms['loginForm'];
var emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+(\.[a-z]{2,3})+$";
// "[^\s@]+@[^\s@]+\.[^\s@]{2,3}$";
// "[a-z0-9._%+-]+@[a-z0-9.-]+(\.[a-z]{2,3})+$";

// Set email pattern
loginForm.elements.emailAddress.pattern = emailPattern;

// Show login alert onclick of login link
loginLink.addEventListener('click', function(){
  loginAlert.classList.toggle('active');
})

// Close login alert onclick of close button
closeButton.addEventListener('click', function(){
  loginAlert.classList.toggle('active');
  loginForm.reset();
  emailMsg.innerHTML = "";
  passwdMsg.innerHTML = "";
})

// Methods to validate email and password
function validateEmail() {
  var input =  document.getElementById('emailAddress');
  var validityState = input.validity;

  if (validityState.valueMissing) {
    input.setCustomValidity('Required');
    emailMsg.innerHTML  = "Required";
  }
  else if (validityState.typeMismatch) {
    input.setCustomValidity('Email address is invalid');
    emailMsg.innerHTML  = "Email address is invalid";
    loginForm.elements.emailAddress.value = "";
  }
  else if (validityState.patternMismatch) {
    input.setCustomValidity('Email address is invalid');
    emailMsg.innerHTML  = "Email address is invalid";
    loginForm.elements.emailAddress.value = "";

  }

}

function validatePassword() {
  var input =  document.getElementById('passwd');
  var validityState = input.validity;

  if (validityState.valueMissing) {
    input.setCustomValidity('Required');
    passwdMsg.innerHTML = "Required";
  }
  else if (validityState.tooShort) {
    input.setCustomValidity('Password must be at least 8 characters');
    passwdMsg.innerHTML = "Password must be at least 8 characters";
    loginForm.elements.passwd.value = "";
  }
}

// Validate credentials onclick of login button on alert
document.getElementById('loginButton').addEventListener('click', function(){
  emailMsg.innerHTML = "";
  passwdMsg.innerHTML = "";
  validateEmail();
  validatePassword();
})

// Validate credentials when press enter in input fields
document.getElementById('emailAddress').onkeypress = function (event) {
  if (event.keyCode == 13) {
    emailMsg.innerHTML = "";
    passwdMsg.innerHTML = "";
    validateEmail();
    validatePassword();
  }
}

document.getElementById('passwd').onkeypress = function (event) {
  if (event.keyCode == 13) {
    emailMsg.innerHTML = "";
    passwdMsg.innerHTML = "";
    validateEmail();
    validatePassword();
  }
}
