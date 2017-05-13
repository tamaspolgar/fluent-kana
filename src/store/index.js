import {applyMiddleware, combineReducers, createStore} from 'redux'
import {browserHistory} from 'react-router'
import {routerMiddleware, routerReducer} from 'react-router-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import taskReducer from '../reducers/task'
import persistentMiddleware from './persistentMiddleware'

export default createStore(
  combineReducers({
    task: taskReducer,
    routing: routerReducer,
  }),
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(browserHistory),
      persistentMiddleware
    )
  ),
)