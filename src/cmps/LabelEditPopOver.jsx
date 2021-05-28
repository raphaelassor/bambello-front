import { Component } from "react";
import CheckIcon from '@material-ui/icons/Check';
import { PopOver } from './PopOver'
export class LabelEditPopOver extends Component {

    state = {
        title: '',
        color: ''
    }

    componentDidMount(){
        this.setState({title:this.props.labelToEdit?.title||'', color:this.props.labelToEdit?.color||''})
    
    }

    handleChange = ({ target }) => {
        const { name, value } = target
        this.setState({ [name]: value }, () => {
            console.log('state:', this.state)
        })
    }
    onSaveLabel=()=>{
        if(!this.state.title||! this.state.color)return
        this.props.saveLabel({...this.state,id:this.props.labelToEdit?.id||''})
        this.props.toggleEditMode()
    }
    onRemoveLabel= ()=>{
        this.props.removeLabel(this.props.labelToEdit)
        this.props.toggleEditMode()
    }
    get colorCodes() {
        return [ '#61bd4f', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0','#51e898']
    }

    render() {
        const { title, color } = this.state
        const {labelToEdit} = this.props
        const colorCode = '121212'
        return <PopOver title={labelToEdit.title? 'Edit a label':'Create a label'}>
            <div className="label-add-content">
                <label htmlFor="label-inout">Name</label>
                <input type="text" name="title" value={title} onChange={this.handleChange} className="pop-over-input" />
                <h4>Color</h4>
                <div className="color-selection flex wrap">
                    {this.colorCodes.map(colorCode => {
                        return <label className="flex align-center justify-center" style={{ backgroundColor: colorCode }} name="label-color" htmlFor={`color-${colorCode}`}>
                            <input type="radio" name="color" id={`color-${colorCode}`} value={colorCode} onChange={this.handleChange} />
                            {color === colorCode && <CheckIcon style={{ width: '16px', height: '16px', color: 'white' }} />}
                        </label>
                    })}
                </div>
            </div>
            <div className="flex justify-space-between">
            <button className="primary-btn" onClick={this.onSaveLabel} >
                {labelToEdit.title? 'Save':'Create'}
            </button>
            {labelToEdit.title&& <button className="danger-btn"onClick={this.onRemoveLabel}>
                Delete
            </button> }
            </div>
        </PopOver>
    }
}