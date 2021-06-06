import { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ReactComponent as ArrowDown } from '../assets/img/icons/arrow-down.svg'
import { ReactComponent as BoardsIcon } from '../assets/img/icons/boards-icon.svg'
import { ReactComponent as ElipsisIcon } from '../assets/img/icons/elipsis.svg'
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import CloseIcon from '@material-ui/icons/Close';
import AutosizeInput from 'react-input-autosize';
import { ElementOverlay } from '../cmps/Popover/ElementOverlay';
import { ProfileAvatar } from './ProfileAvatar';
import { boardService } from '../services/board.service'
import { onSetLoggedInUser } from '../store/actions/app.actions'
import { openPopover } from '../store/actions/app.actions.js'
import { setFilter } from '../store/actions/board.actions.js'
import BarChartIcon from '@material-ui/icons/BarChart';


class _BoardHeader extends Component {

    state = {
        title: '',
        isEdit: false,
    }

    componentDidMount() {
        this.setState({ title: this.props.board.title })
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
        const savedActivity = boardService.createActivity('renamed', board.title, loggedInUser)
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
        const props = { member , isInCard:false }
        this.props.openPopover(PopoverName, elPos, props)
    }
    get isFilterOn() {

        const { labels, txt, members } = this.props.filterBy
        return labels.length || members.length || txt
    }

    get searchResultsCount() {
        const { board, filterBy } = this.props
        return board.lists.reduce((acc, list) => {
            const filteredList = boardService.getFilteredList(list, filterBy)
            acc += filteredList.cards.length
            return acc
        }, 0)


    }

    resetFilter = (ev) => {
        ev.stopPropagation()
        this.props.setFilter({ txt: '', labels: [], members: [] })
    }

    render() {
        const { board, loggedInUser } = this.props
        const { isEdit, title } = this.state
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
<div className="flex full ">
    
                <div className="board-header-members flex align-center">
                    <AvatarGroup>
                    {board.members.map(member => <ProfileAvatar key={member._id} member={member} onOpenPopover={this.onOpenPopover} size={28} />)}
                    </AvatarGroup>

                    <button onClick={(ev) => this.onOpenPopover(ev, 'INVITE')}>Invite</button>
                </div>
                <Link to={`/board/${board._id}/dashboard`} className="clean-link">
                <BarChartIcon/>
                    Dashboard
                    </Link>
                {this.isFilterOn && <Link className="board-filter-results flex align-center" to="#" onClick={(ev) => this.onOpenPopover(ev, 'BOARD_FILTER')}>
                    <span>{this.searchResultsCount} search results</span>
                    <span className="flex align-center" onClick={this.resetFilter}>
                        <CloseIcon />
                    </span>
                </Link>}
                <button className="board-btn" onClick={(ev) => this.onOpenPopover(ev, 'MENU')}>
                    <ElipsisIcon />
                    <span>Show Menu</span>
                    <ElementOverlay />
                </button>
</div>
            </div>
        )

    }
}




function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        loggedInUser: state.appModule.loggedInUser,
        filterBy: state.boardModule.filterBy
    }
}

const mapDispatchToProps = {
    onSetLoggedInUser,
    openPopover,
    setFilter
}

export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader)
