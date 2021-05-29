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
        const { coverMode, bgColor } = card.style
        const { boardId } = this.props.match.params;
        const cardStyles = coverMode === 'full' ? { backgroundColor: bgColor, borderTopLeftRadius: '3px', borderTopRightRadius: '3px', minHeight: '52px'} : {};

        return (
            <Link to={`/board/${boardId}/${currList.id}/${card.id}`} className="clean-link">
                {coverMode === 'header' && <div className="card-preview-header" style={coverMode ? { backgroundColor: bgColor } : {}}></div>}
                <div className="card-preview" style={cardStyles}>
                    <div className="card-preview-menu"><EditIcon /></div>
                    <div className="card-preview-name">{card.title}</div>
                    {coverMode !== 'full' && <div className="card-preview-icons">
                        {/* {isUserWatched && <RemoveRedEyeOutlinedIcon/>} */} {/*TODO: try to change cmp name to WatchIcon, implement user watched*/}
                        {!!card.dueDate && <CardPreviewDate card={card} onToggleCardFinish={this.onToggleCardFinish} />}
                        {card.description && <div><SubjectIcon /></div>}
                        {!this.isChecklistsEmpty(card) && <CardPreviewChecklist checklists={card.checklists} />}
                    </div>
                    }
                </div>
            </Link>
        )
    }
}

export const CardPreview = withRouter(_CardPreview);
