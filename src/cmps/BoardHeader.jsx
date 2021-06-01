import { Component } from 'react'
import { connect } from 'react-redux'
import { ReactComponent as ArrowDown } from '../assets/img/icons/arrow-down.svg'
import { ReactComponent as BoardsIcon } from '../assets/img/icons/boards-icon.svg'
import { userService } from '../services/user.service'
import { onSetLoggedInUser } from '../store/actions/app.actions'

class _BoardHeader extends Component {

    state = {
        // debugging only
        users: []
    }

    componentDidMount() {
        this.loadUsers()
    }

    // debugging only
    async loadUsers() {
        try {
            const users = await userService.getUsers()
            this.setState({ users })
        } catch (err) {
            console.log(err)
        }
    }

    // debugging only 
    onChangeUser = async ({ target: { value } }) => {
        const { onSetLoggedInUser } = this.props
        try {
            const user = await userService.getById(value)
            onSetLoggedInUser(user)
        } catch (err) {
            console.log(err)
        }
    }


    render() {
        const { board, loggedInUser } = this.props
        const { users } = this.state
        if (!users.length) return ''
        console.log(users)
        return (
            <div className="board-header">
                <button className="board-btn">
                    <BoardsIcon />
                    <span>Board</span>
                    <ArrowDown />
                </button>
                <div className="board-title">
                    <h1>{board.title}</h1>
                </div>
                <select name="" id="" onChange={this.onChangeUser}>
                    {users.map(user => {
                        return <option key={user._id} value={user._id}>{user.fullname}</option>
                    })}
                </select>
                <h1>{loggedInUser.fullname}</h1>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        loggedInUser: state.appModule.loggedInUser
    }
}

const mapDispatchToProps = {
    onSetLoggedInUser
}

export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader)
