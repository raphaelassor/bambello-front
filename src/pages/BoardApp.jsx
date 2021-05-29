import { Component } from "react";
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import ScrollContainer from 'react-indiana-drag-scroll'
import { loadBoard, onSaveBoard } from '../store/actions/board.actions'
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
                <ScrollContainer hideScrollbars={false} className="card-list-container scroll-container" ignoreElements={`.card-list`}>
                    {/* <div className="card-list-container"> */}
                        {board.lists.map(currList => <CardList key={currList.id} currList={currList} onSaveBoard={onSaveBoard} board={board} />)}
                    {/* </div> */}
                        <CardListAdd board={board} onSaveBoard={onSaveBoard} />
                </ScrollContainer>
            </section>
        )
    }
}
// import React, { Component } from 'react'

// import ScrollContainer from 'react-indiana-drag-scroll'

// class Example extends Component {
//   render () {
//     return (
//       <ScrollContainer className="scroll-container">
//         { ... }
//       </ScrollContainer>
//     )
//   }
// }

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