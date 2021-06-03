import { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader';
import { routes } from './routes'
import { connect } from 'react-redux';
// import { connect } from 'react-redux'
import { DynamicPopover } from './cmps/Popover/DynamicPopover'

 class _App extends Component {

  get style() {
    const { board, location } = this.props
    if (!location.pathname.includes('/board')) return {}
    const style = board ? {
      background: board.style.background
    } : {background: "#0079bf"}
    return style
  }


  render() {
    const { loggedInUser, board } = this.props
    console.log(loggedInUser)
    return (
      <div style={this.style}>
        <header>
          <AppHeader board={board} loggedInUser={loggedInUser} />
        </header>

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


