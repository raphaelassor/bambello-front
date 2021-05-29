import React, { Component } from "react";
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined'
import { TodoList } from '../cmps/TodoList'
import { TodoAdd } from '../cmps/TodoAdd'
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
        if (!todos.length) return 0
        const doneTodosCount = todos.reduce((acc, todo) => {
            if (todo.isDone) acc++
            return acc
        }, 0)
        const doneTodosProgress = +(((doneTodosCount / todos.length) * 100).toFixed(0))
        return doneTodosProgress
    }

    onSaveTodo = (todo) => {
        const { onSaveChecklist } = this.props
        let { checklist, checklist: { todos } } = this.state
        if (!todo.title) {
            todos = todos.filter(currTodo => currTodo.id !== todo.id)
            checklist.todos = todos
            onSaveChecklist(checklist)
            return
        }
        const todoIdx = todos.indexOf(todo)
        todos[todoIdx] = todo
        checklist.todos = todos
        onSaveChecklist(checklist)
    }

    onAddTodo = (todo) => {
        const { onSaveChecklist } = this.props
        const { checklist } = this.state
        checklist.todos.push(todo)
        onSaveChecklist(checklist)
    }

    onRemoveTodo = (todoId) => {
        const { onSaveChecklist } = this.props
        let { checklist, checklist: { todos } } = this.state
        todos = todos.filter(currTodo => currTodo.id !== todoId)
        checklist.todos = todos
        onSaveChecklist(checklist)
    }

    // onSaveChecklistTitle = (title)

    render() {
        const { onRemoveChecklist } = this.props
        const { checklist } = this.state
        if (!checklist) return '' //loader
        const { todos } = checklist
        return (<div className="checklist-preview">
            <div className="window-modal-title flex align-center justify-space-between">
                <div className="flex">
                    <CheckBoxOutlinedIcon />
                    <h3>{checklist.title}</h3>
                </div>
                <button onClick={() => onRemoveChecklist(checklist)} className="secondary-btn">Delete</button>
            </div>
            <ProgressBar completed={this.doneTodosProgress} />
            <TodoList todos={todos} onSaveTodo={this.onSaveTodo} onRemoveTodo={this.onRemoveTodo} />
            <TodoAdd onAddTodo={this.onAddTodo} />
        </div>)
    }
}