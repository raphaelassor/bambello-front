import { userService } from '../../services/user.service.js'

export function onLogin(credentials) {
    return async dispatch => {
        try {
            const user = await userService.login(credentials)
            dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.log('UserActions: err in login', err)
        }
    }
}

export function onSignup(userInfo) {
    return async dispatch => {
        try {
            const user = await userService.signup(userInfo)
            dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.log('UserActions: err in signup', err)
        }
    }
}

export function onLogout() {
    return async dispatch => {
        try {
            await userService.logout()
            dispatch({ type: 'SET_USER', user: null })
        } catch (err) {
            console.log('UserActions: err in logout', err)
        }
    }
}

export function openPopover(PopoverName,elPos,props) {
    
    return dispatch => {
        const action = {
            type: 'SET_Popover',
            PopoverName,
            elPos,
            props
        }
        dispatch(action)
    }
}

export function closePopover() {
    console.log('in close Popover')
    return dispatch => {
        const action = {
            type: 'CLOSE_Popover',
        }
        dispatch(action)
    }
}