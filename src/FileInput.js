import React from 'react';
import XLSX from 'xlsx';
// import { AccessParser } from 'accessdb-parser';
import Mdb from 'mdb-parse';

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

  getFileExtension(file) {
    const nameAndExt = file.name.split('.');
    return nameAndExt.pop();
  }

  readFile(file) {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    const extension = this.getFileExtension(file);
    console.log(extension);

    if (extension === 'xlsx') {
      reader.onload = () => {
        const data = new Uint8Array(reader.result);
        const workbook = XLSX.read(data, {type: 'array'});
        const firstSheetName = workbook.Workbook.Sheets[0].name
        const firstSheet = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], {header:1})
        this.setNewTable(firstSheet);
      };
    }

    if (extension === 'accdb') {
      console.log(file);
      const url = URL.createObjectURL(file);
      console.log(url);
      const db = new Mdb(url);
      const tables = db.list();
      this.setNewTable(tables);
      
      // reader.onload = () => {
      //   const db = new AccessParser(reader.result);
      //   const tables = db.getTables();
      //   this.setNewTable(tables);
      // };
    }
  
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