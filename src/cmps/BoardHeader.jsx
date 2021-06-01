import { Component } from 'react'
import {connect} from 'react-redux'
import { ReactComponent as ArrowDown } from '../assets/img/icons/arrow-down.svg'
import { ReactComponent as BoardsIcon } from '../assets/img/icons/boards-icon.svg'
import { openPopover} from '../store/actions/app.actions.js'
import AutosizeInput from 'react-input-autosize';
import {ProfileAvatar} from './ProfileAvatar'
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
        const { board, onSaveBoard } = this.props
        board.title = this.state.title
        onSaveBoard(board)
        this.toggleEdit()
    }
    onToggleFav=()=>{
        const {board,onSaveBoard}= this.props
        board.isFavorite=!board.isFavorite
        onSaveBoard(board)
    }
    openProfilePopover=(ev,member)=>{
        const elPos = ev.target.getBoundingClientRect()
        const props={member}
        this.props.openPopover('PROFILE', elPos, props)
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
                    {isEdit?
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
                <i className={`far fa-star icon-sm star-icon ${board.isFavorite? 'favorite':''}`}></i>
                </button>

                <div className="board-header-members flex">
                    {board.members.map(member=><ProfileAvatar member={member} onOpenPopover={this.openProfilePopover}  />)}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    openPopover,
}

export const BoardHeader = connect(null, mapDispatchToProps)(_BoardHeader)