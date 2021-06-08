import React, { Component } from 'react'
import { TextareaAutosize } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { utilsService } from '../services/utils.service'

export class CardAdd extends Component {

    state = {
        titleTxt: ''
    }

    componentDidMount() {
        // WHY DOESN'T WORK?
        // const { elCardsContainer } = this.props
        // elCardsContainer.scrollIntoView({ block: "end", behavior: 'smooth' });
    }
    

    handleChange = (ev) => {
        const { value } = ev.target;
        if (ev.key === 'Enter') {
            ev.preventDefault();
            this.onAddCard()
            return;
        }
        this.setState({ titleTxt: value });
    }

    onAddCard = () => {
        const { titleTxt } = this.state;
        // const { elCardsContainer } = this.props
        if (!titleTxt) {
            this.textArea.focus();
            return;
        }

        const { board, currList, onSaveBoard } = this.props;
        const listIdx = board.lists.findIndex(list => list.id === currList.id);

        const card = {
            id: utilsService.makeId(),
            title: titleTxt,
            description: '',
            comments: [],
            checklists: [],
            members: [],
            byMember: 'loggedinUser', //TODO: add loggedinUser -mini user
            labelIds: [],
            createdAt: Date.now(),
            startDate: 0,
            dueDate: 0,
            attachs: [],
            style: {
                coverMode: '',
                bgColor: ''
            }
        }

        board.lists[listIdx].cards.push(card)
        onSaveBoard(board)
        this.setState({ titleTxt: '' }, () => {
            //WHY DOESN'T WORK
            // elCardsContainer.scrollIntoView({ block: "end" });
            this.textArea.focus()
        })
    }

    render() {
        const { titleTxt } = this.state
        const { toggleCardAdd } = this.props;
        return (
            <div className="card-add">
                <TextareaAutosize className="card-add-input" ref={(textArea) => this.textArea = textArea} value={titleTxt} autoFocus onChange={this.handleChange} onKeyDown={this.handleChange} placeholder="Enter a title for this card..." aria-label="empty textarea" />
                <div>
                    <button className="primary-btn" onMouseDown={this.onAddCard}>Add card</button>
                    <CloseRoundedIcon onMouseDown={() => toggleCardAdd()} />
                </div>
            </div>
        )
    }
}
