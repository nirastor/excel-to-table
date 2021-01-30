import React from 'react';
import XLSX from 'xlsx';

export default class FileInput extends React.Component {
  constructor(props) {
    super();
    this.readFile = this.readFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setNewTable = props.setNewTable;
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const file = e.target[0].files[0];
    this.readFile(file);  
  }

  readFile(file) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
  
    reader.onload = () => {
      const data = new Uint8Array(reader.result);
      const workbook = XLSX.read(data, {type: 'array'});
      const firstSheetName = workbook.Workbook.Sheets[0].name
      const firstSheet = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], {header:1})
      this.setNewTable(firstSheet);
    };
  
    reader.onerror = function() {
      console.log(reader.error);
    };
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="file"></input>
        <button type="submit">Go!</button>
      </form>
    );
  }
}