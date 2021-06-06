
import { httpService } from './http.service'

export const userService = {
    // googleLogin,
    login,
    logout,
    signup,
    updateUser,
    getLoggedinUser,
    getOnlineUsers,
    getUsers,
    getById,
}

async function login(credentials) {
    try {
        const user = await httpService.post('auth/login', credentials)
        if (user) return _saveLocalUser(user)
    } catch (err) {
        throw err
    }
}

// async function googleLogin(tokenId) {
//     try {
//         const user = await httpService.post('auth/googlelogin', { tokenId })
//         console.log(user)
//     } catch (err) {
//         throw err
//     }
// }

async function signup(userInfo) {
    try {
        const user = await httpService.post('auth/signup', userInfo)
        return _saveLocalUser(user)
    } catch (err) {
        throw err
    }
}

async function logout(user) {
    try {
        sessionStorage.clear()
        return await httpService.post('auth/logout', user)
    } catch (err) {
        throw err
    }
}

async function updateUser(user) {
    try {
        await httpService.put(`user/${user.id}`, user)
    } catch (err) {
        throw err
    }
}

function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    let user = JSON.parse(sessionStorage.getItem('loggedinUser' || null));
    // if (!user) {
    //     user = {
    //         _id: '60b606f35231459a81c67e5b3',
    //         username: 'GUEST',
    //         fullname: 'GUEST',
    //         imgUrl: ''
    //     }
    //     _saveLocalUser(user)
    // }
    return user
}

async function getOnlineUsers() {
    try {
        const users = await getUsers()
        console.log(users)
        const onlineUsers = users.reduce((acc,user) => {
            if (user.isOnline) {
                acc.push(user._id)
            }
            return acc
        }, [])
        return onlineUsers
    } catch (err) {
        console.log(err)
    }
}

async function getUsers() {
    try {
        return await httpService.get(`user`)
    } catch (err) {
        throw err
    }
}

async function getById(userId) {
    try {
        return httpService.get(`user/${userId}`)
    } catch (err) {
        throw err
    }
}

// function remove(userId) {
//     return storageService.remove('user', userId)
//     // return httpService.delete(`user/${userId}`)
// }

// async function update(user) {
//     return storageService.put('user', user)
//     // user = await httpService.put(`user/${user._id}`, user)
//     // Handle case in which admin updates other user's details
//     if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
// }

