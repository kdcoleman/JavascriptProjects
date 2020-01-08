/* Javascript Code for Login Authentication
Author: Kayla D. Coleman
Author URI: github.com/kdcoleman
*/

// LOGIN
var loginLink = document.getElementById('loginLink');
var loginAlert = document.getElementById('loginAlert');
var closeLogin = document.getElementById('closeLogin');
var loginEmailMsg = document.getElementById('loginEmailErrMsg');
var loginPasswdMsg = document.getElementById('loginPasswdErrMsg');
var loginForm = document.forms['loginForm'];
var emailPattern = "[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+([\.-]?[A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@[A-Za-z0-9]+([\-]?[A-Z-a-z0-9]+)*(\.[A-Za-z]{2,3})+";


// Set email pattern
loginForm.elements.emailAddress.pattern = emailPattern;

// Show login alert onclick of login link
loginLink.addEventListener('click', function(){
  signupAlert.classList.remove('active');
  loginAlert.classList.toggle('active');
})

// Close login alert onclick of close button
closeLogin.addEventListener('click', function(){
  loginAlert.classList.toggle('active');
  loginForm.reset();
  updateMessage(loginEmailMsg, "");
  updateMessage(loginPasswdMsg, "");
})


// Update validation message method
function updateMessage(element, value) {
  element.innerHTML = value;
}


// Email validation method
function validateEmail(inputElement, messageElement, formElement) {
  var validityState = inputElement.validity;

  if (validityState.valueMissing) {
    inputElement.setCustomValidity('Required');
    updateMessage(messageElement, inputElement.validationMessage);
  }
  else if (validityState.typeMismatch) {
    inputElement.setCustomValidity('Email must be in the format: you@example.com');
    updateMessage(messageElement, inputElement.validationMessage);
  }
  else if (validityState.patternMismatch) {
    inputElement.setCustomValidity('Email address is invalid');
    updateMessage(messageElement, inputElement.validationMessage);
    formElement.elements.emailAddress.value = "";
  }

}


// Password validation method
function validatePassword(inputElement, messageElement, formElement) {
  var validityState = inputElement.validity;

  if (validityState.valueMissing) {
    inputElement.setCustomValidity('Required');
    updateMessage(messageElement, inputElement.validationMessage);
  }
  else if (validityState.tooShort) {
    inputElement.setCustomValidity('Password must be at least 8 characters');
    updateMessage(messageElement, inputElement.validationMessage);
    formElement.elements.passwd.value = "";
  }
}


// Login form validation method
function validateLoginForm() {
  emailInput =  document.getElementById('emailAddress');
  passwdInput =  document.getElementById('passwd');

  updateMessage(loginEmailMsg, "");
  updateMessage(loginPasswdMsg, "");

  validateEmail(emailInput, loginEmailMsg, loginForm);
  validatePassword(passwdInput, loginPasswdMsg, loginForm);
}


// Validate credentials onclick of login button on login alert
document.getElementById('loginButton').addEventListener('click', validateLoginForm);

// Validate credentials when press enter in input fields on login alert
document.getElementById('emailAddress').onkeypress = function (event) {
  if (event.keyCode == 13) {
    validateLoginForm();
  }
}
document.getElementById('passwd').onkeypress = function (event) {
  if (event.keyCode == 13) {
    validateLoginForm();
  }
}


// SIGN UP
var signupLink = document.getElementById('signupLink');
var signupAlert = document.getElementById('signupAlert');
var closeLogin = document.getElementById('closeSignup');
var firstNameMsg = document.getElementById('signupFirstNameErrMsg');
var lastNameMsg = document.getElementById('signupLastNameErrMsg');
var signupEmailMsg = document.getElementById('signupEmailErrMsg');
var signupPasswdMsg = document.getElementById('signupPasswdErrMsg');
var confirmPasswdMsg = document.getElementById('signupConfirmPasswdErrMsg');
var signupForm = document.forms['signupForm'];
var namePattern = "[A-Za-z-\']+";

