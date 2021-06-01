
import { httpService } from './http.service'

export const boardService = {
    query,
    remove,
    getById,
    save,
    updateCardInBoard,
    setPopoverPos
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
    return board
}

//move to app service

function setPopoverPos(pos, elRect, diff = 38) {
    let { left, top } = pos
    top += diff
    const { height, width } = elRect
    const viewportWidth = window.visualViewport.width
    const viewportHeight = window.visualViewport.height
    if (left + width > viewportWidth) left = viewportWidth - width - 10
    if (top + height > viewportHeight) top = viewportHeight - height - 10
    return { left, top }
}