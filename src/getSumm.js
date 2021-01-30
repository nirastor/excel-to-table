import {round2digitsToText} from './utils';

export default function Expenses(originTable) {  
  const table = originTable.map((row) => row.slice());

  const VALUE_POSITION = 3;  
  const PRICE_POSITION = 4;
  table[0].push('Затраты');
  const EXPENSES_POSITION = table[0].length - 1;

  let totalValue = 0;
  let totalExpenses = 0;

  for (let i = 1; i < table.length; i += 1) {
    const row = table[i];
    const value = parseInt(row[VALUE_POSITION]);
    const price = parseFloat(row[PRICE_POSITION]);
    const expenses = value * price;
    row.push(round2digitsToText(expenses));
    totalValue += value;
    totalExpenses += expenses
  }

  table.push([]);
  for (let i = 0; i < table[0].length; i += 1) {
    table[table.length - 1][i] = ' ';
  }
  table[table.length - 1][VALUE_POSITION] = totalValue;
  table[table.length - 1][EXPENSES_POSITION] = round2digitsToText(totalExpenses);

  return table;
}
