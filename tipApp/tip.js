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

// Update message
function updateMessage(element, value) {
  element.innerHTML = value;
}

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
  if (!billAmount.validity.valid) {
    updateMessage(billAmountErrMsg, billAmount.validationMessage);
  }
  else {
    billAmountValue = Number(billAmount.value);
    tipPercentageValue = Number(tipPercentage.value);
    tip = calculateTip(billAmountValue, tipPercentageValue);
    updateMessage(tipAmount, "Tip Amount: $"+tip);
  }
}

function displayTotal() {
  if (!billAmount.validity.valid) {
    updateMessage(billAmountErrMsg, billAmount.validationMessage);
  }
  else if (!numGuests.validity.valid) {
    updateMessage(numGuestsErrMsg, numGuests.validationMessage);
  }
  else {
    billAmountValueValue = Number(billAmount.value);
    tipPercentageValue = Number(tipPercentage.value);
    numGuestsValue = Number(numGuests.value);
    tip = Number(calculateTip(billAmountValue, tipPercentageValue));
    total = calculateTotal(billAmountValue, tip, numGuestsValue);
    updateMessage(totalAmount, "Total Per Guest: $"+total);
  }

}

// Display tip and total
function displayAmounts() {
  updateMessage(billAmountErrMsg, "");
  updateMessage(numGuestsErrMsg, "");
  displayTip();
  displayTotal();
}

// Display tip and total when calculate button clicked
calculateButton.addEventListener('click', function(){
  displayAmounts();
});

// Display tip and total when press enter in input fields
billAmount.onkeypress = function (event) {
  if (event.keyCode == 13) {
    displayAmounts();
  }
}

numGuests.onkeypress = function (event) {
  if (event.keyCode == 13) {
    displayAmounts();
  }
}
