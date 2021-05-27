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


// export function onSaveBoard(boardId) {
//     return async dispatch => {
//         try {
//             const board = await boardService.getById(boardId)
//             dispatch({ type: 'SAVE_BOARD', board })
//         } catch (err) {
//             console.log('ToysActions: err in removeToy', err)
//         }
//     }
// }
// ​








