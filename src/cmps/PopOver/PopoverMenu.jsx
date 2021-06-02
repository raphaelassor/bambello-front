import { Component } from "react"
import { Popover } from "./Popover"
import {connect} from 'react-redux'
import {onSaveBoard} from '../../store/actions/board.actions'
import {openPopover} from '../../store/actions/app.actions'
import {ReactComponent as SearchIcon} from '../../assets/img/icons/search.svg'
import {ReactComponent as BoardIcon} from '../../assets/img/icons/board.svg'
import ActivityIcon from '@material-ui/icons/FormatListBulletedOutlined';
import { Link } from "react-router-dom";

 class _PopoverMenu extends Component {

    state = {

    }

    onOpenPopover = (ev, PopoverName) => {
        console.log('on open Popover', PopoverName)
        const elPos = ev.target.getBoundingClientRect()
        const props = {}
        this.props.openPopover(PopoverName, elPos, props)
    } 
    render() {

        return <div className="board-menu-wrapper">
            <Popover className="menu" title="Menu">
                <div className="menu-details ">
                    <section>
                        <ul className="clean-list">
                            <li onClick={(ev) => this.onOpenPopover(ev, 'BACKGROUND')}> 
                            <BoardIcon/>
                            Change background </li>
                            <li onClick={(ev) => this.onOpenPopover(ev, 'SEARCH')}>
                                <SearchIcon/>
                                Search cards</li>
                            <li onClick={(ev) => this.onOpenPopover(ev, 'ARCHIVE')}>
                            <i className="fas fa-archive menu-icon"></i>
                                Archive</li>
                        </ul>
                        <Link  to ="#" className="activity clean-link" onClick={(ev) => this.onOpenPopover(ev, 'ACTIVITY')} >
                        <ActivityIcon/>
                            Activity</Link>
                        {/* Activity list */}
                    </section>
                </div>
            </Popover>
        </div>
    }

}


const mapDispatchToProps = {
    onSaveBoard,
    openPopover
}


export const PopoverMenu = connect(null, mapDispatchToProps)(_PopoverMenu)