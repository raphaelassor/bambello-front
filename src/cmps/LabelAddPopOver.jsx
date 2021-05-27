import { Component } from "react";
import CheckIcon from '@material-ui/icons/Check';
import {EditPopOver} from './EditPopOver'
export class LabelAddPopOver extends Component{

    state={
        title:'',
        selectedColor:''
    }

    handleChange=({target})=>{
        const {name,value}=target
        this.setState({[name]:value})
    }

get colorCodes(){
    return ['#ffff','#61bd4f','#f2d600','#ff9f1a','#eb5a46','#c377e0']
}
    render (){
    const {title,selectedColor}=this.state
    const colorCode='121212'
        return <EditPopOver title={"Create label"}>
            <div className="label-add-content">
                <label htmlFor="label-inout">Name</label>
                <input type="text" name="title" value={title} onChange={this.handleChange} className="pop-over-input"/>
                <h4>Color</h4>
            
                <div className="color-selection">
                    
                {/* {this.colorCodes.map(colorCode=>{ */}
                    
                    <span>
                        
                        <label htmlFor={`color-${colorCode}`}>
                            <input type="radio" id={`color-${colorCode}`} name={selectedColor} value={colorCode} onChange={this.handleChange} />
                            {selectedColor===colorCode && <CheckIcon style={{width:'16px',height:'16px',color:'white'}} /> }
                        </label>
                    </span>
             
                </div>
                </div>
                <button className="primary-btn">Create</button>
        </EditPopOver>
    }
}