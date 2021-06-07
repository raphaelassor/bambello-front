const initialState = {
    boards: [],
    board: null,
    isPreviewLabelsOpen: false,
    filterBy: {
        members: [],
        labels: [],
        txt: '',
    },
    isLoading: true
}

export function boardReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_WORKSPACE':
            return { ...state, boards: action.boards }
        case 'SET_BOARD':
            return { ...state, board: action.board, isLoading: false }
        case 'SAVE_BOARD':
            return { ...state, board: { ...action.board } }
        case 'SET_LOADING':
            return { ...state, isLoading: true }
        case 'TOGGLE_LABELS':
            return { ...state, isPreviewLabelsOpen: !state.isPreviewLabelsOpen }
        case 'SET_FILTER':
            return { ...state, filterBy: action.filterBy }
        default:
            return state
    }
}
