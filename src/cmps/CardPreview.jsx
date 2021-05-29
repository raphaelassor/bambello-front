import { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { CardPreviewDate } from './CardPreviewDate'
import { CardPreviewChecklist } from './CardPreviewChecklist'
import { Subject as SubjectIcon } from '@material-ui/icons'
import EditIcon from '@material-ui/icons/CreateOutlined'
import { Draggable } from 'react-beautiful-dnd'

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

    get cardStyles() {
        const { coverMode, bgColor } = this.props.card.style
        return coverMode === 'full' ? { backgroundColor: bgColor, borderTopLeftRadius: '3px', borderTopRightRadius: '3px', minHeight: '52px' } : {};
    }

     draggableStyle = (style, snapshot) => {
        if (!snapshot.isDropAnimating) {
            return style;
        }
        return {
            ...style,
            transform: 'rotate(0.5turn)',
            transitionDuration: `0.001s`,
        }
    }

    render() {
        const { card, currList, cardIdx } = this.props;
        const { coverMode, bgColor } = card.style
        const { boardId } = this.props.match.params;
        return (
            <Draggable draggableId={card.id} index={cardIdx}>
                {(provided, snapshot) => (
                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} style={this.draggableStyle(provided.draggableProps.style, snapshot)}>
                        <Link to={`/board/${boardId}/${currList.id}/${card.id}`} className="clean-link">
                            <div  className="card-preview-container">
                                <div className="card-preview-edit"><EditIcon /></div>
                                {coverMode === 'header' && <div className="card-preview-header" style={coverMode ? { backgroundColor: bgColor } : {}}></div>}
                                <div className={`card-preview ${coverMode === 'full' && 'cover-full'}`} style={this.cardStyles}>
                                    <div className="card-preview-name">{card.title}</div>
                                    {coverMode !== 'full' && <div className="card-preview-icons">
                                        {/* {isUserWatched && <RemoveRedEyeOutlinedIcon/>} */} {/*TODO: try to change cmp name to WatchIcon, implement user watched*/}
                                        {!!card.dueDate && <CardPreviewDate card={card} onToggleCardFinish={this.onToggleCardFinish} />}
                                        {card.description && <div><SubjectIcon /></div>}
                                        {!this.isChecklistsEmpty(card) && <CardPreviewChecklist checklists={card.checklists} />}
                                    </div>
                                    }
                                </div>
                            </div>
                        </Link>
                    </div>
                )}
            </Draggable>
        )
    }
}

export const CardPreview = withRouter(_CardPreview);
