import { Component } from 'react'
import { ReactComponent as ArrowDown } from '../assets/img/icons/arrow-down.svg'
import { ReactComponent as BoardsIcon } from '../assets/img/icons/boards-icon.svg'

export class BoardHeader extends Component {
    render() {
        const { board } = this.props
        return (
            <div className="board-header">
                <button className="board-btn">
                    <BoardsIcon />
                    <span>Board</span>
                    <ArrowDown />
                </button>
                <div className="board-title">
                    <h1>{board.title}</h1>
                </div>
            </div>
        )
    }
}
