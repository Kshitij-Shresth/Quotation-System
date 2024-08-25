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
function printInvoice() {
    const baseCosts = {
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

    const checkedTypes = document.querySelectorAll('input[name="projectType"]:checked');
    
    let invoiceContent = "Project Type\tDeadline (15% of Base Cost)\tLTE Discount\n";
    let totalCost = 0;

    checkedTypes.forEach((checkbox) => {
        const projectType = checkbox.value;
        const baseCost = baseCosts[projectType];
        
        const deadlineCost = document.querySelector('input[name="deadline"]:checked').value === 'tight' ? (baseCost * 0.15).toFixed(2) : 'n/a';
        
        const lteDiscount = document.getElementById('lteDiscount').checked ? (baseCost * 0.15).toFixed(2) : 'n/a';
        
        totalCost += baseCost;

        invoiceContent += `${projectType}\t${deadlineCost}\t${lteDiscount}\n`;
    });
   
    const upfrontPayment = (totalCost * 0.40).toFixed(2);
    const firstMilestone = (totalCost * 0.10).toFixed(2);
    const secondMilestone = (totalCost * 0.25).toFixed(2);
    const finalPayment = (totalCost * 0.25).toFixed(2);

    invoiceContent += `\nTotal Cost: $${totalCost.toFixed(2)}\n`;
    invoiceContent += `\nPayment Terms:\n`;
    invoiceContent += `40% upfront payment upon signing the contract: $${upfrontPayment}\n`;
    invoiceContent += `10% upon completion of the first milestone: $${firstMilestone}\n`;
    invoiceContent += `25% upon completion of the second milestone: $${secondMilestone}\n`;
    invoiceContent += `25% upon final delivery and client approval: $${finalPayment}\n`;
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "invoice.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

