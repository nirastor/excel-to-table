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
        <div className="jnvlp">
          <div className="jnvlp-text">Для отображения ЖНВЛП загрузите файл базы данных</div>
          <div className="jnvlp-fileinput">
          <FileInput
            setNewTable={this.setNewTable}
          />
          </div>
        </div>
      );
    }

    return (
      <div>Файл загружен</div>
    );
  }
}