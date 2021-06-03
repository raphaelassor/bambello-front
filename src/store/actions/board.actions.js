
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

export function loadBoard(boardId = '60b8cb165b1c1452b4a8394a') {
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
            socketService.emit('board newUpdate', savedBoard)
            dispatch({ type: 'SAVE_BOARD', board: savedBoard })
        } catch (err) {
            console.log('BoardActions: err in onSaveBoard', err)
        }
    }
}

export function togglePreviewLabels() {
    return dispatch => {
        dispatch({ type: 'TOGGLE_LABELS' })
    }
}

export function setFilter(filterBy){
    return dispatch=>{
        dispatch({ type: 'SET_FILTER',filterBy })
    }
}








