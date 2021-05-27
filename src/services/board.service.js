
// import { httpService } from './http.service'
import { storageService } from './async-storage.service'


export const boardService = {
    query,
    remove,
    getById,
    save,
}

async function query() {
    try {
        // return await httpService.get('board', filterBy)
        return await storageService.query('board')
    } catch (err) {
        throw err
    }
}

async function remove(boardId) {
    try {
        // await httpService.delete(`board/${boardId}`)
        await storageService.delete(`board/${boardId}`)
    } catch (err) {
        throw err
    }
}

async function getById(boardId) {
    try {
        // return await httpService.get(`board/${boardId}`)
        return await storageService.get(`board/${boardId}`)
    } catch (err) {
        throw err
    }
}

async function save(board) {
    if (board._id) {
        try {
            // return await httpService.put(`board/${board._id}`, board)
            return await storageService.put('board', board)
        } catch (err) {
            throw err
        }
    } else {
        try {
            // return await httpService.post('board', board)
            return await storageService.post('board', board)
        } catch (err) {
            throw err
        }
    }
}
