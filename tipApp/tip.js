/* Javascript Code for Tip App
Author: Kayla D. Coleman
Author URI: github.com/kdcoleman
*/

let calculateButton = document.getElementById('calculate');
let tipPercentage = document.getElementById('tipPercentage');
let billAmount = document.getElementById('billAmount');
let numGuests = document.getElementById('numGuests');
let totalAmount = document.getElementById('totalAmount');
let bodyElement = document.getElementById('mainBody');
let billAmountErrMsg = document.getElementById('billAmountErrMsg');
let numGuestsErrMsg  = document.getElementById('numGuestsErrMsg');

// Set Dropdown Options for Tip Percentage
const setPercentageOptions = () => {
  df = document.createDocumentFragment();
  for (let i = 10; i <= 25; i++) {
    let option = document.createElement('option');
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
const addPercentageOptions = (element) => {
  docf = setPercentageOptions();
  element.appendChild(docf);
}

// Add percentage options when body loads
window.addEventListener('load', () => {
  addPercentageOptions(tipPercentage);
});

// Update message
const updateMessage = (element, value) => {
  element.textContent = value;
}

// Calculate Tip
const calculateTip = (billAmount, tipPercentage) =>{
  tip = billAmount*(tipPercentage/100);
  return tip.toFixed(2);
}

// Calculate Total with Tip
const calculateTotal = (billAmount, tip, numGuests) => {
  totalWithTip = (billAmount + tip)/numGuests;
  return totalWithTip.toFixed(2);
}

// Display Tip and Total
const displayTip = () => {
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

const displayTotal = () => {
  if (!billAmount.validity.valid) {
    updateMessage(billAmountErrMsg, billAmount.validationMessage);
  }
  else if (!numGuests.validity.valid) {
    updateMessage(numGuestsErrMsg, numGuests.validationMessage);
  }
  else {
    billAmountValue = Number(billAmount.value);
    tipPercentageValue = Number(tipPercentage.value);
    numGuestsValue = Number(numGuests.value);
    tip = Number(calculateTip(billAmountValue, tipPercentageValue));
    total = calculateTotal(billAmountValue, tip, numGuestsValue);
    updateMessage(totalAmount, "Total Per Guest: $"+total);
  }

}

// Display tip and total
const displayAmounts = () => {
  updateMessage(billAmountErrMsg, "");
  updateMessage(numGuestsErrMsg, "");
  displayTip();
  displayTotal();
}

// Display tip and total when calculate button clicked
calculateButton.addEventListener('click', () => {
  displayAmounts();
});

// Display tip and total when press enter in input fields
billAmount.addEventListener('keypress', (event) => {
  if (event.keyCode == 13) {
    displayAmounts();
  }
});

numGuests.addEventListener('keypress', (event) => {
  if (event.keyCode == 13) {
    displayAmounts();
  }
});
