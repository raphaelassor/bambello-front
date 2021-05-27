import React, { Component } from "react";
import SubjectIcon from '@material-ui/icons/Subject';
import { TextareaAutosize } from '@material-ui/core';
import { Height } from "@material-ui/icons";


export class CardDescription extends Component {

    state = {
        description: '',
        placeholderMode: false,
    }

    handleChange = ({ target: { value } }) => {
        this.setState({ description: value })
    }

    componentDidMount() {
        const { card: { description } } = this.props
        this.setState({ description })
    }
    
    render() {
        let { description, placeholderMode } = this.state
        placeholderMode = !description ? true : false
        return (<div className="card-description flex column">
            <div className="window-modal-title flex align-center">
                <SubjectIcon />
                <h3>Description</h3>
                <button className="secondary-btn">Edit</button>
            </div>
            <div className="card-description-content flex column">
                <TextareaAutosize
                    className={placeholderMode ? 'placeholder-mode' : ''}
                    value={description} placeholder="Add a more detailed description..."
                    onChange={this.handleChange} aria-label="empty textarea" />
                <div className="description-controls">
                    <button className="primary-btn">Save</button>
                </div>
            </div>
        </div>)
    }
}