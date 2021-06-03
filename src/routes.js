import { Home } from './pages/Home'
import { BoardApp } from './pages/BoardApp'
import { Workspace } from './pages/Workspace'

// import { EditPopovers } from './cmps/CardDetailsActions.jsx'


export const routes = [
    {
        path: '/board/:boardId',
        component: BoardApp,
    },
    {
        path: '/workspace',
        component: Workspace,
    },
    {
        path: '/',
        component: Home,
    }
]