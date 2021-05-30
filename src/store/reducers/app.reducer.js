// import { userService } from '../../services/user.service.js'


const initialState = {
    workspace: [],
    // loggedInUser: userService.getLoggedinUser(),
    loginErr: null,
    currPopOver: '',
    isOverlayOpen: false,
}

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_WORKSPACE':
            return {}
        case 'SET_USER':
            return { ...state, loggedInUser: action.user, loginErr: null }
        case 'LOGIN_ERR':
            return { ...state, loginErr: action.err }
        case 'SET_POPOVER':
            console.log('previous state is',state)
            return { ...state, currPopOver: action.popOverName, isOverlayOpen: true }
        case 'CLOSE_POPOVER':
            console.log(state,' previous state is')
            return { ...state, currPopOver: '', isOverlayOpen: false }
        default:
            return state
    }
}