import { Component } from "react"
import { FileUpload } from "./FileUpload"
import { PopOver } from "./PopOver"


export class AttachPopOver extends Component{

    state={
        file:null,
        link:null,
        formData:null
    }


render(){
    return <PopOver title="Attach from...">
        <div className="attach-pop-over-content">
    <FileUpload addFile={this.props.addFile}/>
        </div>
    </PopOver>
}

}