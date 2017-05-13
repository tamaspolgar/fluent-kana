// context
import PropTypes from 'prop-types'
export const storeContext = {
  store: PropTypes.object
}

// connect
import {connect} from 'react-redux'
export const connectWithTaskState = (view) => connect((state) => ({ task: state.task }))(view)