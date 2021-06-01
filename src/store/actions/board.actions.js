import { boardService } from '../../services/board.service.js'

export function loadBoard(boardId = '60b62a5534613c87818a5c20') {
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
            console.log('im here saveboard',board)
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








