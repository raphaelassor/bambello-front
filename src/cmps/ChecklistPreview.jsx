import React, { Component } from "react";
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined'
import { TodoList } from '../cmps/TodoList'
import { ProgressBar } from '../cmps/ProgressBar'

export class ChecklistPreview extends Component {

    state = {
        checklist: null
    }

    componentDidMount() {
        const { checklist } = this.props
        this.setState({ checklist })
    }

    get doneTodosProgress() {
        const { checklist: { todos } } = this.state
        const doneTodosCount = todos.reduce((acc, todo) => {
            if (todo.isDone) acc++
            return acc
        }, 0)
        const doneTodosProgress = +(((doneTodosCount / todos.length) * 100).toFixed(0))
        return doneTodosProgress
    }

    render() {
        const { checklist } = this.state
        if (!checklist) return '' //loader
        const { todos } = checklist
        return (<div className="card-checklist">
            <div className="window-modal-title flex align-center justify-space-between">
                <div className="flex">
                    <CheckBoxOutlinedIcon />
                    <h3>Checklist</h3>
                </div>
                <button className="secondary-btn">Delete</button>
            </div>
            <ProgressBar completed={this.doneTodosProgress} />
            <TodoList todos={todos} />
        </div>)
    }
}