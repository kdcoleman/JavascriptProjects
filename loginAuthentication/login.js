/* Javascript Code for Login Authentication
Author: Kayla D. Coleman
Author URI: github.com/kdcoleman
*/

// Login
var loginLink = document.getElementById('loginLink');
var loginAlert = document.getElementById('loginAlert');
var closeLogin = document.getElementById('closeLogin');
var loginEmailMsg = document.getElementById('loginEmailErrMsg');
var loginPasswdMsg = document.getElementById('loginPasswdErrMsg');
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
closeLogin.addEventListener('click', function(){
  loginAlert.classList.toggle('active');
  loginForm.reset();
  loginEmailMsg.innerHTML = "";
  loginPasswdMsg.innerHTML = "";
})

// Methods to validate email and password
function validateEmail() {
  var input =  document.getElementById('emailAddress');
  var validityState = input.validity;

  if (validityState.valueMissing) {
    input.setCustomValidity('Required');
    loginEmailMsg.innerHTML  = "Required";
  }
  else if (validityState.typeMismatch) {
    input.setCustomValidity('Email address is invalid');
    loginEmailMsg.innerHTML  = "Email address is invalid";
    loginForm.elements.emailAddress.value = "";
  }
  else if (validityState.patternMismatch) {
    input.setCustomValidity('Email address is invalid');
    loginEmailMsg.innerHTML  = "Email address is invalid";
    loginForm.elements.emailAddress.value = "";

  }

}

function validatePassword() {
  var input =  document.getElementById('passwd');
  var validityState = input.validity;

  if (validityState.valueMissing) {
    input.setCustomValidity('Required');
    loginPasswdMsg.innerHTML = "Required";
  }
  else if (validityState.tooShort) {
    input.setCustomValidity('Password must be at least 8 characters');
    loginPasswdMsg.innerHTML = "Password must be at least 8 characters";
    loginForm.elements.passwd.value = "";
  }
}

// Validate credentials onclick of login button on alert
document.getElementById('loginButton').addEventListener('click', function(){
  loginEmailMsg.innerHTML = "";
  loginPasswdMsg.innerHTML = "";
  validateEmail();
  validatePassword();
})

// Validate credentials when press enter in input fields
document.getElementById('emailAddress').onkeypress = function (event) {
  if (event.keyCode == 13) {
    loginEmailMsg.innerHTML = "";
    loginPasswdMsg.innerHTML = "";
    validateEmail();
    validatePassword();
  }
}

document.getElementById('passwd').onkeypress = function (event) {
  if (event.keyCode == 13) {
    loginEmailMsg.innerHTML = "";
    loginPasswdMsg.innerHTML = "";
    validateEmail();
    validatePassword();
  }
}

// Signup
var signupLink = document.getElementById('signupLink');
var signupAlert = document.getElementById('signupAlert');
var closeLogin = document.getElementById('closeSignup');
var signupEmailMsg = document.getElementById('signupEmailErrMsg');
var signupPasswdMsg = document.getElementById('signupPasswdErrMsg');
var signupForm = document.forms['signupForm'];

// Show signup alert onclick of signup link
signupLink.addEventListener('click', function(){
  signupAlert.classList.toggle('active');
})

// Close signup alert onclick of close button
closeSignup.addEventListener('click', function(){
  signupAlert.classList.toggle('active');
  signupForm.reset();
  signupEmailMsg.innerHTML = "";
  signupPasswdMsg.innerHTML = "";
})
