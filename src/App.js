import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import FileInput from 'react-file-input';
import axios from 'axios'
import icon from './drag_drop_icon.svg';
import './App.css';
const componentClasses = ['file-drop'];

class App extends Component {

  // Handle file array for treatment
  handleSelectedFiles(files){
    for (var i = 0, len = files.length; i < len; i++) {
        axios.post('http://localhost:8000/upload_file', {
          pdf_file: files[i]
        })
        .then(function (response) {
          alert(response);
        })
        .catch(function (error) {
          alert(error);
        });
    }
  }

  // Trigger when file is drag in da zone
  onDrop(acceptedFiles, rejectedFiles){
    var files = [];
    acceptedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          files.push(reader.result);
        };
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        reader.readAsBinaryString(file);
    });
    this.handleSelectedFiles(files);
  }

  // Triggers when we click in the browse button
  catchFileSelected(event){
    var files = event.target.files;
    this.handleSelectedFiles(files);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>PDFire</h1> v1.0.0
        </div>
        <div className="main container"
          accept='.pdf'>
          <Dropzone onDrop={this.onDrop.bind(this)} accept='application/pdf'>
            <img src={icon} alt="Drag Here" />
            <h3> Drag your file here </h3>
            <p>
              Or simply browse by clicking anywhere in the dotted zone !
              <p className="disclaimer">(*)Note the only PDF files are supported at the moment</p>
                <FileInput name="myImage"
                     accept='application/pdf'
                     onChange={this.catchFileSelected} />
            </p>
          </Dropzone>
        </div>
      </div>
    );
  }
}

export default App;
