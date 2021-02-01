export default function getUniqueMNN(originTable, columns) {
  const table = originTable.map((row) => row.slice());

  const detachedHeadersLine = table.splice(0, 1)[0];
  
  // sort with 'e — ё' difference support
  table.sort((a,b) => {
    const collator = new Intl.Collator();
    return collator.compare(a[0], b[0]);
  });

  const summaryTable = table.splice(0, 1);
  table.forEach((row) => {
    const lastRow = summaryTable[summaryTable.length - 1];
    if (row[0] === lastRow[0]) {
      const addValue = parseInt(row[columns.VALUE_POSITION]);
      const addPrice = parseFloat(row[columns.PRICE_POSITION]);
      const lastValue = parseInt(lastRow[columns.VALUE_POSITION]);
      const lastPrice = parseFloat(lastRow[columns.PRICE_POSITION]);
      
      lastRow[columns.VALUE_POSITION] = lastValue + addValue;
      const weightedPrice = (lastValue * lastPrice + addValue * addPrice) / (lastValue + addValue)
      lastRow[columns.PRICE_POSITION] = weightedPrice;
      lastRow[columns.TRADE_NAME_POSITION] += `\n${row[columns.TRADE_NAME_POSITION]}`;
      lastRow[columns.REALIZE_FORM_POSITION] += `\n${row[columns.REALIZE_FORM_POSITION]}`;
    } else {
      summaryTable.push(row);
    }
  });

  summaryTable.unshift(detachedHeadersLine);

  return summaryTable
}
