import { userService } from '../../services/user.service.js'


const initialState = {
    workspace: [],
    loggedInUser: userService.getLoggedinUser(),
    loginErr: null,
    currPopover: {
        elPos: null,
        PopoverName: '',
        props: null
    },
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
        case 'SET_Popover':
            return { ...state, currPopover: { name: action.PopoverName, elPos: action.elPos, props: action.props }, isOverlayOpen: true }
        case 'CLOSE_Popover':
            return { ...state, currPopover: { name: '', elPos: null, props: null }, isOverlayOpen: false }
        default:
            return state
    }
}