import React from 'react';

export default class FileInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: true,
    }
    this.handleToggle = this.handleToggle.bind(this);
    this.handleDeleteFile = this.handleDeleteFile.bind(this);
    this.setNewFile = props.setNewFile;
  }

  handleToggle() {
    this.setState((state) => ({
      isOpen: !state.isOpen,
    }));
  }

  handleDeleteFile() {
    this.props.setNewFile(null, null);
  }

  render() {    
    let toggleArrowClass = 'fileinfo-arrow';
    if (!this.state.isOpen) {
      toggleArrowClass += ' is-closed';
    }

    let fileInfoContent;
    if (this.state.isOpen) {
      fileInfoContent = (
        <div className="fileinfo-row">
          <div className="fileinfo-text">
            <span>Выбран файл: </span>
            <span className="fileinfo-filename">{this.props.fileName}</span>
          </div>
          <div className="fileinfo-del" onClick={this.handleDeleteFile}>
            <svg className="fileinfo-del-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M14 1.4L12.6 0L7 5.6L1.4 0L0 1.4L5.6 7L0 12.6L1.4 14L7 8.4L12.6 14L14 12.6L8.4 7L14 1.4Z" fill="currentcolor"/>
            </svg>
            <div className="fileinfo-del-tooltip">Удалить файл и&nbsp;выбрать другой</div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="block fileinfo">
        {fileInfoContent}
        <div className="fileinfo-toggle" onClick={this.handleToggle}>
        <svg className={toggleArrowClass} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 8L6 14L7.4 15.4L12 10.8L16.6 15.4L18 14L12 8Z" fill="currentcolor"/>
        </svg>
        </div>
      </div>
    );
  }

}