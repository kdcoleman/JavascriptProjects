/* Javascript Code for Login Authentication
Author: Kayla D. Coleman
Author URI: github.com/kdcoleman
*/

// LOGIN
var loginLink = document.getElementById('loginLink');
var loginButton = document.getElementById('loginButton');
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
  resetSignupForm();
  loginAlert.classList.toggle('active');
})

// Close login alert onclick of close button
closeLogin.addEventListener('click', function(){
  loginAlert.classList.toggle('active');
  resetLoginForm();
})


// Update validation message method
function updateMessage(element, value) {
  element.innerHTML = value;
}

// Reset login form
function resetLoginForm() {
  loginForm.reset();
  updateMessage(loginEmailMsg, "");
  updateMessage(loginPasswdMsg, "");
}

// Email validation method
function validateEmail(inputElement, messageElement, formElement) {
  var validityState = inputElement.validity;

  if (validityState.valueMissing) {
    inputElement.setCustomValidity('Required');
    updateMessage(messageElement, inputElement.validationMessage);
    return false;
  }
  else if (validityState.typeMismatch) {
    inputElement.setCustomValidity('Email must be in the format: you@example.com');
    updateMessage(messageElement, inputElement.validationMessage);
    return false;
  }
  else if (validityState.patternMismatch) {
    inputElement.setCustomValidity('Email address is invalid');
    updateMessage(messageElement, inputElement.validationMessage);
    return false;
  } else {
    return true;
  }

}


// Password validation method
function validatePassword(inputElement, messageElement, formElement) {
  var validityState = inputElement.validity;

  if (validityState.valueMissing) {
    inputElement.setCustomValidity('Required');
    updateMessage(messageElement, inputElement.validationMessage);
    return false;
  }
  else if (validityState.tooShort) {
    inputElement.setCustomValidity('Password must be at least 8 characters');
    updateMessage(messageElement, inputElement.validationMessage);
    formElement.elements.passwd.value = "";
    return false;
  } else {
    return true;
  }
}

//URL to pass the login form data
fileURL = "kaysWorld.html";
loginForm.method = "get";
loginForm.action = fileURL;


// Login form validation method
function validateLoginForm() {
  emailInput =  document.getElementById('emailAddress');
  passwdInput =  document.getElementById('passwd');

  updateMessage(loginEmailMsg, "");
  updateMessage(loginPasswdMsg, "");

  emailValidity = validateEmail(emailInput, loginEmailMsg, loginForm);
  passwordValidity = validatePassword(passwdInput, loginPasswdMsg, loginForm);

  if (emailValidity && passwordValidity) {
    return true;
  } else {
    return false;
  }
}


// Validate credentials onsubmit of login button on login alert
document.getElementById('loginForm').onsubmit = function() {
  return validateLoginForm();
};

// Validate credentials when press enter in input fields on login alert
document.getElementById('emailAddress').onkeypress = function (event) {
  if (event.keyCode == 13) {
    return validateLoginForm();
  }
}
document.getElementById('passwd').onkeypress = function (event) {
  if (event.keyCode == 13) {
    return validateLoginForm();
  }
}


// SIGN UP
var signupLink = document.getElementById('signupLink');
var signupButton = document.getElementById('signupButton');
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
  resetLoginForm();
  signupAlert.classList.toggle('active');
})

// Close signup alert onclick of close button
closeSignup.addEventListener('click', function(){
  signupAlert.classList.toggle('active');
  resetSignupForm();
})

// Reset signup form
function resetSignupForm() {
  signupForm.reset();
  updateMessage(firstNameMsg, "");
  updateMessage(lastNameMsg, "");
  updateMessage(signupEmailMsg, "");
  updateMessage(signupPasswdMsg, "");
  updateMessage(confirmPasswdMsg, "");
}


// First name validation method
function validateFirstName(inputElement, messageElement, formElement) {
  var validityState = inputElement.validity;

  if (validityState.valueMissing) {
    inputElement.setCustomValidity('Required');
    updateMessage(messageElement, inputElement.validationMessage);
    return false;
  }
  else if (validityState.patternMismatch) {
    inputElement.setCustomValidity('First name must not contain (!@#$%^&*?.,_)');
    updateMessage(messageElement, inputElement.validationMessage);
    formElement.elements.firstName.value = "";
    return false;
  } else {
    return true;
  }
}


// Last name validation method
function validateLastName(inputElement, messageElement, formElement) {
  var validityState = inputElement.validity;

  if (validityState.valueMissing) {
    inputElement.setCustomValidity('Required');
    updateMessage(messageElement, inputElement.validationMessage);
    return false;
  }
  else if (validityState.patternMismatch) {
    inputElement.setCustomValidity('Last name must only contain letters');
    updateMessage(messageElement, inputElement.validationMessage);
    formElement.elements.lastName.value = "";
    return false;
  } else {
    return true;
  }
}


// Confirm password method
function confirmPassword(inputElement, inputElementMatch, messageElement, formElement) {
  var validityState = inputElement.validity;

  if (validityState.valueMissing) {
    inputElement.setCustomValidity('Required');
    updateMessage(messageElement, inputElement.validationMessage);
    return false;
  }
  else if (inputElement.value != inputElementMatch.value) {
    inputElement.setCustomValidity('Does not match password');
    updateMessage(messageElement, inputElement.validationMessage);
    formElement.elements.lastName.value = "";
    return false;
  } else {
    return true;
  }
}

//URL to pass the signup form data
fileURL = "kaysWorld.html";
signupForm.method = "get";
signupForm.action = fileURL;


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

  firstNameValidity = validateFirstName(firstNameInput, firstNameMsg, signupForm);
  lastNameValidity = validateLastName(lastNameInput, lastNameMsg, signupForm);
  emailValidity = validateEmail(signupEmailInput, signupEmailMsg, signupForm);
  passwordValidity = validatePassword(signupPasswdInput, signupPasswdMsg, signupForm);
  confirmValidity = confirmPassword(confirmPasswdInput, signupPasswdInput, confirmPasswdMsg, signupForm);

  if (firstNameValidity && lastNameValidity && emailValidity && passwordValidity && confirmValidity) {
    return true;
  } else {
    return false;
  }
}


// Validate credentials onsubmit of signup button on signup alert
document.getElementById('signupForm').onsubmit = function() {
  return validateSignupForm();
};

// Validate credentials when press enter in input fields on signup alert
document.getElementById('firstName').onkeypress = function (event) {
  if (event.keyCode == 13) {
    return validateSignupForm();
  }
}
document.getElementById('lastName').onkeypress = function (event) {
  if (event.keyCode == 13) {
    return validateSignupForm();
  }
}
document.getElementById('signupEmail').onkeypress = function (event) {
  if (event.keyCode == 13) {
    return validateSignupForm();
  }
}
document.getElementById('signupPasswd').onkeypress = function (event) {
  if (event.keyCode == 13) {
    return validateSignupForm();
  }
}
