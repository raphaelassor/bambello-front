import { connect } from 'react-redux'
import { ProfileAvatar } from '../ProfileAvatar'
import { Popover } from './Popover'
import { boardService } from '../../services/board.service'
import { onSaveBoard } from '../../store/actions/board.actions'
import { closePopover,onLogout } from '../../store/actions/app.actions'
// import { socketService } from '../../services/socket.service'

function _PopoverProfile({ board, card, member, onSaveBoard, closePopover, overlayType, isInCard = true ,showStatus=false,isLoggedInUser=false,logOutUser}) {

    const onRemoveMember = () => {
        const memberIdx = card.members.findIndex(currMember => currMember._id === member._id)
        card.members.splice(memberIdx, 1)
        const savedBoard = boardService.updateCardInBoard(board, card);
        onSaveBoard(savedBoard)
        closePopover()
    }

    return (
        <Popover className="clean" overlay={overlayType}>
            <div className="mini-profile-container">
                <div className="mini-profile">
                    <div className="mini-profile-avatar"><ProfileAvatar member={member} size={50} showStatus={showStatus}/></div>
                    <div className="mini-profile-info">
                        <a>{member.fullname}</a>
                        <p>@{member.username.toLowerCase()}</p>
                        <a className="mini-profile-info-edit">Edit profile info</a>
                        {/* TODO: show only if it's the user mini-profile */}
                        {/* <Link>Edit profile info</Link> */}
                    </div>
                </div>
            </div>
            {isInCard && <span className="remove clean-btn" onClick={() => onRemoveMember()}>Remove from card</span>}
            {isLoggedInUser&& <span className="remove clean-btn" onClick={logOutUser}>Logout</span>} 
        </Popover >
    )
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        loggedInUser:state.appModule.loggedInUser
    }
}

const mapDispatchToProps = {
    onSaveBoard,
    closePopover,
    onLogout
}

export const PopoverProfile = connect(mapStateToProps, mapDispatchToProps)(_PopoverProfile)