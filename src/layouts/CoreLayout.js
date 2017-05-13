import React from 'react'
import Settings from './components/Settings'

class CoreLayout extends React.Component {

  constructor({children}) {
    super()
    this.children = children
  }

  render = () => (
    <div className="container app">
      <div>
        <Settings />
      </div>
      <div>
        {this.props.children}
      </div>
    </div>
  )
}

export default CoreLayout