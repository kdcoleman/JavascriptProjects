/* Javascript Code for Animated Navigation Bar
Author: Kayla D. Coleman
Author URI: github.com/kdcoleman
*/

// Change all classes to active to toggle navigation bar
function toggleNavBar() {
  elems = document.getElementsByClassName('activate');

  for (var i = 0; i < elems.length; i++) {
    elems[i].classList.toggle('active');
  }
}

// Create event listener for "onclick" of nav-toggle button
var navToggle = document.getElementById('nav-toggle');
navToggle.addEventListener("click", toggleNavBar);
