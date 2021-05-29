import { Component } from 'react';
import { utilsService } from '../services/utils.service';
import { ColorPallette } from './ColorPalette';
import { FileUpload } from './FileUpload';
import { PopOver } from './PopOver';


export class CoverPopOver extends Component {

    state = {
        bgColor: '',
        coverMode: null,
        bgImgUrl:'',
    }

    handleChange = ({ target }) => {
        this.setState({ bgColor: target.value ,bgImgUrl:''},this.onSaveCover)
    }

    onRemoveCover = () => {
        this.setState({ bgColor: '', coverMode: '',bgImgUrl:'' },this.props.removeCover())
        // this.props.removeCoverBg()
    }

    onSetMode = (mode) => {
        this.setState({ coverMode: mode },this.onSaveCover)
    }
    onSaveCover=()=>{
        const {bgColor,bgImgUrl,coverMode}=this.state
        if((coverMode&&bgImgUrl)||(coverMode&&bgColor || (!coverMode&&!bgColor&&!bgImgUrl))) this.props.saveCover(this.state)
        else return
    }
    onFileUpload=(fileUrl)=>{
        if(!utilsService.isValidImg(fileUrl))return // error message
        this.setState({bgImgUrl:fileUrl,bgColor:''})
    }

    render() {
        const { bgColor, coverMode,bgImgUrl } = this.state
        return <PopOver togglePopOver={this.props.togglePopOver} title="Cover">
            <div className="cover-pop-over-content">
                <h4>SIZE</h4>
                <div className="cover-options flex justify-space-between align-center">
                    <div className={`header-cover-preview ${coverMode === 'header' ? 'selected' : ''}`} onClick={() => this.onSetMode('header')} >
                        <div className="header-section" style={{ backgroundColor: bgColor ? bgColor : '#5e6c844d' }}></div>
                    </div>
                    <div className={`full-cover-preview ${coverMode === 'full' ? 'selected' : ''}`} onClick={() => this.onSetMode('full')} style={{ backgroundColor: bgColor ? bgColor : '#5e6c844d' }}> </div>
                </div>
                {(bgColor||bgImgUrl) && <div className="flex">
                    <button className="secondary-btn full" onClick={this.onRemoveCover}>Remove Cover</button>
                </div>}
                <h4>COLOR</h4>
                <ColorPallette selectedColor={bgColor} handleChange={this.handleChange} />
                <h4>ATTACHMENTS</h4>
            <FileUpload onFileUpload={this.onFileUpload}/>
            </div>
        </PopOver>
    }
}