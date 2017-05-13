import React from 'react'
import {storeContext, connectWithTaskState} from '../../utils'

const SolvedLine = (props) =>
  <section className={ props.isTitle ? 'title' : '' }>
    <p><span className='solved-japanese'>{ props.line.formattedJapanese }</span></p>
    <p><span className='solution-romaji'>{ props.line.romaji }</span></p>
    <p><span className='solution-english'>{ props.line.english }</span></p>
  </section>

const LineBeingSolved = (props) =>
  <div>
    <section className={ props.isTitle ? 'title' : '' }>
      <p>
        <span className='solved-japanese'>{ props.solvedPrefix }</span>
        <span className='not-solved'>{ props.unsolvedSuffix }</span>
      </p>
    </section>

    <input className='form-control input' type='text' autoCorrect='off' autoCapitalize='none'
           placeholder='Just type romajis'
           onChange={ props.onChange } value={ props.typed }/>

  </div>

const TheEnd = () =>
  <section>
    <p><span className='solved-japanese'>おわり</span></p>
    <p><span className='solution-romaji'>Owari</span></p>
    <p><span className='solution-english'>The End</span></p>
  </section>

const Copyright = (props) =>
  <div>
    <a className='copyright' href={ props.copyright.url }>{ props.copyright.text }</a>
  </div>

class StoryView extends React.Component {

  render = () => {
    const storyName = this.props.params.story
    const story = this.props.task.stories[storyName]

    return <div>
      {
        story.solvedLines.map((line, index) => (
          <SolvedLine key={index}
            isTitle={index === 0}
            line={line}
          />
        ))
      }
      {
        story.unsolvedSuffix ?
          <LineBeingSolved
            isTitle={story.solvedLines.length === 0}
            solvedPrefix={story.solvedPrefix}
            unsolvedSuffix={story.unsolvedSuffix}
            typed={story.typed}
            onChange={this.onChange}
          /> :
          <TheEnd />
      }
      {
        <Copyright
          copyright={story.copyright}
        />
      }
    </div>
  }

  onChange = (e) => {
    this.context.store.dispatch({
      type: 'CHANGED',
      payload: {
        story: this.props.params.story,
        typed: e.target.value,
      }
    })
  }

  static contextTypes = storeContext
}

export default ({
  path: 'stories/:story',
  component: connectWithTaskState(StoryView),
})