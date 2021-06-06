import { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader';
import { routes } from './routes'
import { connect } from 'react-redux';
// import { connect } from 'react-redux'
import { DynamicPopover } from './cmps/Popover/DynamicPopover'
import { socketService } from './services/socket.service';
import { userService } from './services/user.service';
import { updateOnlineUsers } from './store/actions/app.actions'
import socket from 'socket.io-client/lib/socket';

class _App extends Component {

  async componentDidMount() {
    try {
      socketService.setup()

      const { onlineUsers, updateOnlineUsers, loggedInUser } = this.props

      // if (loggedInUser) {
      //   socketService.emit('user-watch', loggedInUser._id)
      // }

      const onlineUsersToSet = await userService.getOnlineUsers()
      updateOnlineUsers(onlineUsersToSet)

      socketService.on('user connected', userId => {
        const isLoggedIn = onlineUsers.some(currUserId => currUserId === userId)
        if (!isLoggedIn) {
          onlineUsers.push(userId)
          updateOnlineUsers(onlineUsers)
        }
      })
      socketService.on('user disconnected', userId => {
        const newOnlineUsers = onlineUsers.filter(currUserId => currUserId !== userId)
        updateOnlineUsers(newOnlineUsers);

        if (userId === loggedInUser?._id) {
          loggedInUser.isOnline = false;
          userService.updateUser(loggedInUser)
        }

      })
    } catch (err) {
      console.log(err)
    }
  }


  get style() {
    const { board, location } = this.props
    if (!location.pathname.includes('/board')) return {}
    const style = board ? {
      background: `${board.style.background} center center / cover`,
    } : { background: "#0079bf" }
    return style
  }

  get isHeaderAppears() {
    const { pathname } = this.props.location
    return (pathname.includes('/board') || pathname.includes('workspace'))
  }

  render() {
    const { loggedInUser, board, location } = this.props
    return (
      <section style={this.style}>
        {this.isHeaderAppears && <header>
          <AppHeader board={board} loggedInUser={loggedInUser} isBoardStyle={location.pathname.includes('/board')} />
        </header>}

        <main>
          <Switch>
            {routes.map(route => <Route key={route.path} component={route.component} path={route.path} />)}
          </Switch>
          <DynamicPopover />
        </main>
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
    currPopover: state.appModule.currPopover,
    loggedInUser: state.appModule.loggedInUser,
    onlineUsers: state.appModule.onlineUsers
  }
}

const mapDispatchToProps = {
  updateOnlineUsers
}

const _AppWithRouter = withRouter(_App)
export const App = connect(mapStateToProps, mapDispatchToProps)(_AppWithRouter)

// function mapStateToProps(state) {
//   return {
//     loggedInUser: state.appModule.loggedInUser
//   }
// }

// export const App = connect(mapStateToProps)(_App)


