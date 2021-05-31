import { boardService } from '../../services/board.service.js'

export function loadBoard() {
    return async dispatch => {
        try {
            const board = await boardService.query()
            dispatch({ type: 'SET_BOARD', board })
        } catch (err) {
            console.log('BoardActions: err in loadBoard', err)
        }
    }
}

export function onSaveBoard(board) {
    return async dispatch => {
        try {
            console.log('in Save board')
            const savedBoard = await boardService.save(board)
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








