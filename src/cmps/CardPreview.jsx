import { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { DueDateDisplay } from './DueDateDisplay'
import { CardPreviewChecklist } from './CardPreviewChecklist'
import { Subject as SubjectIcon } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/CreateOutlined';
import RemoveRedEyeOutlinedIcon from '@material-ui/icons/RemoveRedEyeOutlined';

class _CardPreview extends Component {

    isChecklistsEmpty = ({ checklists }) => {
        return checklists.every(checklist => !checklist.todos.length)
    }

    toggleCardDone = (ev) => {
        ev.preventDefault();
        //TODO: update isFinish in card
        const { board, card, currList, onSaveBoard } = this.props;
        const listIdx = board.lists.findIndex(list => list.id === currList.id);
        const cardIdx = board.lists[listIdx].cards.findIndex(currCard => card.id === currCard.id);
        board.lists[listIdx].cards[cardIdx].isDone = !board.lists[listIdx].cards[cardIdx].isDone
        onSaveBoard(board);
    }

    get cardStyles() {
        const { coverMode, bgColor } = this.props.card.style
        return coverMode === 'full' ? { backgroundColor: bgColor, borderTopLeftRadius: '3px', borderTopRightRadius: '3px', minHeight: '52px' } : {};
    }

    render() {
        const { card, currList } = this.props;
        const { coverMode, bgColor } = card.style
        const { boardId } = this.props.match.params;

        return (
            <Link to={`/board/${boardId}/${currList.id}/${card.id}`} className="clean-link">
                <div className="card-preview-container">
                    <div className="card-preview-edit"><EditIcon /></div>
                    {coverMode === 'header' && <div className="card-preview-header" style={coverMode ? { backgroundColor: bgColor } : {}}></div>}
                    <div className={`card-preview ${coverMode === 'full' && 'cover-full'}`} style={this.cardStyles}>
                        <div className="card-preview-name">{card.title}</div>
                        {coverMode !== 'full' && <div className="card-preview-icons">
                            {/* {isUserWatched && <RemoveRedEyeOutlinedIcon/>} */} {/*TODO: try to change cmp name to WatchIcon, implement user watched*/}
                            {!!card.dueDate && <DueDateDisplay card={card} toggleCardDone={this.toggleCardDone} displayType="preview"/>}
                            {card.description && <div><SubjectIcon /></div>}
                            {!this.isChecklistsEmpty(card) && <CardPreviewChecklist checklists={card.checklists} />}
                        </div>
                        }
                    </div>
                </div>
            </Link>
        )
    }
}

export const CardPreview = withRouter(_CardPreview);
