import { Component } from 'react'
import { connect } from 'react-redux'
import { ReactComponent as ArrowDown } from '../assets/img/icons/arrow-down.svg'
import { ReactComponent as BoardsIcon } from '../assets/img/icons/boards-icon.svg'
import { userService } from '../services/user.service'
import { boardService } from '../services/board.service'
import { onSetLoggedInUser } from '../store/actions/app.actions'
import { ReactComponent as ElipsisIcon } from '../assets/img/icons/elipsis.svg'
import { openPopover } from '../store/actions/app.actions.js'
import AutosizeInput from 'react-input-autosize';
import { ProfileAvatar } from './ProfileAvatar';
import { ElementOverlay } from '../cmps/Popover/ElementOverlay';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import MenuIcon from '@material-ui/icons/MoreHoriz';

class _BoardHeader extends Component {

    state = {
        // debugging only
        users: [],
        //
        title: '',
        isEdit: false,
    }

    componentDidMount() {
        this.loadUsers()
        this.setState({ title: this.props.board.title })
    }

    // debugging only
    async loadUsers() {
        try {
            const users = await userService.getUsers()
            this.setState({ users })
        } catch (err) {
            console.log(err)
        }
    }

    // debugging only 
    onChangeUser = async ({ target: { value } }) => {
        const { onSetLoggedInUser } = this.props
        try {
            const user = await userService.getById(value)
            onSetLoggedInUser(user)
        } catch (err) {
            console.log(err)
        }
    }

    handleChange = ({ target }) => {
        const { value } = target
        let { inputWidth } = this.state
        this.setState({ title: target.value, inputWidth })
    }

    toggleEdit = () => {
        const { isEdit } = this.state
        if (!isEdit) this.state.inputWidth = this.h1Title.getBoundingClientRect().width

        this.setState({ isEdit: !isEdit, inputWidth: this.state.inputWidth }, () => {

            if (this.state.isEdit) this.titleInput.select()
        })
    }

    onTitleSave = (ev) => {
        ev.preventDefault()
        const { loggedInUser } = this.props
        const { title } = this.state
        if (!title) return // error msg to user: must enter title
        const { board, onSaveBoard } = this.props
        board.title = title
        const txt = `renamed this board to ${title}`
        const savedActivity = boardService.createActivity('renamed', txt, loggedInUser)
        board.activities.push(savedActivity)
        onSaveBoard(board)
        this.toggleEdit()
    }

    onToggleFav = () => {
        const { board, onSaveBoard } = this.props
        board.isFavorite = !board.isFavorite
        onSaveBoard(board)
    }
    onOpenPopover = (ev, PopoverName, member) => {
        const elPos = ev.target.getBoundingClientRect()
        const props = { member }
        this.props.openPopover(PopoverName, elPos, props)
    }


    render() {
        const { board, loggedInUser } = this.props
        const { users, isEdit, title } = this.state
        if (!users.length) return ''
        return (
            <div className="board-header">
                <button className="board-btn">
                    <BoardsIcon />
                    <span>Board</span>
                    <ArrowDown />
                </button>
                <div className="board-title" >
                    {isEdit ?
                        <form onSubmit={this.onTitleSave}>
                            {/* <input type="text" value={title}  ref={(input) => { this.titleInput = input }} /> */}
                            <AutosizeInput
                                name="form-field-name"
                                value={title}
                                onChange={this.handleChange}
                                ref={(input) => { this.titleInput = input }}
                                onBlur={this.onTitleSave}
                            />
                        </form>
                        :
                        <h1 onClick={this.toggleEdit} ref={(h1) => { this.h1Title = h1 }}>{board.title} </h1>
                    }
                </div>
                <button className="board-btn" onClick={this.onToggleFav}>
                    <i className={`far fa-star icon-sm star-icon ${board.isFavorite ? 'favorite' : ''}`}></i>
                </button>
                <span className="divider"></span>

                <div className="board-header-members flex">
                    <AvatarGroup max={4}>
                        {board.members.map(member => <ProfileAvatar key={member._id} member={member} onOpenPopover={this.onOpenPopover} size={28} />)}
                    </AvatarGroup>
                    <button onClick={(ev) => this.onOpenPopover(ev, 'INVITE')}>Invite</button>
                </div>
                <select name="" id="" onChange={this.onChangeUser}>
                    {users.map(user => {
                        return <option key={user._id} value={user._id}>{user.fullname}</option>
                    })}
                </select>
                <h1>{loggedInUser.fullname}</h1>
                <button className="board-btn" onClick={(ev) => this.onOpenPopover(ev, 'MENU')}>
                    <ElipsisIcon />
                    <span>Show Menu</span>
                    <ElementOverlay />
                </button>
            </div>
        )

    }
}




function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        loggedInUser: state.appModule.loggedInUser
    }
}

const mapDispatchToProps = {
    onSetLoggedInUser,
    openPopover
}

export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader)
