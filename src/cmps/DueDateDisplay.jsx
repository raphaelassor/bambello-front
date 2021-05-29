import React ,{ Component } from 'react'
import { DatePopOver } from './DatePopOver'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {ReactComponent as DropdownIcon} from '../assets/img/icons/dropdown.svg'

export class DueDateDisplay extends Component {

    state={
        isPopOver:false,
        dueStatus:'',
    }

    componentDidMount(){
        this.setDueStatus()
    }

    dueDateFormat = (dueDate) => {
        const currYear = new Date().getFullYear()
        const dueYear = new Date(dueDate).getFullYear()
        if (dueYear !== currYear) {
            return new Date(dueDate).toLocaleString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })
        }
        else return new Date(dueDate).toLocaleString('en-GB', { month: 'short', day: 'numeric' })
    }

    togglePopOver=()=>{
        this.setState({isPopOver:!this.state.isPopOver})
    }
    saveDueDate = (date) => {
        const { card, onSaveCardFromActions } = this.props
        const dueDate = date ? card.dueDate = Date.parse(date) : 0;
        card.dueDate = dueDate;
        onSaveCardFromActions(card)
        this.setDueStatus()
    }

    setDueStatus=()=>{
        const now=Date.now()
        const {card}=this.props
        let dueStatus='';
        if(card.isDone) dueStatus='done';
        else if(now>card.dueDate) dueStatus='overdue';
        else{
            const timeDiff=card.dueDate-now;
            if(timeDiff<86400000) dueStatus='due-soon'
        }
        console.log("due status", dueStatus)
        this.setState({dueStatus})

    }
    onToggleCardDone=()=>{
        this.props.toggleCardDone()
        this.setDueStatus()
    }
    get dueMsg(){
        switch(this.state.dueStatus){
            case 'done': return 'COMPLETE';
            case 'due-soon': return 'DUE SOON';
            case 'overdue':return 'OVERDUE';
        }
    }

    render() {
        // TODO: IMPLEMENT TIME TRACKING
        const isOverDue = false;
        const isDueSoon = false;

        const { card, toggleCardDone, displayType } = this.props
        const{isPopOver,dueStatus}= this.state
        return <> { displayType === 'preview' ?
            <div className={`card-preview-date${isOverDue ? 'over-due' : ''} ${isDueSoon ? 'due-soon' : ''} ${card.isDone ? 'finished' : ''}`} onClick={toggleCardDone}>
                <div className="card-preview-date-icon"></div>
                <div>
                    {this.dueDateFormat(card.dueDate)}
                </div>
            </div>
            :
            <div className="card-details-date item-container">
                <h3 className="card-details-item-header">DUE DATE</h3>
                <div className="flex align-center">

                {card.isDone ?
                    <CheckBoxIcon className="checked" onClick={this.onToggleCardDone} /> :
                    <CheckBoxOutlineBlankIcon className="non-checked" onClick={this.onToggleCardDone} />}
                <button className="secondary-btn" onClick={this.togglePopOver}>
                <div className="flex align-center">

                   <span> {this.dueDateFormat(card.dueDate)}</span>
                    <span className={`due-msg ${dueStatus}`}>{this.dueMsg}</span>
                    <DropdownIcon/>
                </div>
                </button>
                {isPopOver&&<DatePopOver togglePopOver={this.togglePopOver} saveDueDate={this.saveDueDate}/>}
                    </div>
            </div>
        }</>

    }
}
