import { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
// import ScrollContainer from 'react-indiana-drag-scroll'
import { loadBoard, onSaveBoard } from '../store/actions/board.actions'
import { CardEdit } from '../cmps/CardEdit'
import { CardDetails } from './CardDetails'
import { CardList } from '../cmps/CardList'
import { CardListAdd } from '../cmps/CardListAdd'
import { BoardHeader } from '../cmps/BoardHeader'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
<<<<<<< HEAD
import { eventBusService } from '../services/event-bus.service'
=======
import { boardService } from '../services/board.service'
import { socketService } from '../services/socket.service'
>>>>>>> d3798e946207e1b3fb75ddeb0685f08386395a6d


class _BoardApp extends Component {

<<<<<<< HEAD
    state = {
        isCardEditOpen: false,
        currCard: null,
        elPos: null
    }

    componentDidMount() {
        this.props.loadBoard();
        this.removeEvent = eventBusService.on('card-edit', ({ elPos, card }) => this.setState({ isCardEditOpen: true, currCard: card, elPos }));
    }
    componentWillUnmount() {
        this.removeEvent();
    }

    onCloseCardEdit = () => {
        this.setState({ isCardEditOpen: false })
=======
    async componentDidMount() {
        socketService.setup()
        try {
            await this.props.loadBoard()
            const { board } = this.props
            socketService.emit('join board', board._id)
            socketService.on('board updated', savedBoard => {
                this.props.loadBoard(savedBoard._id)
            })
        } catch (err) {
            console.log(err)
        }
    }

    componentWillUnmount() {
        socketService.off('board updated')
>>>>>>> d3798e946207e1b3fb75ddeb0685f08386395a6d
    }


    onDragEnd = (result) => {
        let { board, board: { lists }, onSaveBoard, loggedInUser } = this.props
        const { destination, source, draggableId, type } = result
        if (!destination) return
        const droppableIdStart = source.droppableId
        const droppableIdEnd = destination.droppableId
        const droppableIdxStart = source.index
        const droppableIdxEnd = destination.index

        // dragging lists around
        if (type === 'list') {
            const list = lists.splice(droppableIdxStart, 1)
            lists.splice(droppableIdxEnd, 0, ...list)
            board.lists = lists
            onSaveBoard(board)
            return
        }

        // in the same list
        if (droppableIdStart === droppableIdEnd) {
            const list = lists.find(list => list.id === droppableIdStart)
            const card = list.cards.splice(droppableIdxStart, 1)
            list.cards.splice(droppableIdxEnd, 0, ...card)
            const listIdx = lists.indexOf(list)
            lists[listIdx] = list
        }

        // other list 
        if (droppableIdStart !== droppableIdEnd) {
            const listStart = lists.find(list => list.id === droppableIdStart)
            const card = listStart.cards.splice(droppableIdxStart, 1)
            const listEnd = lists.find(list => list.id === droppableIdEnd)
            listEnd.cards.splice(droppableIdxEnd, 0, ...card)
            const listStartIdx = lists.indexOf(listStart)
            const listEndIdx = lists.indexOf(listEnd)
            lists[listStartIdx] = listStart
            lists[listEndIdx] = listEnd
            const txt = `${listStart.title} to ${listEnd.title}`
            const savedActivity = boardService.createActivity('moved', txt, loggedInUser, ...card)
            board.activities.push(savedActivity)
        }

        board.lists = lists
        onSaveBoard(board)
    }

    render() {
        const { board, onSaveBoard } = this.props
        const { currCard, elPos, isCardEditOpen } = this.state
        if (!board) return <div></div>
<<<<<<< HEAD
        
        return (
            <>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <section className="board-app flex column">
                        <BoardHeader board={board} onSaveBoard={onSaveBoard} />
                        <Route path='/board/:boardId/:listId/:cardId' component={CardDetails} />
                        <Droppable droppableId="all-lists" direction="horizontal" type="list">
                            {provided => (
                                // <ScrollContainer hideScrollbars={false} className="card-list-container scroll-container" ignoreElements={`.card-list`} {...provided.droppableProps} ref={provided.innerRef}>
                                <div {...provided.droppableProps} ref={provided.innerRef} className="card-list-container flex">
                                    {board.lists.map((currList, idx) => <CardList key={currList.id} currListIdx={idx} currList={currList} onSaveBoard={onSaveBoard} board={board} />)}
                                    {provided.placeholder}
                                    <CardListAdd board={board} onSaveBoard={onSaveBoard} />
                                </div>
                                // </ScrollContainer> 
                            )}
                        </Droppable>
                    </section>
                </DragDropContext>
                {isCardEditOpen && <CardEdit board={board} card={currCard} elPos={elPos} onCloseCardEdit={this.onCloseCardEdit} />}
            </>
=======
        console.log(board)
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <section className="board-app flex column">
                    <BoardHeader board={board} onSaveBoard={onSaveBoard} />
                    <Route path='/board/:boardId/:listId/:cardId' component={CardDetails} />
                    <Droppable droppableId="all-lists" direction="horizontal" type="list">
                        {provided => (
                            // <ScrollContainer hideScrollbars={false} className="card-list-container scroll-container" ignoreElements={`.card-list`} {...provided.droppableProps} ref={provided.innerRef}>
                            <div {...provided.droppableProps} ref={provided.innerRef} className="card-list-container flex">
                                {board.lists.map((currList, idx) => <CardList key={currList.id} currListIdx={idx} currList={currList} onSaveBoard={onSaveBoard} board={board} />)}
                                {provided.placeholder}
                                <CardListAdd board={board} onSaveBoard={onSaveBoard} />
                            </div>
                            // </ScrollContainer> 
                        )}
                    </Droppable>
                </section>
            </DragDropContext>
>>>>>>> d3798e946207e1b3fb75ddeb0685f08386395a6d
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        loggedInUser: state.appModule.loggedInUser
    }
}

const mapDispatchToProps = {
    loadBoard,
    onSaveBoard
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)