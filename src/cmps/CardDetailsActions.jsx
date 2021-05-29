import { Component } from 'react'
import { MembersPopOver } from './MemebrsPopOver'
import { LabelsPopOver } from './LabelsPopOver'
import { LabelEditPopOver } from './LabelEditPopOver'
import { ChecklistPopOver } from './ChecklistPopOver'
import { DatePopOver } from './DatePopOver'
import { AttachPopOver } from './AttachPopOver'

export class CardDetailsActions extends Component {//{board,card,toggleMember}

    state = {
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

    addChecklist = (checklist) => {
        console.log(checklist)
    }

    addFile = (fileUrl) => {
        const { card, onSaveCardFromActions } = this.props
        if (!card.attachs) card.attachs = []
        card.attachs.push(fileUrl)
        console.log('fileUrl', fileUrl)
        onSaveCardFromActions(card)
    }

    togglePopOver = () => {
        this.setState({ isPopOver: true })
    }

    render() {
        const { isPopOver } = this.state
        const { card, board } = this.props
        return <div className="details-adds-wrapper">
            <button onClick={() => this.togglePopOver()}>TEST POPOVER</button>
             {/* <MembersPopOver boardMembers={board.members} card={card} toggleMember={this.toggleMember} /> */}
            {/* <LabelsPopOver removeLabel={this.removeLabel} saveLabel={this.saveLabel} boardLabels={board.labels} card={card} toggleLabel={this.toggleLabel}/> */}
            {/* // <ChecklistPopOver addChecklist={this.addChecklist} />
            // <DatePopOver />
            // <AttachPopOver addFile={this.addFile} /> */} 
        </div>
    }


}
