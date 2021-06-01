import { onSaveBoard } from "../../store/actions/board.actions"
import { Popover } from "./Popover"
import {Component} from 'react'
import {connect} from 'react-redux'
import {PopoverMemberPreview} from './PopoverMemberPreview'
class _PopoverInvite extends Component {

    state = {
        memberTxt: '',
        members: [],

    }

    componentDidMount(){
        const{board}= this.props
        this.setState({members:board.members})
    }
    handleChange = ({ target }) => {
       // const members=this.userService.getUsers(target.value)
        // this.setState({ memberTxt: target.value,members: })
    }
    addMember = (member) => {
        const { board } = this.props
        const idx = board.members.findIndex(boardMember => boardMember._id === member._id)
        if (idx !== -1) return
         board.members.push(member)
        onSaveBoard(board)
    }

    isMemberInBoard=(member)=>{
        return this.props.board.members.some(boardMember=>boardMember._id===member._id)
    }

    render() {
        const { members } = this.state
        return <Popover title="Invite to board">
            <div className="invite-details flex column">
                <input type="text" autoFocus className="pop-over-input" />
                <div className="members">
                {members.map(member => <PopoverMemberPreview key={member._id} member={member}
                    toggleMember={this.addMember} isJoined={this.isMemberInBoard(member)} />)}
                    </div>

                <button className="primary-btn">Send invitation</button>
            </div>

        </Popover>
    }




}
function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
    }
}

const mapDispatchToProps = {
    onSaveBoard
}


export const PopoverInvite = connect(mapStateToProps, mapDispatchToProps)(_PopoverInvite)