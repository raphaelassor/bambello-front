import { Home } from './pages/Home.jsx'
import { BoardApp } from './pages/BoardApp.jsx'
// import { EditPopovers } from './cmps/CardDetailsActions.jsx'


export const routes = [
    {
        path: '/board/:boardId',
        component: BoardApp,
    },
    
    //     path: '/edits',
    //     component: EditPopovers,
    // },

    {
        path: '/',
        component: Home,
    }
]