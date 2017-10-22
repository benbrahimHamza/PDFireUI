import React, { Component } from 'react';
import MyDropZone from './components/file_drop_zone';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>PDFire</h1> v1.0.0
        </div>
        <MyDropZone/>
      </div>
    );
  }
}

export default App;
