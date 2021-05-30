const initialState = {
    board: null,
    
}

export function boardReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOARD':
            return { ...state, board: action.board }
        case 'SAVE_BOARD':
            return { ...state, board: { ...action.board } }
        case 'REMOVE_CARD':
            return {}
        default:
            return state
    }
}
