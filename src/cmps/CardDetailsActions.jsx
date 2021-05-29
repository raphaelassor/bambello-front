import { Component } from 'react'
import { MembersPopOver } from './MemebrsPopOver'
import { LabelsPopOver } from './LabelsPopOver'
import { LabelEditPopOver } from './LabelEditPopOver'
import { ChecklistPopOver } from './ChecklistPopOver'
import { DatePopOver } from './DatePopOver'
import { AttachPopOver } from './AttachPopOver'
import { CoverPopOver } from './CoverPopOver'
import LabelIcon from '@material-ui/icons/LocalOfferOutlined';
export class CardDetailsActions extends Component {//{board,card,toggleMember}

    state = {
        popOver:null,
        isPopOver:false,
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
        const { card, onSaveCardFromActions } = this.props
        if (!card.checklists) card.checklists = []
        card.checklists.push(checklist)
        onSaveCardFromActions(card)

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

    saveCover = ({ bgImgUrl, bgColor, coverMode }) => {
        const { card, onSaveCardFromActions } = this.props
        card.style = {
            coverMode,
            bgImgUrl,
            bgColor,
        }
        onSaveCardFromActions(card)
    }
    togglePopOver=(popOver='')=>{
        if(this.state.popOver=== popOver) this.setState({popOver:'',isPopOverMode:false})
        else this.setState({popOver,isPopOverMode:true})
    }
    render() {
        const { popOver,isPopOverMode } = this.state
        const { card, board } = this.props
        console.log(card)
        return <div className="details-actions-wrapper flex column">
            <button className="secondary-btn actions-btn" onClick={() => this.togglePopOver('members')}>
            <i class="far fa-user icon-sm "></i>
                <span>Members</span>
            </button>
            {popOver==='members'&& <MembersPopOver togglePopOver={this.togglePopOver} boardMembers={board.members} card={card} toggleMember={this.toggleMember} />}

            <button className="secondary-btn actions-btn" onClick={() => this.togglePopOver('labels')}>
            <span>Labels</span>
            <LabelIcon/> 
            </button>
            {popOver==='labels'&&  <LabelsPopOver togglePopOver={this.togglePopOver} removeLabel={this.removeLabel} saveLabel={this.saveLabel} boardLabels={board.labels} card={card} toggleLabel={this.toggleLabel}/>}

            <button className="secondary-btn" onClick={() => this.togglePopOver('checklist')}>Checklist</button>
            {popOver==='checklist'&&  <ChecklistPopOver togglePopOver={this.togglePopOver} addChecklist={this.addChecklist} />}
            
            <button className="secondary-btn" onClick={() => this.togglePopOver('date')}>
                <i class="far fa-clock icon-sm "></i>
                <span>Date</span>
            </button>
            {popOver==='date'&&<DatePopOver togglePopOver={this.togglePopOver}/>}

            <button className="secondary-btn" onClick={() => this.togglePopOver('attach')}>Attach</button>
            {popOver==='attach'&&<AttachPopOver togglePopOver={this.togglePopOver} addFile={this.addFile}/>}

            <button className="secondary-btn" onClick={() => this.togglePopOver('cover')}>Cover</button>
            {popOver==='cover'&& <CoverPopOver togglePopOver={this.togglePopOver} saveCover={this.saveCover} />}
        </div>
    }


}
