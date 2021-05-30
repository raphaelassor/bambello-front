import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';

import React, { Component} from "react";

import { PopOver } from "./PopOver";
export class DatePopOver extends Component {

    state = {
        date:null
    }

    componentDidMount(){
        const date = this.props.card.dueDate ? new Date(this.props.card.dueDate).toLocaleString() : new Date()

        this.setState({date})
    }


    handleChange = (ev) => {
        this.setState({ date: ev._d })
    }

    onSaveDate=()=>{
        this.props.saveDueDate(this.state.date)
        this.props.togglePopOver()
        //close popover
    }
    onRemoveDate=()=>{
        this.props.saveDueDate()
        this.props.togglePopOver()
        
    }

    render() {
        const {date}=this.state
        if(!date) return ''//loading
        return <PopOver togglePopOver={this.props.togglePopOver} title="Date">
            <div className="date-pop-over-content">

                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                        autoOk
                        variant="static"
                        openTo="date"
                        value={date}
                        onChange={this.handleChange}

                    />
                </MuiPickersUtilsProvider>
                <div className="btn-container flex column">
                    <button className="primary-btn" onClick={this.onSaveDate} >Save</button>
                    <button className="secondary-btn" onClick={this.onRemoveDate}>Remove</button>
                </div>
            </div>

        </PopOver>
    }
}