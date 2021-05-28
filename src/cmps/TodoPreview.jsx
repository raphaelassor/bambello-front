import React, { Component } from "react"
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { TextareaAutosize } from '@material-ui/core';


export class TodoPreview extends Component {

    state = {
        todo: null,
        isInputSelected: false
    }

    componentDidMount() {
        const { todo } = this.props
        this.setState({ todo })
    }


    onEditClicked = () => {
        this.selectedInput.focus()
        this.setState({ isInputSelected: true }, () => {
            this.selectedInput.focus()
        })
    }

    onFinishEditing = () => {
        const { todo } = this.state
        this.setState({ isInputSelected: false }, () => {
            // this.props.onSaveTodo(todo)
        })
    }

    render() {
        const { todo, isInputSelected } = this.state
        if (!todo) return '' //loader
        const { title, isDone } = todo
        return (
            <div className="todo-preview-container flex column">
                <div className="todo-preview flex">
                    {isDone ? <CheckBoxIcon className="checked" /> : <CheckBoxOutlineBlankIcon className="non-checked" />}
                    <TextareaAutosize onFocus={this.onEditClicked} onBlur={this.onFinishEditing} value={title} ref={(input) => { this.selectedInput = input}} aria-label="empty textarea" />
                </div>
                <div className={`todo-controllers flex align-center ${isInputSelected ? 'show' : 'hidden'}`}>
                    <button className="primary-btn" onClick={() => this.onSaveDescription()}>Save</button>
                    <CloseRoundedIcon className="close-svg" />
                </div>
            </div>
        )
    }
}