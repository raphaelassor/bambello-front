import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Draggable } from 'react-beautiful-dnd'
import { openPopover } from '../../store/actions/app.actions'
import { DueDateDisplay } from '../DueDateDisplay'
import { CardPreviewChecklist } from './CardPreviewChecklist'
import { CardPreviewLabel } from './CardPreviewLabel'
import { CardPreviewComments } from './CardPreviewComments'
import { Subject as SubjectIcon } from '@material-ui/icons'
import EditIcon from '@material-ui/icons/CreateOutlined'
import { ProfileAvatar } from '../ProfileAvatar'

class _CardPreview extends Component {

    isChecklistsEmpty = ({ checklists }) => {
        return checklists.every(checklist => !checklist.todos.length)
    }

    toggleCardDone = (ev) => {
        ev.preventDefault();
        const { board, card, currList, onSaveBoard } = this.props;
        const listIdx = board.lists.findIndex(list => list.id === currList.id);
        const cardIdx = board.lists[listIdx].cards.findIndex(currCard => card.id === currCard.id);
        board.lists[listIdx].cards[cardIdx].isDone = !board.lists[listIdx].cards[cardIdx].isDone
        onSaveBoard(board);
    }

    openCardEdit = (ev) => {
        ev.preventDefault(); 
        this.onOpenPopover(ev, 'EDIT')
    }

    onOpenPopover = (ev, type, member) => {
        ev.preventDefault();
        const { card, openPopover } = this.props;
        let elPos;
        let props;
        if (type === 'PROFILE') {
            elPos = ev.target.getBoundingClientRect();
            props = { member, card }
        } else if (type === 'EDIT') {
            elPos = this.cardContainer.getBoundingClientRect();
            props = { card }
        }

        openPopover(type, elPos, props)
    }

    draggableStyle = (style, snapshot) => {
        if (!snapshot.isDropAnimating) {
            return style;
        }
        return {
            ...style,
            transitionDuration: `0.001s`,
        }
    }

    get cardStyles() {
        const { coverMode, bgColor } = this.props.card.style
        return coverMode === 'full' ? { backgroundColor: bgColor, borderTopLeftRadius: '3px', borderTopRightRadius: '3px', minHeight: '52px' } : {};
    }

    render() {
        const { board, card, currList, cardIdx } = this.props;
        const { coverMode, bgColor } = card.style;
        return (
            <Draggable draggableId={card.id} index={cardIdx}>
                {(provided, snapshot) => (
                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} style={this.draggableStyle(provided.draggableProps.style, snapshot)} >
                        <Link to={`/board/${board._id}/${currList.id}/${card.id}`} className="clean-link" onContextMenu={this.openCardEdit}>
                            <div className="card-preview-container" ref={(div) => { this.cardContainer = div }} >
                                <div className="card-preview-edit-btn" onClick={this.openCardEdit}><EditIcon /></div>
                                {coverMode === 'header' && <div className="card-preview-header" style={coverMode ? { backgroundColor: bgColor } : {}}></div>}
                                <div className={`card-preview ${coverMode === 'full' && 'cover-full'}`} style={this.cardStyles}>
                                    {coverMode !== 'full' && <div className="card-preview-labels">
                                        {!!card.labelIds.length && card.labelIds.map(labelId => <CardPreviewLabel key={labelId} labelId={labelId} labels={board.labels} />)}
                                    </div>
                                    }
                                    <div className="card-preview-name">{card.title}</div>
                                    {coverMode !== 'full' &&
                                        <div className="card-preview-bagdes">
                                            <div className="card-preview-icons">
                                                {/* {isUserWatched && <RemoveRedEyeOutlinedIcon/>} */} {/*TODO: try to change cmp name to WatchIcon, implement user watched*/}
                                                {!!card.dueDate && <DueDateDisplay card={card} toggleCardDone={this.toggleCardDone} displayType="preview" />}
                                                {card.description && <div><SubjectIcon /></div>}
                                                {!!card.comments.length && <CardPreviewComments commentsCount={card.comments.length} />}
                                                {/* attachment */}
                                                {!this.isChecklistsEmpty(card) && <CardPreviewChecklist checklists={card.checklists} />}
                                            </div>
                                            {!!card.members.length && <div className="card-preview-members">
                                                {card.members.map(member => {
                                                    return <ProfileAvatar member={member} key={member._id} size={28} onOpenPopover={this.onOpenPopover} />
                                                })}
                                            </div>
                                            }
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

const mapDispatchToProps = {
    openPopover
}

export const CardPreview = connect(null, mapDispatchToProps)(_CardPreview)