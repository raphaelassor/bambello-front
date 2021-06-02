import { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader';
import { routes } from './routes'
import {connect} from 'react-redux';
// import { connect } from 'react-redux'
import { DynamicPopover } from './cmps/Popover/DynamicPopover'

export class _App extends Component { 

  get style(){
    const {board}=this.props
    const style=board? {
        background:'linear-gradient(311deg, rgba(86,189,202,1) 0%, rgba(50,124,148,1) 35%, rgba(44,113,139,1) 47%, rgba(36,98,126,1) 54%, rgba(29,85,115,1) 65%, rgba(2,34,73,1) 100%)'
    }: {}
    return style
}


  render() {
    return (
      <div style={this.style}>
        <header>
          <AppHeader />
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
  }
}
export const App = connect(mapStateToProps, null)(_App)

// function mapStateToProps(state) {
//   return {
//     loggedInUser: state.appModule.loggedInUser
//   }
// }

// export const App = connect(mapStateToProps)(_App)


