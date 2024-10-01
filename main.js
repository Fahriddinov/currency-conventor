const exchangeRates = {
    UZS: { RUB: 0.0069, YEN: 0.000089, EURO: 0.0001 },
    RUB: { UZS: 145.21, YEN: 0.013, EURO: 0.014 },
    YEN: { UZS: 11234.56, RUB: 76.23, EURO: 1.18 },
    EURO: { UZS: 10445.67, RUB: 71.11, YEN: 0.85 },
};

const currencies = Object.keys(exchangeRates);
const select1 = document.querySelector('.select1');
const select2 = document.querySelector('.select2');
const amountInput = document.querySelector('.input1');
const errorMessage = document.querySelector('.err');
const exchangeRateDiv = document.querySelector('.exchange-rate');
const getButton = document.querySelector('.get');

function populateSelects() {
    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.textContent = currency;
        select1.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = currency;
        option2.textContent = currency;
        select2.appendChild(option2);
    });
}

function validateInput(amount) {
    return !isNaN(amount) && amount > 0;
}

function convertCurrency(amount, fromCurrency, toCurrency) {
    const exchangeRate = exchangeRates[fromCurrency][toCurrency];
    return (amount * exchangeRate).toFixed(2);
}

function handleConversion(event) {
    event.preventDefault();
    const amount = parseFloat(amountInput.value);
    const fromCurrency = select1.value;
    const toCurrency = select2.value;

    errorMessage.textContent = '';
    exchangeRateDiv.textContent = '';

    if (!validateInput(amount)) {
        errorMessage.textContent = 'Please enter a valid amount.';
        return;
    }

    if (fromCurrency === toCurrency) {
        errorMessage.textContent = 'Please select different currencies.';
        return;
    }

    const convertedAmount = convertCurrency(amount, fromCurrency, toCurrency);
    exchangeRateDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
}

populateSelects();
getButton.addEventListener('click', handleConversion); jalab