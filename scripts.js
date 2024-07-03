let upgradeUnit = '';
let productionUnit = '';

function setUnit(type, unit) {
    if (type === 'upgrade') {
        upgradeUnit = unit;
    } else if (type === 'production') {
        productionUnit = unit;
    }
}

function calculateProfit() {
    // Get input values
    const upgradeCost = parseFloat(document.getElementById('upgradeCost').value);
    const currentProduction = parseFloat(document.getElementById('currentProduction').value);
    const increase = parseFloat(document.getElementById('increase').value);

    // Ensure unit selection
    if (!document.querySelector('input[name="upgradeUnit"]:checked') || !document.querySelector('input[name="productionUnit"]:checked')) {
        alert('Please select units for both upgrade cost and current production.');
        return;
    }

    // Convert costs and production to thousands
    const upgradeCostInThousands = upgradeUnit === 'millions' ? upgradeCost * 1000 : upgradeCost;
    const currentProductionInThousands = productionUnit === 'millions' ? currentProduction * 1000 : currentProduction;

    // Calculate profitability
    const currentProfitPerHour = currentProductionInThousands;
    const totalIncreaseAfterUpgrade = currentProductionInThousands + increase;
    const profitableHours = upgradeCostInThousands / increase;
    const profitableDays = profitableHours / 24;

    // Display results
    document.getElementById('currentProfit').innerText = `Current Profit per Hour: ${currentProfitPerHour} Thousands`;
    document.getElementById('totalIncrease').innerText = `Total Increase after Upgrade: ${totalIncreaseAfterUpgrade} Thousands`;
    document.getElementById('profitableHours').innerText = `Becomes Profitable after: ${profitableDays.toFixed(2)} Days (${profitableHours.toFixed(2)} Hours)`;
}

function resetCalculator() {
    // Reset all input fields and output text
    document.getElementById('upgradeCost').value = '';
    document.getElementById('currentProduction').value = '';
    document.getElementById('increase').value = '';
    document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
    document.getElementById('currentProfit').innerText = 'Current Profit per Hour: ';
    document.getElementById('totalIncrease').innerText = 'Total Increase after Upgrade: ';
    document.getElementById('profitableHours').innerText = 'Becomes Profitable after: ';
    upgradeUnit = '';
    productionUnit = '';
}

// Add event listeners for radio buttons to set units and toggle active class
document.querySelectorAll('input[name="upgradeUnit"]').forEach(radio => {
    radio.addEventListener('change', (event) => setUnit('upgrade', event.target.value));
});

document.querySelectorAll('input[name="productionUnit"]').forEach(radio => {
    radio.addEventListener('change', (event) => setUnit('production', event.target.value));
});
