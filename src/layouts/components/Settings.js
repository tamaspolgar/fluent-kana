import React from 'react'
import {storeContext, connectWithTaskState} from '../../utils'

class Settings extends React.Component {

  render = () => (
    // this.props.task.settings.isOpened ? this.renderOpened() : this.renderClosed()
    this.renderClosed()
  )

  renderClosed = () => (
    <button onClick={this.onOpenSettings} className="btn btn-primary btn-block">Settings</button>
  )

  renderOpened = () => (
    <div>
      <button onClick={this.onCloseSettings} className="btn btn-primary btn-block">Settings opened</button>
      <div className="checkbox">
        <label><input type="checkbox"/>Use of Basic Kanjis</label>
      </div>
      <div className="checkbox">
        <label><input type="checkbox"/>Use of Punctuation Marks</label>
      </div>
    </div>
)

onOpenSettings = () => {
  this.context.store.dispatch({type: 'OPEN_SETTINGS'})
}

onCloseSettings = () => {
  this.context.store.dispatch({type: 'CLOSE_SETTINGS'})
}

static contextTypes = storeContext
}

export default connectWithTaskState(Settings)