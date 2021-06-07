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
      const onlineUsersToSet = await userService.getOnlineUsers()
      updateOnlineUsers(onlineUsersToSet)
      


      if (loggedInUser) {
        console.log('logged in user exisits , emited user-watch')
        socketService.emit('user-watch', loggedInUser._id)
      }
      socketService.on('user connected', userId => {
        const {onlineUsers}=this.props
        const isLoggedIn = this.props.onlineUsers.some(currUserId => currUserId === userId)
        console.log('user connected: ' , userId)
        if (!isLoggedIn) {
          onlineUsers.push(userId)
          updateOnlineUsers(onlineUsers)
          console.log('online users pushed :' , onlineUsers)
        }
      })

      socketService.on('user disconnected', userId => {
        // if (userId === loggedInUser?._id) {
        //   loggedInUser.isOnline = false;
        //   await userService.updateUser(loggedInUser)
        // }

        const {onlineUsers}=this.props
        const onlineUsersToSet = onlineUsers.filter(currUserId => currUserId !== userId)
        console.log('user disconnected , online Users are ',onlineUsers)
        console.log('userDisconnected: online users to set are : ',onlineUsersToSet)
        updateOnlineUsers(onlineUsersToSet)
      })
    } catch (err) {
      console.log(err)
    }
  }
  async componentWillUnmount(){
    const {loggedInUser}=this.props
    if(loggedInUser) {
      loggedInUser.isOnline = false;
     await userService.updateUser(loggedInUser)
      socketService.emit('user endSession',loggedInUser._id)
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


