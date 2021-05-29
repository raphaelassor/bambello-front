import { Component } from 'react'
import { ScheduleOutlined as TimeIcon } from '@material-ui/icons';

export class CardPreviewDate extends Component {

    dueDateFormat = (dueDate) => {
        const currYear = new Date().getFullYear()
        const dueYear = new Date(dueDate).getFullYear()
        if (dueYear !== currYear) {
            return new Date(dueDate).toLocaleString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })
        }
        else return new Date(dueDate).toLocaleString('en-GB', { month: 'short', day: 'numeric' })
    }

    render() {
        const isOverDue = true;
        const isFinished = false;
        return (
            <div className={`card-preview-date ${isOverDue && 'over-due'} ${isFinished && 'finished'}`}>
                <div className="card-preview-date-icon"></div>
                <div>
                    {this.dueDateFormat(this.props.dueDate)}
                </div>
            </div>
        )
    }
}
