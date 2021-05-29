import { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { CardPreviewDate } from './CardPreviewDate'
import { CardPreviewChecklist } from './CardPreviewChecklist'
import { Subject as SubjectIcon } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/CreateOutlined';
import RemoveRedEyeOutlinedIcon from '@material-ui/icons/RemoveRedEyeOutlined';

class _CardPreview extends Component {

    isChecklistsEmpty = ({ checklists }) => {
        return checklists.every(checklist => !checklist.todos.length)
    }

    onToggleCardFinish = (ev) => {
        ev.preventDefault();
        //TODO: update isFinish in card
        const { board, card, currList, onSaveBoard } = this.props;

        const listIdx = board.lists.findIndex(list => list.id === currList.id);
        const cardIdx = board.lists[listIdx].cards.findIndex(currCard => card.id === currCard.id);
        board.lists[listIdx].cards[cardIdx].isDone = !board.lists[listIdx].cards[cardIdx].isDone

        onSaveBoard(board);
    }

    render() {
        const { card, currList } = this.props;
        const { boardId } = this.props.match.params;

        return (
            <Link to={`/board/${boardId}/${currList.id}/${card.id}`} className="clean-link">
                <div className="card-preview">
                    <div className="card-preview-menu"><EditIcon /></div>
                    <div className="card-preview-name">{card.title}</div>
                    <div className="card-preview-icons">
                        {/* {isUserWatched && <RemoveRedEyeOutlinedIcon/>} */} {/*TODO: try to change cmp name to WatchIcon, implement user watched*/}
                        {!!card.dueDate && <CardPreviewDate card={card} onToggleCardFinish={this.onToggleCardFinish} />}
                        {card.description && <div><SubjectIcon /></div>}
                        {!this.isChecklistsEmpty(card) && <CardPreviewChecklist checklists={card.checklists} />}
                    </div>
                </div>
            </Link>
        )
    }
}

export const CardPreview = withRouter(_CardPreview);
