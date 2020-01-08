/* Javascript Code for Tip App
Author: Kayla D. Coleman
Author URI: github.com/kdcoleman
*/

var calculateButton = document.getElementById('calculate');
var tipPercentage = document.getElementById('tipPercentage');
var tipForm = document.getElementById('tipForm');
var bodyElement = document.getElementById('mainBody');

// Set Dropdown Options for Tip Percentage
function setPercentageOptions() {
  df = document.createDocumentFragment();
  for (var i = 10; i <= 25; i++) {
    var option = document.createElement('option');
    option.value = i;
    option.appendChild(document.createTextNode(i+"%"));
    df.appendChild(option);
    if (i == 15) {
      option.selected = i;
    }
  }
  return df
}

// Add Dropdown Options to Element
function addPercentageOptions(element) {
  docf = setPercentageOptions();
  element.appendChild(docf);
}

// Add percentage options when body loads
bodyElement.onload = function() {
  addPercentageOptions(tipPercentage);
};

// Calculate Tip
function calculateTip(billAmount, tipPercentage) {
  tip = billAmount*(tipPercentage/100);
  return tip.toFixed(2);
}

// Calculate Total with Tip
function calculateTotal(billAmount, tip, numGuests) {
  totalWithTip = (billAmount + tip)/numGuests;
  return totalWithTip.toFixed(2);
}

// Display Tip and Total
function displayTip() {
  billAmount = Number(document.getElementById('billAmount').value);
  tipPercentage = Number(document.getElementById('tipPercentage').value);

  if (isNaN(billAmount)) {
    window.alert('Wrong format for bill amount!');
  }
  else {
    tip = calculateTip(billAmount, tipPercentage);
    document.getElementById('tipAmount').innerHTML = "Tip Amount: $"+tip;
  }
}

function displayTotal() {
  billAmount = Number(document.getElementById('billAmount').value);
  tipPercentage = Number(document.getElementById('tipPercentage').value);
  numGuests = Number(document.getElementById('numGuests').value);

  if (isNaN(billAmount)) {
    window.alert('Wrong format for bill amount!');
  }
  else if (isNaN(numGuests)) {
    window.alert('Wrong format for number of guests!');
  }
  else {
    tip = Number(calculateTip(billAmount, tipPercentage));
    total = calculateTotal(billAmount, tip, numGuests);
    document.getElementById('totalAmount').innerHTML = "Total Per Guest: $"+total;
  }

}

// Display tip and total when calculate button clicked
calculateButton.addEventListener('click', function(){
  displayTip();
  displayTotal();
});

// Display tip and total when press enter in input fields
document.getElementById('billAmount').onkeypress = function (event) {
  if (event.keyCode == 13) {
    displayTip();
    displayTotal();
  }
}

document.getElementById('numGuests').onkeypress = function (event) {
  if (event.keyCode == 13) {
    displayTip();
    displayTotal();
  }
}
