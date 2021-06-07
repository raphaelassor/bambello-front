import { Component } from "react";
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { socketService } from "../services/socket.service";
import { openPopover, onLogout } from '../store/actions/app.actions'
import { ReactComponent as HomeIcon } from '../assets/img/icons/home.svg'
import { ReactComponent as BoardIcon } from '../assets/img/icons/board.svg'
import { ReactComponent as AppsIcon } from '../assets/img/icons/apps.svg'
import { ReactComponent as SearchIcon } from '../assets/img/icons/search.svg'
import { ReactComponent as AddIcon } from '../assets/img/icons/add.svg'
import { ReactComponent as InfoIcon } from '../assets/img/icons/info.svg'
import { ReactComponent as BellIcon } from '../assets/img/icons/notific-bell.svg'
import { ProfileAvatar } from './ProfileAvatar'

class _AppHeader extends Component {

    state = {
        filterTxt: '',
        currOpenModal: '',
        isPrevInput: true,
        isNewNotific: false,
        // isFullLayout: true
    }

    componentDidMount() {
        console.log('mounted')
        socketService.on('app addActivity', activity => {
            //send push when available
            console.log('activity in header', activity)
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
        const { openPopover } = this.props
        this.setState({ isNewNotific: false }, () => {
            const elPos = ev.target.getBoundingClientRect()
            openPopover('NOTIFICATIONS', elPos)
        })
    }

    onLogout = () => {
        const { onLogout, loggedInUser } = this.props
        onLogout(loggedInUser)
        // this.props.history.push('/')
    }


    render() {
        const { isPrevInput, currOpenModal, isNewNotific, isFullLayout } = this.state
        const { board, isBoardStyle, openPopover } = this.props
        return <div>
            <div className={`main-header flex justify-space-between ${isBoardStyle ? 'in-board' : 'out-board'} `}>
                <div className="btn-header-container flex">
                    <button className="btn-header wide-layout ">
                        <AppsIcon />
                    </button>
                    <Link to="/workspace" className="btn-header">
                        <HomeIcon />
                    </Link>
                    <button className="btn-header wide-layout flex" onClick={() => this.toggleCurModal('board-search')}>
                        <BoardIcon />
                        <span>
                            Boards
                        </span>
                    </button>
                    <div className={`input-header-wrapper flex ${!isPrevInput && 'extended-input'}`} >
                        <input type="text" className="input-header" placeholder="Jump to..." onFocus={this.toggleInput} onBlur={this.toggleInput} />
                        <SearchIcon />
                    </div>
                </div>
                <div className="logo flex align-center">
                    <Link to="/workspace">
                        <BoardIcon />
                        <span>Bambello</span>
                    </Link>
                </div>
                <div className="btn-header-container flex">
                    <div>
                        <button className="btn-header" onClick={() => openPopover('CREATE_BOARD')}>
                            <AddIcon />
                        </button>
                    </div>
                    <button className="btn-header wide-layout" onClick={() => this.toggleCurModal('info')}>
                        <InfoIcon />
                    </button>
                    <div>
                        <button className={`btn-header ${isNewNotific ? 'new-notific' : ''}`} onClick={(ev) => this.onOpenNotifics(ev)}>
                            <BellIcon />
                        </button>
                    </div>
                    {/* <ProfileAvatar member={loggedInUser} onOpenPopover={() => this.toggleCurModal('user')} size={32} /> */}
                    {currOpenModal === 'user' &&
                        <div className="header-modal notific-modal">
                            {/* <NotificsList activities={this.props.activities} /> */}
                            USER NAV  PLACEHOLDER
                        </div>
                    }
                    {/* <div className="btn-header">
                        <button onClick={this.onLogout}>Logout</button>
                    </div> */}
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
    onLogout
}

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)



