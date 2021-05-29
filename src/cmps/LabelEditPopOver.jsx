import { Component } from "react";
import { ColorPallette } from "./ColorPalette";

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
   
    render() {
        const { title, color } = this.state
        const {labelToEdit} = this.props
        
        return <PopOver togglePopOver={this.props.togglePopOver} title={labelToEdit.title? 'Edit a label':'Create a label'}>
            <div className="label-add-content">
                <label htmlFor="label-inout">Name</label>
                <input type="text" name="title" value={title} onChange={this.handleChange} className="pop-over-input" />
                <h4>Color</h4>
                <ColorPallette handleChange={this.handleChange} selectedColor={color}/>
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