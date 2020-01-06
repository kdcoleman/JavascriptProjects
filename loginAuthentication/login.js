/* Javascript Code for Login Authentication
Author: Kayla D. Coleman
Author URI: github.com/kdcoleman
*/

// Methods to check email and password
function checkEmail() {

}

function checkPassword() {

}

// Check credentials onclick of login button
document.getElementById('loginButton').addEventListener('click', function(){
  checkEmail();
  checkPassword();
})

// Check credentials when press enter in input fields
document.getElementById('email').onkeypress = function (event) {
  if (event.keyCode == 13) {
    checkEmail();
    checkPassword();
  }
}

document.getElementById('password').onkeypress = function (event) {
  if (event.keyCode == 13) {
    checkEmail();
    checkPassword();
  }
}
