const initialState = {
    board: null,
    isPreviewLabelsOpen: false,
    filterBy:{
            members:[],
            labels:[],
            txt:'',
    }

}

export function boardReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOARD':
            return { ...state, board: action.board }
        case 'SAVE_BOARD':
            return { ...state, board: { ...action.board } }
        case 'TOGGLE_LABELS':
            return { ...state, isPreviewLabelsOpen: !state.isPreviewLabelsOpen }
        case 'SET_FILTER':
            return {...state, filterBy:action.filterBy}
        case 'REMOVE_CARD':
            return {}
        default:
            return state
    }
}
