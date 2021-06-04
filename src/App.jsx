import { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader';
import { routes } from './routes'
import { connect } from 'react-redux';
// import { connect } from 'react-redux'
import { DynamicPopover } from './cmps/Popover/DynamicPopover'
import { socketService } from './services/socket.service';

class _App extends Component {
 
  get style() {
    const { board, location } = this.props
    if (!location.pathname.includes('/board')) return {}
    const style = board ? {
      background: board.style.background
    } : { background: "#0079bf" }
    return style
  } 
// componentDidMount(){
//   const{loggedInUser}=this.props
//   if(loggedInUser)socketService.emit('user-watch',loggedInUser._id)
//   socketService.on('activity-add',activity=>{
//     console.log('activity is :' , activity)
// })
// }



  render() {
    const { loggedInUser, board } = this.props
    return (
      <div style={this.style}>
        {loggedInUser && <header>
          <AppHeader board={board} loggedInUser={loggedInUser} />
        </header>}

        <main>
          <Switch>
            {routes.map(route => <Route key={route.path} component={route.component} path={route.path} />)}
          </Switch>
          <DynamicPopover />
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
    currPopover: state.appModule.currPopover,
    loggedInUser: state.appModule.loggedInUser
  }
}
const _AppWithRouter = withRouter(_App)
export const App = connect(mapStateToProps, null)(_AppWithRouter)

// function mapStateToProps(state) {
//   return {
//     loggedInUser: state.appModule.loggedInUser
//   }
// }

// export const App = connect(mapStateToProps)(_App)


