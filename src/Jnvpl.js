import React from 'react';
import FileInput from './FileInput';

export default class Jnvpl extends React.Component {
  constructor(props) {
    super(props);
    this.setNewTable = this.setNewTable.bind(this);
    this.state = {
      table: null
    }
  }

  setNewTable(newTable) {
    this.setState({table: newTable});
  }

  render() {
    if (!this.state.table) {
      return (
        <div>
          <div>Для отображения ЖНВЛП загрузите файл бвзы данных</div>
          <FileInput
            setNewTable={this.setNewTable}
          />
        </div>
      );
    }

    return (
      <div>Файл загружен</div>
    );
  }
}