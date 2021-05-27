import { Component } from 'react'
import { ReactComponent as ArrowDown } from '../assets/img/icons/arrow-down.svg'
import { ReactComponent as BoardsIcon } from '../assets/img/icons/boards-icon.svg'

export class BoardHeader extends Component {
    render() {
        return (
            <div className="board-header">
                <button className="btn">
                    <BoardsIcon />
                    <span>Board</span>
                    <ArrowDown />
                </button>
            </div>
        )
    }
}
