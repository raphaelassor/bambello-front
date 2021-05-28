import { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader';
import { routes } from './routes'
// import { connect } from 'react-redux'

export class App extends Component {

  render() {
    return (
      <div>
        <header>
          <AppHeader />
        </header>

        <main>
          <Switch>
            {routes.map(route => <Route key={route.path} component={route.component} path={route.path} />)}
          </Switch>
        </main>
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return {
//     loggedInUser: state.appModule.loggedInUser
//   }
// }

// export const App = connect(mapStateToProps)(_App)


