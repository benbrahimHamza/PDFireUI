import React from 'react';
import Dropzone from 'react-dropzone';
import FileInput from 'react-file-input';
import icon from '../drag_drop_icon.svg';
import axios from 'axios';
import Notifications, {notify} from 'react-notify-toast';

export default class MyDropZone extends React.Component {
    // Handle file array for treatment
    handleSelectedFiles(files){
        var len = files.length;
        for (var i = 0; i < len; i++) {
            axios.post('http://pdfireapi.hamzabenbrahim.com/upload_base64', {
                fileName: files[i]['fileName'],
                fileSize: files[i]['fileSize'],
                fileData: files[i]['fileData']
            })
            .then(function (response) {
                notify.show(response);
            })
            .catch(function (error) {
                notify.show('Malfunction: ' + error.message);
            });
        }
    }

    // Trigger when file is drag in da zone
    onDrop(acceptedFiles, rejectedFiles){
        var files = [];
        acceptedFiles.forEach(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            var fileresult = reader.result.split('base64,') ;
            var fileData = {'fileName': file.name,'fileSize':file.size, 'fileData' : fileresult[1]};
            files.push(fileData);
        });
        this.handleSelectedFiles(files);
    }

    // Triggers when we click in the browse button
    catchFileSelected(event){
        var files = event.target.files;
        this.handleSelectedFiles(files);
    }

    render(){
        return(
            <div className="main container" accept='.pdf'>
                <div>
                    <Notifications/>
                </div>
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
        );
    }
}