// Variable Declaration and Assignment
const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const tipAmountDisplay = document.querySelectorAll('.tip-amount');
const resetBtn = document.getElementById('resetBtn');
const tipButtons = document.querySelectorAll('.tip-percentage');
const customTipInput = document.getElementById('custom-tip');
const clueText = document.querySelector('.clue');

// Initial Variables
let billAmount = 0;
let numberOfPeople = 0;
let tipPercentage = 0;

// Helper function to reset active button styles
const resetTipButtons = () => {
    tipButtons.forEach(button => {
        button.classList.remove('active'); // Assume `.active` styles the selected button
    });
};

// Event Listener for Bill Input
billInput.addEventListener('input', () => {
    billAmount = parseFloat(billInput.value) || 0;
    updateCalculations();
});

// Event Listener for People Input
peopleInput.addEventListener('input', () => {
    numberOfPeople = parseInt(peopleInput.value) || 0; // Default to 0 if empty

    if (numberOfPeople <= 0) {
        // Show "can't be zero" text and add red border
        clueText.style.display = 'inline';
        peopleInput.style.border = '2px solid red';
    } else {
        // Hide "can't be zero" text and reset border
        clueText.style.display = 'none';
        peopleInput.style.border = '';
    }

    updateCalculations();
});

// Event Listener for Tip Buttons
tipButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (billAmount > 0 && numberOfPeople > 0) {
            resetTipButtons(); // Reset active states for buttons
            button.classList.add('active'); // Highlight the selected button
            tipPercentage = parseInt(button.dataset.tip); // Retrieve tip percentage
            customTipInput.value = ''; // Clear custom input if a button is clicked
            updateCalculations();
        }
    });
});

// Event Listener for Custom Tip
customTipInput.addEventListener('input', () => {
    if (billAmount > 0 && numberOfPeople > 0) {
        resetTipButtons(); // Reset active state for buttons
        tipPercentage = parseFloat(customTipInput.value) || 0; // Allow decimal tips
        updateCalculations();
    }
});

// Calculation Logic
const updateCalculations = () => {
    if (billAmount > 0 && numberOfPeople > 0) {
        const tipAmount = (billAmount * tipPercentage) / 100;
        const totalAmount = billAmount + tipAmount;

        const tipPerPerson = (tipAmount / numberOfPeople).toFixed(2);
        const totalPerPerson = (totalAmount / numberOfPeople).toFixed(2);

        // Update Tip and Total Amount per Person
        tipAmountDisplay[0].textContent = `$${tipPerPerson}`;
        tipAmountDisplay[1].textContent = `$${totalPerPerson}`;
    } else {
        // Default display if inputs are invalid
        tipAmountDisplay.forEach(display => {
            display.textContent = '$0.00';
        });
    }
};

// Reset Button Functionality
resetBtn.addEventListener('click', () => {
    billInput.value = '';
    peopleInput.value = '';
    customTipInput.value = '';
    resetTipButtons(); // Reset active state for buttons
    tipAmountDisplay.forEach(display => {
        display.textContent = '$0.00';
    });
    billAmount = 0;
    numberOfPeople = 0;
    tipPercentage = 0;
    clueText.style.display = 'none'; // Hide clue text
    peopleInput.style.border = ''; // Reset border
});
