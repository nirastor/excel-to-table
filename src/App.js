import React from 'react';
import FileInput from './FileInput';
import Tabs from './tabs';

import CreateTable from './CreateTable';
import Expenses from './Expenses';
import UniqueMNN from './UniqueMNN';

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
  }

  setNewTable(newTable) {
    this.setState({table: newTable});
  }
  
  handleTabChange(e) {
    const newTab = e.target.id
    this.setState({tab: newTab});
  }

  getTable() {
    let table = this.state.table;

    if (this.state.tab === "uniqueMNN") {
      table = getUniqueMNN(table);
    }

    if (this.state.tab !== "original") {
      table = getSumm(table);
    }

    return table;
  }

  render() {
    let content;
    if (this.state.tab === "original") {
      content = <CreateTable table={this.state.table} />
    } else if (this.state.tab === "expenses") {
      content = <Expenses table={this.state.table} />
    }
    else if (this.state.tab === "uniqueMNN") {
      content = <UniqueMNN table={this.state.table} />
    }
    
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
        <div>Новая версия</div>
        <CreateTable table={this.getTable()} />
        <div>Страя версия</div>
        {content}
      </div>
    );
  }
}
