import { Component } from "react";
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { socketService } from "../services/socket.service";
import { openPopover, onLogout, closePopover } from '../store/actions/app.actions'
import { ReactComponent as HomeIcon } from '../assets/img/icons/home.svg'
import { ReactComponent as BoardIcon } from '../assets/img/icons/board.svg'
import { ReactComponent as AppsIcon } from '../assets/img/icons/apps.svg'
import { ReactComponent as SearchIcon } from '../assets/img/icons/search.svg'
import { ReactComponent as AddIcon } from '../assets/img/icons/add.svg'
import { ReactComponent as InfoIcon } from '../assets/img/icons/info.svg'
import { ReactComponent as BellIcon } from '../assets/img/icons/notific-bell.svg'
import { ProfileAvatar } from './ProfileAvatar'
import { ElementOverlay } from "./Popover/ElementOverlay";

class _AppHeader extends Component {

    state = {
        filterTxt: '',
        currOpenModal: '',
        isPrevInput: true,
        isNewNotific: false,
        // isFullLayout: true
    }

    componentDidMount() {
        socketService.on('app addActivity', activity => {
            //send push when available
            this.setState({ isNewNotific: true })
        })
    }

    toggleInput = () => {
        this.setState({ isPrevInput: !this.state.isPrevInput, currOpenModal: !this.state.isPrevInput ? '' : 'search' })
    }

    toggleCurModal = (modalName = '') => {
        if (this.state.currOpenModal === modalName) this.setState({ currOpenModal: '' })
        else this.setState({ currOpenModal: modalName })
    }
    onOpenNotifics = (ev) => {
        this.setState({ isNewNotific: false }, () => {
            this.onOpenPopover(ev, 'NOTIFICATIONS')
        })
    }
    onOpenPopover = (ev, popoverName) => {
        const { openPopover, onLogout, history, loggedInUser, closePopover } = this.props
        let elPos = ev.target.getBoundingClientRect()
        const props = popoverName === 'PROFILE' ?
            {
                logOutUser: () => {
                    onLogout(loggedInUser)
                    closePopover()
                    history.push('/')
                },
                member: loggedInUser,
                isInCard: false,
                isLoggedInUser: true
            }
            : null
        // if (popoverName === 'BOARDS_SEARCH') elPos = { top: 6, left: 0 }
        openPopover(popoverName, elPos, props)
    }

    onLogout = () => {
        const { onLogout, loggedInUser } = this.props
        onLogout(loggedInUser)
        // this.props.history.push('/')
    }


    render() {
        const { isPrevInput, isNewNotific } = this.state
        const { isBoardStyle, openPopover, loggedInUser } = this.props
        return <div>
            <div className={`main-header flex justify-space-between ${isBoardStyle ? 'in-board' : 'out-board'} `}>
                <div className="btn-header-container flex">
                    <button className="btn-header wide-layout ">
                        <AppsIcon />
                    </button>
                    <Link to="/workspace" className="btn-header">
                        <HomeIcon />
                    </Link>
                    <button className="boards-btn btn-header wide-layout flex" onClick={(ev) => this.onOpenPopover(ev, 'BOARDS_SEARCH')}>
                        <BoardIcon />
                        <span>
                            Boards
                        </span>
                        <ElementOverlay />
                    </button>
                    <div className={`input-header-wrapper flex ${!isPrevInput && 'extended-input'}`} >
                        <input type="text" className="input-header" placeholder="Jump to..." onFocus={this.toggleInput} onBlur={this.toggleInput} />
                        <SearchIcon />
                    </div>
                </div>
                <div className="logo flex align-center">
                    <Link to="/">
                        <BoardIcon />
                        <span>Bambello</span>
                    </Link>
                </div>
                <div className="btn-header-container flex">
                    <div>
                        <button className="btn-header wide-layout" onClick={() => openPopover('CREATE_BOARD')}>
                            <AddIcon />
                        </button>
                    </div>
                    <button className="btn-header wide-layout">
                        <InfoIcon />
                    </button>
                    <div>
                        <button className={`btn-header ${isNewNotific ? 'new-notific' : ''}`} onClick={(ev) => this.onOpenNotifics(ev)}>
                            <BellIcon />
                        </button>
                    </div>
                    <ProfileAvatar member={loggedInUser} onOpenPopover={this.onOpenPopover} size={32} />
                </div>
            </div>
        </div>
    }

}
function mapStateToProps(state) {
    return {
        loggedInUser: state.appModule.loggedInUser
    }
}

const mapDispatchToProps = {
    openPopover,
    onLogout,
    closePopover
}


export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(withRouter(_AppHeader))



