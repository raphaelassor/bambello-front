import { Component } from 'react'
import board from '../data/board.json'
import { MembersPopOver } from './MemebrsPopOver'
import {LabelsPopOver} from './LabelsPopOver'
import { LabelAddPopOver } from './LabelAddPopOver'
export class DetailsActions extends Component {//{board,card,toggleMember}
    state = {
        card: board.lists[0].cards[0]
    }

    toggleMember = (member) => {//DATA IS DIFFERENT SO DIFFERENT FUNCTION FOR NOW
        const { card } = this.state
        const idx = card.members.findIndex(cardMember => cardMember._id === member._id)
        if (idx === -1) card.members.push(member)
        else card.members.splice(idx, 1)
        this.setState({ card })
    }

    toggleLabel = (label) => {
        const { card } = this.state
        const idx = card.labelIds.findIndex(labelId => labelId === label.id)
        if (idx === -1) card.labelIds.push(label.id)
        else card.labelIds.splice(idx, 1)
        this.setState({ card })
    }


    render() {
        const { card } = this.state
        return <div className="details-adds-wrapper">
            {/* <MembersPopOver boardMembers={board.members} card={card} toggleMember={this.toggleMember} /> */}
            {/* <LabelsPopOver boardLabels={board.labels} card={card} toggleLabel={this.toggleLabel} /> */}
            {/* <LabelAddPopOver/> */}
            {/* LABELS */}
            {/* CHECKLIST */}
            {/* DATE */}
            {/* ATTACHMENT */}
        </div>
    }


}
