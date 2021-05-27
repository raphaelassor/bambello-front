import { Component } from "react";
import { connect } from 'react-redux'
import { loadBoard } from '../store/actions/board.actions'
import { BoardList } from '../cmps/BoardList'
import { BoardListAdd } from '../cmps/BoardListAdd'

class _BoardApp extends Component {

    componentDidMount() {
        this.props.loadBoard();
        console.log(this.props.loadBoard)
    }

    render() {
        const { board } = this.props
        if (!board) return <div></div>
        console.log(board);
        return (
            <section className="board-app">

                <div className="board-list-container">
                    {board.lists.map(list => <BoardList key={list.id} list={list} />)}
                </div>
                {/* <BoardListAdd /> */}
                {/* <pre>{JSON.stringify(board, null, 2)}</pre> */}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board
    }
}

const mapDispatchToProps = {
    loadBoard
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)