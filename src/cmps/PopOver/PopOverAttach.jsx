import { Component } from "react"
import { FileUpload } from "../FileUpload"
import { PopOver } from "./PopOver"
import { utilsService } from '../../services/utils.service'

export class PopOverAttach extends Component {

    state = {
        file: null,
        link: null,
        formData: null,
        linkTxt: '',
    }

    handleChange = ({ target }) => {
        this.setState({ linkTxt: target.value })
    }

    onAttachLink = () => {
        if (!this.state.linkTxt) return //message "please inser a link"
        const isValid = utilsService.isValidUrl(this.state.linkTxt)
        if (isValid) this.props.addFile(this.state.linkTxt) //else: Link is Invalid. Please Insert a Valid Link
    }
    onFileUpload = (fileUrl) => {
        this.props.addFile(fileUrl)
    }

    render() {
        const { inputTxt } = this.state
        return <PopOver title="Attach from...">
            <div className="attach-pop-over-content">
                <FileUpload onFileUpload={this.onFileUpload} />
                <form onSubmit={this.onAttachLink}>
                    <label className="pop-over-label" htmlFor="attach-input">Attach a link</label>
                    <input type="text" className="pop-over-input" value={inputTxt} id="attach-input" onChange={this.handleChange} placeholder="Attach any link here..." />
                    <button className="primary-btn btn-wide">Attach</button>
                </form>
            </div>
        </PopOver>
    }

}