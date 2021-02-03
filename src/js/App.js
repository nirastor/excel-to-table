import React from 'react';

import FileInput from './FileInput';
import FileInfo from './FileInfo';
import Tabs from './tabs';
import CreateTable from './CreateTable';
import Jnvpl from './Jnvpl';

import getSumm from './getSumm';
import getUniqueMNN from './getUniqueMNN';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tab: "original",
      table: null,
      fileName: null,
    };
    this.tabs = {
      original: {
        displayName: 'Оригинал',
      },
      expenses: {
        displayName: 'Затраты',
      },
      uniqueMNN: {
        displayName: 'Уникальные МНН',
      },
      // jnvpl: {
      //   displayName: 'ЖНВЛП',
      // }
    };
    this.handleTabChange = this.handleTabChange.bind(this);
    this.setNewFile = this.setNewFile.bind(this);
    this.columns = {
      MNN_POSITION: 0,
      TRADE_NAME_POSITION: 1,
      REALIZE_FORM_POSITION: 2,
      VALUE_POSITION: 3,
      PRICE_POSITION: 4,
      EXPENSES_POSITION: this.state.table ? this.state.table[0].length - 1 : null
    }
  }

  setNewFile(newTable, newFileName) {
    this.setState({
      table: newTable,
      fileName: newFileName
    });
  }
  
  handleTabChange(e) {
    const newTab = e.target.id
    this.setState({tab: newTab});
  }

  getTable() {
    if (!this.state.table) {
      return false;
    }
    
    let table = this.state.table.map((row) => row.slice());
    
    if (this.state.tab === "uniqueMNN") {
      table = getUniqueMNN(table, this.columns);
    }

    if (this.state.tab !== "original") {
      table = getSumm(table, this.columns);
    }

    return table;
  }

  getTabContent() {
    if (this.state.tab === 'jnvpl') {
      return (
        <Jnvpl />
      );
    }

    return (
      <CreateTable
        table={this.getTable()}
        columns={this.columns}
        hasFooter={this.state.tab === 'original' ? false : true}
      />
    );
  }

  render() {    
    if (!this.state.table) {
      return (
        <div className="app-fileinput">
          <FileInput
            setNewFile={this.setNewFile}
          />
        </div>

      );
    }
    
    return (
      <div className="app-container">
        <FileInfo
          fileName={this.state.fileName}
          setNewFile={this.setNewFile}
        />
        <Tabs
          tabs={this.tabs}
          selectedTab={this.state.tab}
          handleTabChange={this.handleTabChange}
        />
        {this.getTabContent()}
      </div>
    );
  }
}
