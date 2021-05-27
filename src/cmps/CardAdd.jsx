import { Component } from 'react'
import { TextareaAutosize } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { utilsService } from '../services/utils.service'

export class CardAdd extends Component {

    state = {
        titleTxt: ''
    }

    handleChange = ({ target }) => {
        const { value } = target;
        this.setState({ titleTxt: value });
    }

    onAdd = () => {
        const { toggleCardAdd } = this.props;
        const { titleTxt } = this.state;
        if (!titleTxt) {
            this.addInput.focus();
            return;
        }

        const { board, currList, onSaveBoard } = this.props;
        const listIdx = board.lists.findIndex(list => list.id === currList.id);

        //
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
            style: null
        }

        board.lists[listIdx].cards.push(card)
        onSaveBoard(board)
        toggleCardAdd()
    }

    render() {
        const { titleTxt } = this.state
        const { toggleCardAdd } = this.props;
        return (
            <div className="card-add">
                <TextareaAutosize className="card-add-input" ref={(input) => { this.addInput = input; }} value={titleTxt} autoFocus onChange={this.handleChange} placeholder="Enter a title for this card..." aria-label="empty textarea" />
                <div>
                    <button className="primary-btn" onClick={this.onAdd}>Add card</button>
                    <CloseRoundedIcon onClick={() => toggleCardAdd()} />
                </div>
            </div>
        )
    }
}
