/**
 * Orders an array of sales objects by their total value in ascending order.
 * Each sales object includes an additional Total property which is calculated
 * as the product of amount and quantity.
 *
 * @param {Array} sales - Array of sales objects with properties: amount and quantity.
 * @returns {Array} New array of sales objects with an additional Total property, ordered by Total.
 */
function orderSalesByTotal(sales) {
    const salesWithTotal = sales.map(sale => ({
        ...sale,
        Total: sale.amount * sale.quantity
    }));

    salesWithTotal.sort((a, b) => a.Total - b.Total);

    return salesWithTotal;
}

const sales = [
    { amount: 10000, quantity: 10 },
    { amount: 5000, quantity: 5 },
    { amount: 2000, quantity: 20 }
];

const orderedSales = orderSalesByTotal(sales);

console.log('Original sales:', JSON.stringify(sales, null, 2)); 
console.log('Ordered sales:', JSON.stringify(orderedSales, null, 2));
