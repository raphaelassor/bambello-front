import { Component } from 'react'
import { connect } from 'react-redux'
import { boardService } from '../services/board.service'
import { ProfileAvatar } from './ProfileAvatar'
import { DueDateDisplay } from './DueDateDisplay'
import { CardPreviewChecklist } from './CardPreview/CardPreviewChecklist'
import { CardPreviewLabel } from './CardPreview/CardPreviewLabel'
import { CardPreviewComments } from './CardPreview/CardPreviewComments'
import { Subject as SubjectIcon } from '@material-ui/icons'
import { onSaveBoard } from '../store/actions/board.actions'
import { openPopover } from '../store/actions/app.actions'
import EditIcon from '@material-ui/icons/CreateOutlined'
import { TextareaAutosize } from '@material-ui/core';
import { eventBusService } from '../services/event-bus.service'

class _Card extends Component {

    state = {
        cardTitle: ''
    }

    componentDidMount() {
        const { card, isEditMode } = this.props
        if (isEditMode)
            this.setState({ cardTitle: card.title })
    }

    handleChange = (ev) => {
        const { name, value } = ev.target
        this.setState({ [name]: value })
    }


    isChecklistsEmpty = ({ checklists }) => {
        return checklists.every(checklist => !checklist.todos.length)
    }

    toggleCardDone = (ev) => {
        ev.preventDefault();
        const { board, card, onSaveBoard } = this.props;
        card.isDone = !card.isDone
        const savedBoard = boardService.updateCardInBoard(board, card)
        onSaveBoard(savedBoard);
    }

    onOpenCardEdit = (ev) => {
        ev.preventDefault();
        const { card } = this.props
        const elPos = this.cardContainer.getBoundingClientRect();
        eventBusService.emit('card-edit', { elPos, card });
    }

    onOpenPopover = (ev, type, member) => {
        ev.preventDefault();
        const { card, openPopover } = this.props;
        let elPos;
        let props;
        if (type === 'PROFILE') {
            elPos = ev.target.getBoundingClientRect();
            props = { member, card }
        } else if (type === 'EDIT_CARD') {
            elPos = this.cardContainer.getBoundingClientRect();
            props = { card }
        }
        openPopover(type, elPos, props)
    }

    get cardStyles() {
        const { isEditMode } = this.props
        const { coverMode, bgColor } = this.props.card.style
        if (coverMode === 'header') return { minHeight: '56px' };
        else if (isEditMode && coverMode === 'full') return {};
        else if (coverMode === 'full') return { backgroundColor: bgColor, borderTopLeftRadius: '3px', borderTopRightRadius: '3px', minHeight: '56px' };
        else return { borderRadius: '3px' };
    }

    render() {

        const { isEditMode, card, board } = this.props;
        let { coverMode, bgColor } = card.style;
        const { cardTitle } = this.state

        if (isEditMode && coverMode === 'full') coverMode = 'header';

        return (
            <div className="card-preview-container" ref={(div) => { this.cardContainer = div }} onContextMenu={this.onOpenCardEdit}>
                {!isEditMode && <div className="card-preview-edit-btn" onClick={this.onOpenCardEdit}><EditIcon /></div>}
                {coverMode === 'header' && <div className="card-preview-header" style={coverMode ? { backgroundColor: bgColor } : {}}></div>}
                <div className={`card-preview ${coverMode === 'full' && 'cover-full'}`} style={this.cardStyles}>
                    {coverMode !== 'full' && <div className="card-preview-labels">
                        {!!card.labelIds.length && card.labelIds.map(labelId => <CardPreviewLabel key={labelId} labelId={labelId} labels={board.labels} isPreview={isEditMode} />)}
                    </div>
                    }
                    {isEditMode ?
                        <TextareaAutosize
                            className="card-preview-input"
                            name="cardTitle"
                            autoFocus
                            value={cardTitle}
                            onChange={this.handleChange} aria-label="empty textarea" />
                        :
                        <div className="card-preview-name">{card.title}</div>
                    }
                    {coverMode !== 'full' &&
                        <div className="card-preview-bagdes">
                            <div className="card-preview-icons">
                                {/* {isUserWatched && <RemoveRedEyeOutlinedIcon/>} */} {/*TODO: try to change cmp name to WatchIcon, implement user watched*/}
                                {!!card.dueDate && <DueDateDisplay card={card} toggleCardDone={this.toggleCardDone} displayType="preview" />}
                                {card.description && <div><SubjectIcon /></div>}
                                {!!card.comments.length && <CardPreviewComments commentsCount={card.comments.length} />}
                                {/*TODO: attachment icon*/}
                                {!this.isChecklistsEmpty(card) && <CardPreviewChecklist checklists={card.checklists} />}
                            </div>
                            {!!card.members.length && <div className="card-preview-members">
                                {card.members.map(member => {
                                    return isEditMode ?
                                        <ProfileAvatar member={member} key={member._id} size={28} />
                                        :
                                        <ProfileAvatar member={member} key={member._id} size={28} onOpenPopover={this.onOpenPopover} />
                                })}
                            </div>
                            }
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    onSaveBoard,
    openPopover
}

export const Card = connect(null, mapDispatchToProps)(_Card)