
import { connect } from 'react-redux';
import { utilsService } from '../../services/utils.service';
import { Component } from 'react';
import { boardService } from '../../services/board.service';
import { closePopOver } from '../../store/actions/app.actions';
import { onSaveBoard } from "../../store/actions/board.actions";
import { PopOver } from './PopOver';

class _PopOverChecklist extends Component {

    state = {
        title: ''
    }
    handlechange = ({ target }) => {
        this.setState({ title: target.value })
    }

    addChecklist = () => {
        const { card, onSaveBoard, board } = this.props
        if (!card.checklists) card.checklists = []
        const checklist = {
            id: utilsService.makeId(),
            title: this.state.title,
            todos: []
        }
        card.checklists.push(checklist)
        const updatedBoard = boardService.updateCardInBoard(board, card)
        onSaveBoard(updatedBoard)
        this.props.closePopOver()

    }

    render() {
        return <PopOver title={"Add A Checklist"}>
            <div className="checklist-pop-over-content">
                <form onSubmit={this.addChecklist}>
                <label htmlFor="checklist-input" className="pop-over-label">Title</label>
                <input className="pop-over-input" id="checklist-input" type="text" value={this.state.title} onChange={this.handlechange} placeholder="Enter a title..."/>
                <button className="primary-btn wide-btn">Add</button>
                </form>
            </div>
        </PopOver>
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
    }
}

const mapDispatchToProps = {
    onSaveBoard,
    closePopOver
}


export const PopOverChecklist = connect(mapStateToProps, mapDispatchToProps)(_PopOverChecklist)

