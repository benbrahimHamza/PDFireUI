import React, { Component } from 'react';
import icon from './drag_drop_icon.svg';
import Button from 'react-bootstrap/lib/Button';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>PDFire</h1>
        </div>
        <div className="file-drop container">
          <img src={icon} alt="Drag Here" />
          <h3> Drag your file here </h3>
          <p> Or simply browse via this button -> <Button>Upload PDF file</Button> </p>
        </div>
      </div>
    );
  }
}

export default App;
