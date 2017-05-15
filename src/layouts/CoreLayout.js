import React from 'react'

class CoreLayout extends React.Component {

  constructor({children}) {
    super()
    this.children = children
  }

  render = () => (
    <div className="container app">
      <div>
        {this.props.children}
      </div>
    </div>
  )
}

export default CoreLayout