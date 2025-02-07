// Import the updateCalculations function from utils.js
import { updateCalculations } from './utils.js';

// Variable Declaration and Assignment
const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const tipAmountDisplay = document.querySelectorAll('.tip-amount');
const resetBtn = document.getElementById('resetBtn');
const tipButtons = document.querySelectorAll('.tip-percentage');
const customTipInput = document.getElementById('custom-tip');
const clueText = document.querySelector('.clue');

// Set default CSS variables
document.documentElement.style.setProperty('--border-error', '2px solid red');
document.documentElement.style.setProperty('--hidden', 'none');
document.documentElement.style.setProperty('--visible', 'inline');

// Initial Variables
let billAmount = 0;
let numberOfPeople = 0;
let tipPercentage = 0;

// Helper function to reset active button styles
const resetTipButtons = () => {
    tipButtons.forEach(button => button.classList.remove('active'));
};

// Event Listener for Bill Input
billInput.addEventListener('input', () => {
    billAmount = parseFloat(billInput.value) || 0;
    updateCalculations(billAmount, numberOfPeople, tipPercentage, tipAmountDisplay);
});

// Event Listener for People Input
peopleInput.addEventListener('input', () => {
    numberOfPeople = parseInt(peopleInput.value) || 0;

    if (numberOfPeople <= 0) {
        clueText.style.display = getComputedStyle(document.documentElement).getPropertyValue('--visible');
        peopleInput.style.border = getComputedStyle(document.documentElement).getPropertyValue('--border-error');
    } else {
        clueText.style.display = getComputedStyle(document.documentElement).getPropertyValue('--hidden');
        peopleInput.style.border = '';
    }
    updateCalculations(billAmount, numberOfPeople, tipPercentage, tipAmountDisplay);
});

// Event Listener for Tip Buttons
tipButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (billAmount > 0 && numberOfPeople > 0) {
            resetTipButtons();
            button.classList.add('active');
            tipPercentage = parseInt(button.dataset.tip);
            customTipInput.value = '';
            updateCalculations(billAmount, numberOfPeople, tipPercentage, tipAmountDisplay);
        }
    });
});

// Event Listener for Custom Tip
customTipInput.addEventListener('input', () => {
    if (billAmount > 0 && numberOfPeople > 0) {
        resetTipButtons();
        tipPercentage = parseFloat(customTipInput.value) || 0;
        updateCalculations(billAmount, numberOfPeople, tipPercentage, tipAmountDisplay);
    }
});

// Reset Button Functionality
resetBtn.addEventListener('click', () => {
    billInput.value = '';
    peopleInput.value = '';
    customTipInput.value = '';
    resetTipButtons();
    tipAmountDisplay.forEach(display => display.textContent = '$0.00');
    billAmount = 0;
    numberOfPeople = 0;
    tipPercentage = 0;
    clueText.style.display = getComputedStyle(document.documentElement).getPropertyValue('--hidden');
    peopleInput.style.border = '';
});
