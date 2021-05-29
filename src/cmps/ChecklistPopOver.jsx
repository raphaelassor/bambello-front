
import { Component } from 'react';
import { PopOver } from './PopOver';
export class ChecklistPopOver extends Component{

    state={
        title:''
    }
    handlechange=({target})=>{

        this.setState({title:target.value})
    }
    onAddChecklist=()=>{
    this.props.addChecklist(this.state)
    //exit Modal from store popover
}
   render(){
       return <PopOver  togglePopOver={this.props.togglePopOver} title={"Add A Checklist"}>
           <div className="checklist-pop-over-content">
           <label htmlFor="checklist-input" className="pop-over-label">Title</label>
           <input className="pop-over-input" id="checklist-input" type="text" value={this.state.title} onChange={this.handlechange} placeholder="Enter a title..."/>
           <button className="primary-btn wide-btn" >Add</button>
           </div>
       </PopOver>

    } 
}

