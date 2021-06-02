import { Component } from 'react'
import { connect } from 'react-redux'
import { ReactComponent as ArrowDown } from '../assets/img/icons/arrow-down.svg'
import { ReactComponent as BoardsIcon } from '../assets/img/icons/boards-icon.svg'
import { openPopover } from '../store/actions/app.actions.js'
import AutosizeInput from 'react-input-autosize';
import { ProfileAvatar } from './ProfileAvatar'
import AvatarGroup from '@material-ui/lab/AvatarGroup';


class _BoardHeader extends Component {

    state = {
        title: '',
        isEdit: false,
        inputWidth: 0,

    }
 
    componentDidMount() {
        this.setState({ title: this.props.board.title })
    }
    handleChange = ({ target }) => {
        const { value } = target
        let { inputWidth } = this.state
        console.dir(this.titleInput)
        this.setState({ title: target.value, inputWidth })
    }
    toggleEdit = () => {
        console.log('is edit toggle')
        const { isEdit } = this.state
        if (!isEdit) this.state.inputWidth = this.h1Title.getBoundingClientRect().width

        this.setState({ isEdit: !isEdit, inputWidth: this.state.inputWidth }, () => {

            if (this.state.isEdit) this.titleInput.select()
        })
    }
    onTitleSave = (ev) => {
        ev.preventDefault()
        const {title}=this.state
        if(!title) return // error msg to user: must enter title 
        const { board, onSaveBoard } = this.props
        board.title = title
        onSaveBoard(board)
        this.toggleEdit()
    }
    onToggleFav = () => {
        const { board, onSaveBoard } = this.props
        board.isFavorite = !board.isFavorite
        onSaveBoard(board)
    }
    onOpenPopover = (ev, popoverName, member) => {
        const elPos = ev.target.getBoundingClientRect()
        const props = { member }
        this.props.openPopover(popoverName, elPos, props)
    }


    render() {
        const { board } = this.props
        const { isEdit, title, inputWidth } = this.state
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
                        {board.members.map(member => <ProfileAvatar member={member} onOpenPopover={this.onOpenPopover} size={28} />)}
                    </AvatarGroup>
                <button onClick={(ev) => this.onOpenPopover(ev, 'INVITE')}>Invite</button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    openPopover,
}

export const BoardHeader = connect(null, mapDispatchToProps)(_BoardHeader)