import {round2digitsToText} from './utils';

export default function CreateTable(props) {  
  const table = props.table;
  const columns = props.columns;
  
  if (!table) {
    return false;
  }
  
  function getCellsOfRow(row, opt = false) {
    const cells = [];
    row.forEach((cell, index) => {
      if ((!opt && index === columns.PRICE_POSITION) ||
        ((!opt || opt.isFooter) && index === columns.EXPENSES_POSITION)) {
        cell = round2digitsToText(cell);
      }
      
      if (opt.isHead) {
        cells.push(
          <th>{cell}</th>
        );
      } else {
        cells.push(
          <td>{cell}</td>
        );
      }
    });
    return (
      <tr>{cells}</tr>
    );
  }
  
  const tableHeaders = getCellsOfRow(table[0], {isHead: true});
  const tableFooters = getCellsOfRow(table[table.length - 1], {isFooter: true});

  const rows = [];
  for (let i = 1; i < table.length - 2; i += 1) {
    rows.push(getCellsOfRow(table[i]));
  }
  
  return (
    <table>
      <thead>
        {tableHeaders}
      </thead>
      <tbody>
        {rows}
      </tbody>
      <tfoot>
         {tableFooters}
      </tfoot>
    </table>
  );
}