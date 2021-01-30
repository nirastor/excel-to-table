import Expenses from './Expenses';

export default function UniqueMNN(props) {
  /* общая часть */
  if (!props.table) {
    return false;
  }
  const table = props.table.map((row) => row.slice());

  const TRADE_NAME_POSITION = 1;
  const REALIZE_FORM_POSITION = 2;
  const VALUE_POSITION = 3;  
  const PRICE_POSITION = 4;
  /* конец общей части */

  const detachedHeadersLine = table.splice(0, 1)[0];
  console.log(detachedHeadersLine);
  
  // sort with 'e — ё' difference support
  table.sort((a,b) => {
    const collator = new Intl.Collator();
    return collator.compare(a[0], b[0]);
  });

  const summaryTable = table.splice(0, 1);
  table.forEach((row) => {
    const lastRow = summaryTable[summaryTable.length - 1];
    if (row[0] === lastRow[0]) {
      const addValue = parseInt(row[VALUE_POSITION]);
      const addPrice = parseFloat(row[PRICE_POSITION]);
      const lastValue = parseInt(lastRow[VALUE_POSITION]);
      const lastPrice = parseFloat(lastRow[PRICE_POSITION]);
      
      lastRow[VALUE_POSITION] = lastValue + addValue;
      const weightedPrice = (lastValue * lastPrice + addValue * addPrice) / (lastValue + addValue)
      lastRow[PRICE_POSITION] = weightedPrice;
      lastRow[TRADE_NAME_POSITION] += `\n${row[TRADE_NAME_POSITION]}`;
      lastRow[REALIZE_FORM_POSITION] += `\n${row[REALIZE_FORM_POSITION]}`;
    } else {
      summaryTable.push(row);
    }
  });

  summaryTable.unshift(detachedHeadersLine);

  console.log(summaryTable);

  return (
    <Expenses
      table={summaryTable}
  />
  );
}
