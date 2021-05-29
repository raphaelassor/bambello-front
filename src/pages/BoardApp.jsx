import { Component } from "react";
import { connect } from 'react-redux'
import { loadBoard, onSaveBoard } from '../store/actions/board.actions'
import { Route } from 'react-router-dom'
import { CardDetails } from './CardDetails'
import { CardList } from '../cmps/CardList'
import { CardListAdd } from '../cmps/CardListAdd'
import { BoardHeader } from '../cmps/BoardHeader'

class _BoardApp extends Component {

    componentDidMount() {
        this.props.loadBoard();
    }

    render() {
        const { board, onSaveBoard } = this.props
        if (!board) return <div></div>
        return (
            <section className="board-app flex column">
                <BoardHeader />
                <Route path='/board/:boardId/:listId/:cardId' component={CardDetails} />
                <div className="card-list-container">
                    {board.lists.map(currList => <CardList key={currList.id} currList={currList} onSaveBoard={onSaveBoard} board={board} />)}
                    <CardListAdd board={board} onSaveBoard={onSaveBoard}/>
                </div>
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
    loadBoard,
    onSaveBoard
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)