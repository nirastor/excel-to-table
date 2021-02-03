import React from 'react';
import XLSX from 'xlsx';
// import { AccessParser } from 'accessdb-parser';
import Mdb from 'mdb-parse';

export default class FileInput extends React.Component {
  constructor(props) {
    super();
    this.readFile = this.readFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.setNewFile = props.setNewFile;
  }

  handleInput(e) {
    const file = e.target.files[0];
    this.readFile(file); 
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

    if (extension === 'xlsx') {
      reader.onload = () => {
        const data = new Uint8Array(reader.result);
        const workbook = XLSX.read(data, {type: 'array'});
        const firstSheetName = workbook.Workbook.Sheets[0].name
        const firstSheet = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], {header:1})
        this.setNewFile(firstSheet, file.name);
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
      <form className="inputfile" onSubmit={this.handleSubmit}>
        <div className="inputfile-input-container">
          <input className="inputfile-input-input" type="file" onInput={this.handleInput}></input>
          <div className="inputfile-input-cover">
            Нажмите, чтобы добавить файл.<br />
            Или перетащите с компьютера</div>
        </div>
      </form>
    );
  }
}