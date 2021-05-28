import { Home } from './pages/Home.jsx'
import { BoardApp } from './pages/BoardApp.jsx'
import { EditPopOvers } from './cmps/EditPopOvers.jsx'


export const routes = [
    {
        path: '/board/:boardId',
        component: BoardApp,
    },
    {
        path: '/edits',
        component: EditPopOvers,
    },

    {
        path: '/',
        component: Home,
    }
]