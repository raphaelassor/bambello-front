import { Component } from 'react'

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
        // TODO: IMPLEMENT TIME TRACKING
        const isOverDue = false;
        const isDueSoon = false;

        const { card, onToggleCardFinish } = this.props
        return (
            <div className={`card-preview-date${isOverDue ? 'over-due' : ''} ${isDueSoon ? 'due-soon' : ''} ${card.isDone ? 'finished' : ''}`} onClick={onToggleCardFinish}>
                <div className="card-preview-date-icon"></div>
                <div>
                    {this.dueDateFormat(card.dueDate)}
                </div>
            </div>
        )
    }
}
