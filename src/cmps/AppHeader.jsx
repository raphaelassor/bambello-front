import { Component } from "react";
import { Link, withRouter } from 'react-router-dom'
import { ReactComponent as HomeIcon } from '../assets/img/icons/home.svg'
import { ReactComponent as BoardIcon } from '../assets/img/icons/board.svg'
import { ReactComponent as AppsIcon } from '../assets/img/icons/apps.svg'
import { ReactComponent as SearchIcon } from '../assets/img/icons/search.svg'
import { ReactComponent as AddIcon } from '../assets/img/icons/add.svg'
import { ReactComponent as InfoIcon } from '../assets/img/icons/info.svg'
import { ReactComponent as BellIcon } from '../assets/img/icons/notific-bell.svg'
import { ProfileAvatar } from './ProfileAvatar'
import Avatar from '@material-ui/core/Avatar';
import { socketService } from "../services/socket.service";
class _AppHeader extends Component {

    state = {
        filterTxt: '',
        currOpenModal: '',
        isPrevInput: true,
        isNewNotific: false,
        isFullStyle: false
    }

  componentDidMount(){
      console.log('mounted')
     
  }

    toggleInput = () => {
        this.setState({ isPrevInput: !this.state.isPrevInput, currOpenModal: !this.state.isPrevInput ? '' : 'search' })
    }

    toggleCurModal = (modalName = '') => {
        if (this.state.currOpenModal === modalName) this.setState({ currOpenModal: '' })
        else this.setState({ currOpenModal: modalName })
    }


    render() {
        const { isPrevInput, currOpenModal, isFullStyle } = this.state
        const { board, loggedInUser } = this.props
        return <div>
            <div className={`main-header flex justify-space-between ${board ? 'in-board' : ''} `}>
                <div className="btn-header-container flex">
                    <button className="btn-header">
                        <AppsIcon />
                    </button>
                    <Link to ="/workspace" className="btn-header">
                        <HomeIcon />
                    </Link>
                    <button className="btn-header flex" onClick={() => this.toggleCurModal('board-search')}>
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
                        <button className="btn-header" onClick={() => this.toggleCurModal('create')}>
                            <AddIcon />
                        </button>
                    </div>
                    <button className="btn-header" onClick={() => this.toggleCurModal('info')}>
                        <InfoIcon />
                    </button>
                    <div>
                        <button className="btn-header" onClick={() => this.toggleCurModal('notifics')}>
                            <BellIcon />
                        </button>
                    </div>
                    {/* <ProfileAvatar member={loggedInUser} onOpenPopover={() => this.toggleCurModal('user')} size={32} /> */}
                    {currOpenModal === 'user' &&
                        <div className="header-modal notific-modal">
                            {/* <NotificsList activities={this.props.activities} /> */}
                    USER NAV  PLACEHOLDER
                </div>}
                </div>
            </div>
        </div>
    }

}


export const AppHeader = withRouter(_AppHeader)



