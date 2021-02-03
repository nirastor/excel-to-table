import {round2digitsToText} from './utils';
import {Fragment} from 'react';

export default function CreateTable(props) {  
  const table = props.table;
  const columns = props.columns;
  const hasFooter = props.hasFooter;
  
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

      let cellClass = 'cell';
      if (index === columns.PRICE_POSITION
        || index === columns.VALUE_POSITION
        || index === columns.EXPENSES_POSITION) {
        cellClass += ' cell-digit';
      } else {
        cellClass += ' cell-text';
      }

      if (index === columns.TRADE_NAME_POSITION || index === columns.REALIZE_FORM_POSITION) {
        console.log(cell, typeof cell, cell.indexOf('\n'));
        cell = cell.split('\n').map((item) =>
          <Fragment>
            <span>{item}</span><br />
          </Fragment>);
      }
      
      if (opt.isHead) {
        cells.push(
          <th className={cellClass}>{cell}</th>
        );
      } else {

        cells.push(
          <td className={cellClass}>{cell}</td>
        );
      }
    });
    return (
      <tr>{cells}</tr>
    );
  }
  
  const tableHeaders = getCellsOfRow(table[0], {isHead: true});
  let tableFooters;
  
  let lastRow = table.length - 1
  if (hasFooter) {
    tableFooters = getCellsOfRow(table[table.length - 1], {isFooter: true});
    lastRow -= 1;
  }
  
  const rows = [];
  for (let i = 1; i < lastRow; i += 1) {
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