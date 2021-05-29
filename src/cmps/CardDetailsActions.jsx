import { Component } from 'react'
import { MembersPopOver } from './MemebrsPopOver'
import { LabelsPopOver } from './LabelsPopOver'
import { ChecklistPopOver } from './ChecklistPopOver'
import { DatePopOver } from './DatePopOver'
import { AttachPopOver } from './AttachPopOver'
import { CoverPopOver } from './CoverPopOver'
import { utilsService } from '../services/utils.service'
import LabelIcon from '@material-ui/icons/LocalOfferOutlined';
import CheckboxIcon from '@material-ui/icons/CheckBoxOutlined'
import CoverIcon from '@material-ui/icons/VideoLabel';
import MinusIcon from '@material-ui/icons/RemoveOutlined';
export class CardDetailsActions extends Component {//{board,card,toggleMember}

    state = {
        popOver: null,
        isPopOver: false,
    }

    toggleMember = (member) => {//DATA IS DIFFERENT SO DIFFERENT FUNCTION FOR NOW
        const { card, onSaveCardFromActions } = this.props
        const idx = card.members.findIndex(cardMember => cardMember._id === member._id)
        if (idx === -1) card.members.push(member)
        else card.members.splice(idx, 1)
        onSaveCardFromActions(card)
    }

    toggleLabel = (label) => {
        const { card, onSaveCardFromActions } = this.props
        const idx = card.labelIds.findIndex(labelId => labelId === label.id)
        if (idx === -1) card.labelIds.push(label.id)
        else card.labelIds.splice(idx, 1)
        onSaveCardFromActions(card)
    }

    saveLabel = (labelToSave) => {
        const { board, onSaveBoard } = this.props
        if (labelToSave.id) {
            const idx = board.labels.findIndex(label => label.id === labelToSave.id)
            board.labels.splice(idx, 1, labelToSave)
        }
        else {
            labelToSave.id = Math.random()
            board.labels.push(labelToSave)
        }
        onSaveBoard(board)
    }

    removeLabel = (labelToRemove) => {
        const { board, onSaveBoard } = this.props
        const idx = board.labels.findIndex(label => label.id === labelToRemove.id)
        board.labels.splice(idx, 1)
        onSaveBoard(board)
    }

    addChecklist = (title) => {
        const { card, onSaveCardFromActions } = this.props
        if (!card.checklists) card.checklists = []
        const checklist = {
            id: utilsService.makeId(),
            title,
            todos: []
        }
        card.checklists.push(checklist)

        onSaveCardFromActions(card)

    }

    saveDueDate = (date) => {
        const { card, onSaveCardFromActions } = this.props
        const dueDate = date ? card.dueDate = Date.parse(date) : 0;
        card.dueDate = dueDate;
        onSaveCardFromActions(card)
    }

    addFile = (fileUrl) => {
        const { card, onSaveCardFromActions } = this.props
        if (!card.attachs) card.attachs = []
        card.attachs.push(fileUrl)

        onSaveCardFromActions(card)
    }

    saveCover = ({ bgImgUrl, bgColor, coverMode }) => {
        const { card, onSaveCardFromActions } = this.props
        card.style = {
            coverMode,
            bgImgUrl,
            bgColor,
        }
        onSaveCardFromActions(card)
    }

    toggleArchive = () => {
        const { card, onSaveCardFromActions } = this.props
        card.isArchived = !card.isArchived;
        onSaveCardFromActions(card)
    }

    removeCard = () => {
        const { board, onSaveBoard, card, goBackToBoard } = this.props
        board.lists.forEach(list => {
            list.cards.forEach((boardCard, idx) => {
                if (boardCard.id === card.id) list.cards.splice(idx, 1)
            })
        })
        onSaveBoard(board)
        goBackToBoard()
    }

    togglePopOver = (popOver = '') => {
        if (this.state.popOver === popOver) this.setState({ popOver: '', isPopOverMode: false })
        else this.setState({ popOver, isPopOverMode: true })
    }

    render() {
        const { popOver } = this.state
        const { card, board } = this.props
        return <div className="details-actions-wrapper flex column">
            <h4>ADD TO CARD</h4>
            <button className="secondary-btn actions-btn" onClick={() => this.togglePopOver('members')}>
                <div className="actions-btn-content flex align-center">
                    <i className="far fa-user icon-sm "></i>
                    <span>Members</span>
                </div>
            </button>
            {popOver === 'members' && <MembersPopOver togglePopOver={this.togglePopOver} boardMembers={board.members} card={card} toggleMember={this.toggleMember} />}

            <button className="secondary-btn actions-btn" onClick={() => this.togglePopOver('labels')}>
                <div className="actions-btn-content flex align-center">
                    <LabelIcon />
                    <span>Labels</span>
                </div>
            </button>
            {popOver === 'labels' && <LabelsPopOver togglePopOver={this.togglePopOver} removeLabel={this.removeLabel} saveLabel={this.saveLabel} boardLabels={board.labels} card={card} toggleLabel={this.toggleLabel} />}

            <button className="secondary-btn actions-btn" onClick={() => this.togglePopOver('checklist')}>
                <div className="actions-btn-content flex align-center">
                    <CheckboxIcon />
                    <span>Checklist</span>
                </div>
            </button>
            {popOver === 'checklist' && <ChecklistPopOver togglePopOver={this.togglePopOver} addChecklist={this.addChecklist} />}

            <button className="secondary-btn actions-btn" onClick={() => this.togglePopOver('date')}>
                <div className="actions-btn-content flex align-center">
                    <i className="far fa-clock icon-sm "></i>
                    <span>Date</span>
                </div>
            </button>
            {popOver === 'date' && <DatePopOver saveDate={this.saveDueDate} togglePopOver={this.togglePopOver} />}

            <button className="secondary-btn actions-btn" onClick={() => this.togglePopOver('attach')}>
                <div className="actions-btn-content flex align-center">
                    <i className="fas fa-paperclip icon-sm"></i>
                    <span>Attachment</span>
                </div>
            </button>
            {popOver === 'attach' && <AttachPopOver togglePopOver={this.togglePopOver} addFile={this.addFile} />}

            <button className="secondary-btn actions-btn" onClick={() => this.togglePopOver('cover')}>
                <div className="actions-btn-content flex align-center">
                    <CoverIcon />
                    <span>Cover</span>
                </div>
            </button>
            {popOver === 'cover' && <CoverPopOver togglePopOver={this.togglePopOver} saveCover={this.saveCover} card={card} />}
            <h4>ACTIONS</h4>

            {!card.isArchived ?
                <button className="secondary-btn actions-btn" onClick={this.toggleArchive}>
                    <div className="actions-btn-content flex align-center">
                        <i className="fas fa-archive icon-sm"></i>
                        <span>Archive</span>
                    </div>
                </button>
                :
                <>
                    <button className="secondary-btn actions-btn" onClick={this.toggleArchive} >
                        <div className="actions-btn-content flex align-center">
                            <i className="fas fa-undo icon-sm"></i>
                            <span>Return To Board</span>
                        </div>
                    </button>
                    <button className="secondary-btn actions-btn danger-btn" onClick={this.removeCard} >
                        <div className="actions-btn-content  flex align-center">
                            <MinusIcon className="remove" />
                            <span>Delete</span>
                        </div>
                    </button>
                </>}


        </div>
    }


}
