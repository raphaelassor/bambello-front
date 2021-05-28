import { Component } from 'react'
import board from '../data/board.json'
import { MembersPopOver } from './MemebrsPopOver'
import {LabelsPopOver} from './LabelsPopOver'
import { LabelEditPopOver } from './LabelEditPopOver'
import { ChecklistPopOver } from './ChecklistPopOver'
import {DatePopOver} from './DatePopOver'
import { AttachPopOver } from './AttachPopOver'
export class EditPopOvers extends Component {//{board,card,toggleMember}
    state = {
        card: board.lists[0].cards[0],
        currBoard:board
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

    saveLabel= (labelToSave)=>{
        if(labelToSave.id) {
            console.log('this.state.currBoard.labels',this.state.currBoard.labels)
            const idx=board.labels.findIndex(label=>label.id===labelToSave.id)
            this.state.currBoard.labels.splice(idx,1,labelToSave)
        }
        else {
            labelToSave.id= Math.random()
            this.state.currBoard.labels.push(labelToSave)
        }
        this.setState({currBoard:this.state.currBoard})
        //save board
    }
    removeLabel=(labelToRemove)=>{
        const idx=board.labels.findIndex(label=>label.id===labelToRemove.id)
        this.state.currBoard.labels.splice(idx,1)
        this.setState({currBoard:this.state.currBoard})
    }

    addChecklist=(checklist)=>{
        console.log(checklist)
    }

    addFile=(fileUrl)=>{
        const {card}=this.state
        if(!card.attachs)card.attachs=[]
        card.attachs.push(fileUrl)
        console.log('fileUrl',fileUrl)
        this.setState({card})
    }

    render() {
        const { card ,currBoard} = this.state
        return <div className="details-adds-wrapper">
            {/* <MembersPopOver boardMembers={board.members} card={card} toggleMember={this.toggleMember} /> */}
            <LabelsPopOver removeLabel={this.removeLabel}saveLabel={this.saveLabel}boardLabels={currBoard.labels} card={card} toggleLabel={this.toggleLabel} />
         {/* <ChecklistPopOver addChecklist={this.addChecklist}/> */}
           {/* <DatePopOver/> */}
            {/* <AttachPopOver addFile={this.addFile}/> */}
        </div>
    }


}
