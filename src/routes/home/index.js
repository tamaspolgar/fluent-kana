import React from 'react'
import {storeContext, connectWithTaskState} from '../../utils'
import {push} from 'react-router-redux'

class HomeView extends React.Component {

  render = () => {
    const stories = this.props.task.stories
    return (
      <div>
        {Object.keys(stories).map((story, index) => (
          <button key={index} className="btn btn-primary btn-lg btn-block" onClick={this.onClick(story)}>
            <div className="col-xs-9">
              <p className="solved-japanese">{ stories[story].title.formattedJapanese }</p>
              <p className="solution-english">{ stories[story].title.english }</p>
            </div>
            <div className="col-xs-3">
              <p className="solution-romaji">
                { (stories[story].solvedLines.length * 100 / (stories[story].solvedLines.length + stories[story].unsolvedLines.length)).toFixed(0) + ' %' }
              </p>
            </div>
          </button>
        ))}
      </div>
    )
  }

  onClick = (story) => () => {
    this.context.store.dispatch(push('/stories/' + story))
  }

  static contextTypes = storeContext
}

export default ({
  path: 'home',
  component: connectWithTaskState(HomeView),
})