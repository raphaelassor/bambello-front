import { connect } from 'react-redux'
import { ProfileAvatar } from '../ProfileAvatar'
import { Popover } from './Popover'
import { boardService } from '../../services/board.service'
import { onSaveBoard } from '../../store/actions/board.actions'
import { closePopover } from '../../store/actions/app.actions'

function _PopoverProfile({ board, card, member, onSaveBoard, closePopover }) {

    const onRemoveMember = () => {
        const memberIdx = card.members.findIndex(currMember => currMember._id === member._id)
        card.members.splice(memberIdx, 1)
        const savedBoard = boardService.updateCardInBoard(board, card);
        onSaveBoard(savedBoard)
        closePopover()
    }

    return (
        <Popover className={'clean'} overlay={'none'}>
            <div className="mini-profile-container">
                <div className="mini-profile">
                    <div className="mini-profile-avatar"><ProfileAvatar member={member} size={50} /></div>
                    <div className="mini-profile-info">
                        <a>{member.fullname}</a>
                        <p>@{member.username.toLowerCase()}</p>
                        <a className="mini-profile-info-edit">Edit profile info</a>
                        {/* TODO: show only if it's the user mini-profile */}
                        {/* <Link>Edit profile info</Link> */}
                    </div>
                </div>
                <span className="remove clean-btn" onClick={() => onRemoveMember()}>Remove from card</span>
            </div>
        </Popover >
    )
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board
    }
}

const mapDispatchToProps = {
    onSaveBoard,
    closePopover
}

export const PopoverProfile = connect(mapStateToProps, mapDispatchToProps)(_PopoverProfile)