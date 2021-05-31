const initialState = {
    board: null,
    isPreviewLabelsOpen: false

}

export function boardReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOARD':
            return { ...state, board: action.board }
        case 'SAVE_BOARD':
            return { ...state, board: { ...action.board } }
        case 'TOGGLE_LABELS':
            return { ...state, isPreviewLabelsOpen: !state.isPreviewLabelsOpen }
        case 'REMOVE_CARD':
            return {}
        default:
            return state
    }
}
