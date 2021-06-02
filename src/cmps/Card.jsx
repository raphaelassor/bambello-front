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

class _Card extends Component {

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

    openCardEdit = (ev) => {
        ev.preventDefault();
        this.onOpenPopover(ev, 'EDIT_CARD')
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
        const { coverMode, bgColor } = this.props.card.style
        if (coverMode !== 'header') return { borderRadius: '3px' };
        else if (coverMode === 'full') return { backgroundColor: bgColor, borderTopLeftRadius: '3px', borderTopRightRadius: '3px', minHeight: '56px' }
        else return {};

    }

    render() {

        const { isEditMode, card, board } = this.props;
        const { coverMode, bgColor } = card.style;
        return (
            <div className="card-preview-container" ref={(div) => { this.cardContainer = div }} onContextMenu={this.openCardEdit}>
                {!isEditMode && <div className="card-preview-edit-btn" onClick={this.openCardEdit}><EditIcon /></div>}
                {coverMode === 'header' && <div className="card-preview-header" style={coverMode ? { backgroundColor: bgColor } : {}}></div>}
                <div className={`card-preview ${coverMode === 'full' && 'cover-full'}`} style={this.cardStyles}>
                    {coverMode !== 'full' && <div className="card-preview-labels">
                        {!!card.labelIds.length && card.labelIds.map(labelId => <CardPreviewLabel key={labelId} labelId={labelId} labels={board.labels} isPreview={isEditMode} />)}
                    </div>
                    }
                    {isEditMode ?
                        <input type="text" className="card-preview-name" autoFocus onFocus={(ev) => ev.target.select()} />
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