
export const updateCalculations = (billAmount, numberOfPeople, tipPercentage, tipAmountDisplay) => {
    if (billAmount > 0 && numberOfPeople > 0) {
        const tipAmount = (billAmount * tipPercentage) / 100;
        const totalAmount = billAmount + tipAmount;
        
        const tipPerPerson = (tipAmount / numberOfPeople).toFixed(2);
        const totalPerPerson = (totalAmount / numberOfPeople).toFixed(2);
        
        tipAmountDisplay[0].textContent = `$${tipPerPerson}`;
        tipAmountDisplay[1].textContent = `$${totalPerPerson}`;
    } else {
        tipAmountDisplay.forEach(display => display.textContent = '$0.00');
    }
};
