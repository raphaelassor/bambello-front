import { utilsService } from './utils.service'
import { httpService } from './http.service'

export const boardService = {
    query,
    remove,
    getById,
    save,
    updateCardInBoard,
    createActivity
}

async function query(filterBy) {
    try {
        return await httpService.get('board', filterBy)
    } catch (err) {
        throw err
    }
}

async function remove(boardId) {
    try {
        await httpService.delete(`board/${boardId}`)
    } catch (err) {
        throw err
    }
}

async function getById(boardId) {
    try {
        return await httpService.get(`board/${boardId}`)
    } catch (err) {
        throw err
    }
}

async function save(board) {
    if (board._id) {
        try {
            return await httpService.put(`board/${board._id}`, board)
        } catch (err) {
            throw err
        }
    } else {
        try {
            return await httpService.post('board', board)
        } catch (err) {
            throw err
        }
    }
}

// sync functions 

export function updateCardInBoard(board, updatedCard) {
    board.lists.forEach(list => {
        list.cards.forEach((card, idx) => {
            if (card.id === updatedCard.id) list.cards[idx] = updatedCard
        })
    })
    return { ...board }
}

export function createActivity(actionType, txt, loggedInUser, card) {
    const { _id, fullname, imgUrl } = loggedInUser
    const { id, title } = card
    const byMember = {
        _id,
        fullname,
        imgUrl
    }
    card = {
        id,
        title
    }
    const savedActivity = {
        id: utilsService.makeId(),
        actionType,
        txt,
        createdAt: Date.now(),
        byMember,
        card
    }
    return savedActivity
}
