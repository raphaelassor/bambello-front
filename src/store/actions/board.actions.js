
import { boardService } from '../../services/board.service'
import { socketService } from '../../services/socket.service'

export function loadBoards(filterBy = { ctg: '' }) {
    return async dispatch => {
        try {
            const boards = await boardService.query(filterBy)
            dispatch({ type: 'SET_WORKSPACE', boards })
        } catch (err) {
            console.log('BoardActions: err in loadBoards', err)
        }
    }
}

export function loadBoard(boardId) {
    return async dispatch => {
        try {
            const board = await boardService.getById(boardId)
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('BoardActions: err in loadBoard', err)
        }
    }
}

export function onSaveBoard(board) {
    return async dispatch => {
        try {
            const savedBoard = await boardService.save(board)
            console.log(savedBoard)
            socketService.emit('board newUpdate', savedBoard)
            dispatch({ type: 'SAVE_BOARD', board: savedBoard })
        } catch (err) {
            console.log('BoardActions: err in onSaveBoard', err)
        }
    }
}
export function unsetBoard(){
    return  dispatch=>{
        dispatch({type:'SET_BOARD', board:null })
    }
}

export function togglePreviewLabels() {
    return dispatch => {
        dispatch({ type: 'TOGGLE_LABELS' })
    }
}

export function setFilter(filterBy){
    console.log('in set Filter', filterBy)
    return dispatch=>{
        dispatch({ type: 'SET_FILTER',filterBy })
    }
}








