import React, { Component } from "react";
import { TextareaAutosize } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { utilsService } from '../services/utils.service'

export class TodoAdd extends Component {
    state = {
        isEditMode: true,
        todo: {
            title: ''
        }
    }

    onEditMode = () => {
        const { isEditMode } = this.state
        this.setState({ isEditMode: !isEditMode })
    }

    handleChange = ({ target: { value } }) => {
        this.setState({ todo: { title: value } })
    }

    onCreateTodo = (ev) => {
        if (ev.type === 'keydown' && ev.key !== 'Enter') return
        const { onAddTodo } = this.props
        const { todo } = this.state
        todo.id = utilsService.makeId()
        todo.isDone = false
        this.setState({ todo: { title: '' } }, onAddTodo(todo))
    }

    render() {
        const { todo: { title }, isEditMode } = this.state
        return (
            <div className="todo-add">
                <button className={`secondary-btn ${isEditMode ? 'hidden' : 'show'}`} onClick={() => this.onEditMode()} >
                    Add an item
                      </button>
                {isEditMode && <>
                    <TextareaAutosize
                        onBlur={() => this.onEditMode()}
                        onChange={this.handleChange}
                        value={title}
                        autoFocus
                        placeholder="Add an item"
                        aria-label="empty textarea" />
                    <div className="checklist-controllers flex align-center">
                        <button className="primary-btn" onKeyDown={(ev) => this.onCreateTodo(ev)} onMouseDown={(ev) => this.onCreateTodo(ev)}>Save</button>
                        <CloseRoundedIcon className="close-svg" />
                    </div >
                </>
                }
            </div>
        )
    }
}
