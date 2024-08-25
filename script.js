function calculateQuotation() {
    let baseCosts = {
        frontend: 125,
        backend: 350,
        api: 100,
        ai: 2500,
        ml: 150,
        bot: 100,
        design: 30,
        documentary: 50,
        maintenanceMonthly: 25,
        maintenanceYearly: 200,
        hosting: 100
    };

    let totalCost = 0;

    document.querySelectorAll('input[name="projectType"]:checked').forEach((checkbox) => {
        totalCost += baseCosts[checkbox.value];
    });

    if (document.querySelector('input[name="clientType"]:checked').value === 'company') {
        totalCost *= 1.30;
    }

    if (document.querySelector('input[name="deadline"]:checked').value === 'tight') {
        totalCost *= 1.15;
    }

    if (document.getElementById('nda').checked) {
        totalCost *= 1.05;
    }
    if (document.getElementById('lteDiscount').checked) {
        totalCost *= 0.85;
    }

    document.getElementById('finalCost').innerText = totalCost.toFixed(2);
}
