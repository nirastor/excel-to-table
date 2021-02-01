export default function Expenses(originTable, columns) {  
  const table = originTable.map((row) => row.slice());

  table[0].push('Затраты');
  columns.EXPENSES_POSITION = table[0].length - 1;

  let totalValue = 0;
  let totalExpenses = 0;

  for (let i = 1; i < table.length; i += 1) {
    const row = table[i];
    const value = parseInt(row[columns.VALUE_POSITION]);
    const price = parseFloat(row[columns.PRICE_POSITION]);
    const expenses = value * price;
    row.push(expenses);
    totalValue += value;
    totalExpenses += expenses
  }

  table.push([]);
  for (let i = 0; i < table[0].length; i += 1) {
    table[table.length - 1][i] = ' ';
  }
  table[table.length - 1][columns.VALUE_POSITION] = totalValue;
  table[table.length - 1][columns.EXPENSES_POSITION] = totalExpenses;

  return table;
}
