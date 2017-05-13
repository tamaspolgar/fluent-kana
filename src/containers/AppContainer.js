import React from 'react'
import {Provider} from 'react-redux'
import {browserHistory, Router} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

class AppContainer extends React.Component {

  render() {
    const {routes, store} = this.props
    const history = syncHistoryWithStore(browserHistory, store)

    return (
      <Provider store={store}>
        <div>
          <Router history={history} children={routes}/>
        </div>
      </Provider>
    )
  }

  shouldComponentUpdate() {
    return false
  }
}

export default AppContainer