// Set first and last name pattern
signupForm.elements.firstName.pattern = namePattern;
signupForm.elements.lastName.pattern = namePattern;

// Show signup alert onclick of signup link
signupLink.addEventListener('click', function(){
  loginAlert.classList.remove('active');
  signupAlert.classList.toggle('active');
})

// Close signup alert onclick of close button
closeSignup.addEventListener('click', function(){
  signupAlert.classList.toggle('active');
  signupForm.reset();
  updateMessage(firstNameMsg, "");
  updateMessage(lastNameMsg, "");
  updateMessage(signupEmailMsg, "");
  updateMessage(signupPasswdMsg, "");
})


// First name validation method
function validateFirstName(inputElement, messageElement, formElement) {
  var validityState = inputElement.validity;

  if (validityState.valueMissing) {
    inputElement.setCustomValidity('Required');
    updateMessage(messageElement, inputElement.validationMessage);
  }
  else if (validityState.patternMismatch) {
    inputElement.setCustomValidity('First name must not contain (!@#$%^&*?.,_)');
    updateMessage(messageElement, inputElement.validationMessage);
    formElement.elements.firstName.value = "";
  }
}


// Last name validation method
function validateLastName(inputElement, messageElement, formElement) {
  var validityState = inputElement.validity;

  if (validityState.valueMissing) {
    inputElement.setCustomValidity('Required');
    updateMessage(messageElement, inputElement.validationMessage);
  }
  else if (validityState.patternMismatch) {
    inputElement.setCustomValidity('Last name must only contain letters');
    updateMessage(messageElement, inputElement.validationMessage);
    formElement.elements.lastName.value = "";
  }
}


// Confirm password method
function confirmPassword(inputElement, inputElementMatch, messageElement, formElement) {
  var validityState = inputElement.validity;

  if (validityState.valueMissing) {
    inputElement.setCustomValidity('Required');
    updateMessage(messageElement, inputElement.validationMessage);
  }
  else if (inputElement.value != inputElementMatch.value) {
    inputElement.setCustomValidity('Does not match password');
    updateMessage(messageElement, inputElement.validationMessage);
    formElement.elements.lastName.value = "";
  }
}


// Signup form validation method
function validateSignupForm() {
  firstNameInput =  document.getElementById('firstName');
  lastNameInput =  document.getElementById('lastName');
  signupEmailInput = document.getElementById('signupEmail');
  signupPasswdInput = document.getElementById('signupPasswd');
  confirmPasswdInput = document.getElementById('confirmPasswd');

  updateMessage(firstNameMsg, "");
  updateMessage(lastNameMsg, "");
  updateMessage(signupEmailMsg, "");
  updateMessage(signupPasswdMsg, "");
  updateMessage(confirmPasswdMsg, "");

  validateFirstName(firstNameInput, firstNameMsg, signupForm);
  validateLastName(lastNameInput, lastNameMsg, signupForm);
  validateEmail(signupEmailInput, signupEmailMsg, signupForm);
  validatePassword(signupPasswdInput, signupPasswdMsg, signupForm);
  confirmPassword(confirmPasswdInput, signupPasswdInput, confirmPasswdMsg, signupForm);
}


// Validate credentials onclick of signup button on signup alert
document.getElementById('signupButton').addEventListener('click', validateSignupForm);

// Validate credentials when press enter in input fields on signup alert
document.getElementById('firstName').onkeypress = function (event) {
  if (event.keyCode == 13) {
    validateSignupForm();
  }
}
document.getElementById('lastName').onkeypress = function (event) {
  if (event.keyCode == 13) {
    validateSignupForm();
  }
}
document.getElementById('signupEmail').onkeypress = function (event) {
  if (event.keyCode == 13) {
    validateSignupForm();
  }
}
document.getElementById('signupPasswd').onkeypress = function (event) {
  if (event.keyCode == 13) {
    validateSignupForm();
  }
}
