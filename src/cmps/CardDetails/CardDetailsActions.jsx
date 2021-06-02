import { Component } from 'react'
import LabelIcon from '@material-ui/icons/LocalOfferOutlined'
import CheckboxIcon from '@material-ui/icons/CheckBoxOutlined'
import CoverIcon from '@material-ui/icons/VideoLabel';
import MinusIcon from '@material-ui/icons/RemoveOutlined';
import CopyIcon from '@material-ui/icons/FileCopyOutlined';
import WatchIcon from '@material-ui/icons/VisibilityOutlined';
import { openPopover, closePopover } from '../../store/actions/app.actions'
import { connect } from 'react-redux'
import { utilsService } from '../../services/utils.service'
import { ElementOverlay } from '../Popover/ElementOverlay'

class _CardDetailsActions extends Component {

    addFile = (fileUrl) => {
        const { card, onSaveCardFromActions, closePopover } = this.props
        if (!card.attachs) card.attachs = []
        const attach = {
            id: utilsService.makeId(),
            fileName: `${utilsService.makeId(12)}.jpg`,
            url: fileUrl,
            createdAt: Date.now()
        }
        card.attachs.push(attach)
        onSaveCardFromActions(card)
        closePopover()
    }

    joinCard = () => {
        //board.members.find(loggedInUser....)
        if (this.isUserMember()) return //cannot join as member - already in 
        const { card, loggedInUser, onSaveCardFromActions } = this.props
        card.members.push(loggedInUser)
        onSaveCardFromActions(card)
    }

    toggleArchive = () => {
        const { card, onSaveCardFromActions } = this.props
        card.isArchived = !card.isArchived;
        onSaveCardFromActions(card)
    }

    isUserMember = () => {
        const { card, loggedInUser } = this.props
        const idx = card.members.findIndex(member => member._id === loggedInUser._id)
        if (idx !== -1) return true
        return false
    }

    toggelWatch = () => {
        //watchers array, if found splice , else push
    }

    removeCard = () => {
        const { board, onSaveBoard, card } = this.props
        board.lists.forEach(list => {
            list.cards.forEach((boardCard, idx) => {
                if (boardCard.id === card.id) list.cards.splice(idx, 1)
            })
        })
        onSaveBoard(board)
        this.props.goBackToBoard()
    }

    onOpenPopover = (ev, popoverName) => {
        const elPos = ev.target.getBoundingClientRect()
        const props = {
            card: this.props.card
        }
        this.props.openPopover(popoverName, elPos, props)
    }

    render() {
        const { card, board, currPopoverName, openPopover, loggedInUser } = this.props
        return <div className="details-actions-wrapper flex column">
            {!this.isUserMember() && <div className="suggested flex column"> <h4>SUGGESTED</h4>
                <button className="secondary-btn actions-btn " onClick={this.joinCard}>
                    <div className="actions-btn-content flex align-center">
                        <i className="far fa-user icon-sm "></i>
                        <span>Join</span>

                    </div>
                </button></div>}
            <h4>ADD TO CARD</h4>
            <div className="add-section flex column">
                <button className="secondary-btn actions-btn " onClick={(ev) => this.onOpenPopover(ev, 'MEMBERS')}>
                    <div className="actions-btn-content flex align-center">
                        <i className="far fa-user icon-sm "></i>
                        <span>Members</span>
                    </div>
                    <ElementOverlay />
                </button>


                <button className="secondary-btn actions-btn" onClick={(ev) => this.onOpenPopover(ev, 'LABELS')}>
                    <div className="actions-btn-content flex align-center">
                        <LabelIcon />
                        <span>Labels</span>
                    </div>
                    <ElementOverlay />
                </button>


                <button className="secondary-btn actions-btn" onClick={(ev) => this.onOpenPopover(ev, 'CHECKLIST')}>
                    <div className="actions-btn-content flex align-center">
                        <CheckboxIcon />
                        <span>Checklist</span>
                    </div>
                    <ElementOverlay />
                </button>


                <button className="secondary-btn actions-btn" onClick={(ev) => this.onOpenPopover(ev, 'DATE')}>
                    <div className="actions-btn-content flex align-center">
                        <i className="far fa-clock icon-sm "></i>
                        <span>Date</span>
                    </div>
                    <ElementOverlay />
                </button>

                <button className="secondary-btn actions-btn" onClick={(ev) => this.onOpenPopover(ev, 'ATTACH')}>
                    <div className="actions-btn-content flex align-center">
                        <i className="fas fa-paperclip icon-sm"></i>
                        <span>Attachment</span>
                    </div>
                    <ElementOverlay />
                </button>


                <button className="secondary-btn actions-btn" onClick={(ev) => this.onOpenPopover(ev, 'COVER')}>
                    <div className="actions-btn-content flex align-center">
                        <CoverIcon />
                        <span>Cover</span>
                    </div>
                    <ElementOverlay />
                </button>


            </div>

            <h4>ACTIONS</h4>
            <button className="secondary-btn actions-btn" onClick={(ev) => this.onOpenPopover(ev, 'MOVE')}>
                <div className="actions-btn-content flex align-center">
                    <i className="fas fa-arrow-right icon-sm"></i>
                    <span>Move</span>
                </div>
                <ElementOverlay />
            </button>


            <button className="secondary-btn actions-btn" onClick={(ev) => this.onOpenPopover(ev, 'COPY')}>
                <div className="actions-btn-content flex align-center">
                    <CopyIcon />
                    <span>Copy</span>
                </div>
                <ElementOverlay />
            </button>


            <button className="secondary-btn actions-btn" onClick={this.toggelWatch}>
                <div className="actions-btn-content flex align-center">
                    <WatchIcon />
                    <span>Watch</span>
                </div>
                <ElementOverlay />
            </button>

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
function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        currPopoverName: state.appModule.currPopover.name,
        loggedInUser: state.appModule.loggedInUser
    }
}

const mapDispatchToProps = {
    openPopover,
    closePopover,
}

export const CardDetailsActions = connect(mapStateToProps, mapDispatchToProps)(_CardDetailsActions)
