import { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader';
import { routes } from './routes'
import { connect } from 'react-redux';
// import { connect } from 'react-redux'
import { DynamicPopover } from './cmps/Popover/DynamicPopover'
import { socketService } from './services/socket.service';

class _App extends Component {

  componentDidMount() {
    socketService.setup()
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
    const { loggedInUser, board ,location} = this.props
    return (
      <section className="app" style={this.style}>
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


