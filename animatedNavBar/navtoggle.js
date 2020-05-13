/* Javascript Code for Animated Navigation Bar
Author: Kayla D. Coleman
Author URI: github.com/kdcoleman
*/

// Create event listener for "onclick" of home image
let count = 0;
let navToggle = document.getElementById('nav-toggle');
let animateImg = document.getElementById('homeImage');

// Toggle all activate classes to active to toggle navigation bar
const toggleNavBar = () => {
  elems = document.getElementsByClassName('activate');

  for (let i = 0; i < elems.length; i++) {
    elems[i].classList.toggle('active');
  }
}

// Create event listener for "onclick" of nav-toggle button
navToggle.addEventListener('click', toggleNavBar);

// Toggle clicked class for home image
function toggleImgClass() {
  this.classList.add('stretch');
  this.addEventListener("transitionend", loopTransition);
}

// Create event listener for "onclick" of image
animateImg.addEventListener("click", toggleImgClass);

// Loop the transition
function loopTransition() {
  count++;
  if (count < 4) {
    if (this.classList.contains('stretch')) {
      this.classList.replace('stretch', 'shrink');
    } else {
      this.classList.replace('shrink', 'stretch');
    }
  }
  else {
    this.classList.remove('shrink');
    this.removeEventListener("transitionend", loopTransition);
    count = 0;
  }
}
