import React from 'react';

import FileInput from './FileInput';
import Tabs from './tabs';
import CreateTable from './CreateTable';

import getSumm from './getSumm';
import getUniqueMNN from './getUniqueMNN';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tab: "original",
      table: null,
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
      }
    };
    this.handleTabChange = this.handleTabChange.bind(this);
    this.setNewTable = this.setNewTable.bind(this);
    this.columns = {
      TRADE_NAME_POSITION: 1,
      REALIZE_FORM_POSITION: 2,
      VALUE_POSITION: 3,
      PRICE_POSITION: 4,
      EXPENSES_POSITION: this.state.table ? this.state.table[0].length - 1 : null
    }
  }

  setNewTable(newTable) {
    this.setState({table: newTable});
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

  render() {    
    return (
      <div>
        <FileInput
          setNewTable={this.setNewTable}
        />
        <Tabs
          tabs={this.tabs}
          selectedTab={this.state.tab}
          handleTabChange={this.handleTabChange}
        />
        <CreateTable
          table={this.getTable()}
          columns={this.columns}
        />
      </div>
    );
  }
}
