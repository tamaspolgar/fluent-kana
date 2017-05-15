import React from 'react'
import {storeContext, connectWithTaskState} from '../../utils'
import {push} from 'react-router-redux'

class StoriesView extends React.Component {

  render = () => {
    const stories = this.props.task.stories
    return (
      <div>
        <div className='breadcrumbs'>
          <span className='parent' onClick={ this.onBackToHome }>Home</span>
          <span className='slash'> / </span>
          <span className='current'>Stories</span>
        </div>
        {Object.keys(stories).map((story, index) => (
          <section key={ index } className="story-button col-xs-12 col-sm-6 col-md-4 col-lg-3" onClick={this.onToStory(story)}>
            <span className="japanese">{ stories[story].title.formattedJapanese }</span>
            <span className="romaji">{ stories[story].title.english }</span>
            <span className="english">
                { (stories[story].solvedLines.length * 100 / (stories[story].solvedLines.length + stories[story].unsolvedLines.length)).toFixed(0) + '% complete' }
              </span>
          </section>
        ))}
      </div>
    )
  }

  onBackToHome = () => {
    this.context.store.dispatch(push('/'))
  }

  onToStory = (story) => () => {
    this.context.store.dispatch(push('/stories/' + story))
  }

  static contextTypes = storeContext
}

export default ({
  path: '/stories',
  component: connectWithTaskState(StoriesView),
})
