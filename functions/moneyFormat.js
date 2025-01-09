function moneyFormat(amount) {

    if (typeof amount !== 'number') {
        console.warn("Invalid amount passed to moneyFormat:", amount);
        return amount;
    }

    return amount.toLocaleString('tr-TR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

export default moneyFormat