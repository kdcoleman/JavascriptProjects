/* Javascript Code for Tip App
Author: Kayla D. Coleman
Author URI: github.com/kdcoleman
*/

var calculateButton = document.getElementById('calculate');
var tipPercentage = document.getElementById('tipPercentage');
var billAmount = document.getElementById('billAmount');
var numGuests = document.getElementById('numGuests');
var totalAmount = document.getElementById('totalAmount');
var bodyElement = document.getElementById('mainBody');
var billAmountErrMsg = document.getElementById('billAmountErrMsg');
var numGuestsErrMsg  = document.getElementById('numGuestsErrMsg');

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
  billAmountValue = Number(billAmount.value);
  tipPercentageValue = Number(tipPercentage.value);

  if (isNaN(billAmountValue)) {
    billAmountErrMsg.innerHTML = "Wrong format (e.g. #.##)";
  }
  else {
    tip = calculateTip(billAmountValue, tipPercentageValue);
    tipAmount.innerHTML = "Tip Amount: $"+tip;
  }
}

function displayTotal() {
  billAmountValueValue = Number(billAmount.value);
  tipPercentageValue = Number(tipPercentage.value);
  numGuestsValue = Number(numGuests.value);

  if (isNaN(billAmountValue)) {
    billAmountErrMsg.innerHTML = "Wrong format (e.g. #.##)";
  }
  else if (isNaN(numGuestsValue)) {
    numGuestsErrMsg.innerHTML = "Wrong format (e.g. # greater than or equal to 1)";
  }
  else {
    tip = Number(calculateTip(billAmountValue, tipPercentageValue));
    total = calculateTotal(billAmountValue, tip, numGuestsValue);
    totalAmount.innerHTML = "Total Per Guest: $"+total;
  }

}

// Display tip and total when calculate button clicked
calculateButton.addEventListener('click', function(){
  displayTip();
  displayTotal();
});

// Display tip and total when press enter in input fields
billAmount.onkeypress = function (event) {
  if (event.keyCode == 13) {
    displayTip();
    displayTotal();
  }
}

numGuests.onkeypress = function (event) {
  if (event.keyCode == 13) {
    displayTip();
    displayTotal();
  }
}
