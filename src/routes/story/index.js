import React from 'react'
import {storeContext, connectWithTaskState} from '../../utils'
import {push} from 'react-router-redux'

const capitalizeFirstLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1)
}

const BreadCrumbs = (props) =>
  <div className='breadcrumbs'>
    <span className='parent' onClick={ props.onBackToHome }>Home</span>
    <span className='slash'> / </span>
    <span className='parent' onClick={ props.onBackToStories }>Stories</span>
    <span className='slash'> / </span>
    <span className='current'>{ capitalizeFirstLetter(props.storyName) }</span>
  </div>

const SolvedLine = (props) =>
  <section className={ 'solved-line ' + (props.isTitle ? 'title' : 'normal') }>
    <span className='japanese'>{ props.line.formattedJapanese }</span>
    <span className='romaji'>{ props.line.romaji }</span>
    <span className='english'>{ props.line.english }</span>
  </section>

const LineBeingSolved = (props) =>
  <div>
    <section className={ props.isTitle ? 'title' : 'normal' }>
      <span className='solved-prefix'>{ props.solvedPrefix }</span>
      <span className='unsolved-suffix'>{ props.unsolvedSuffix }</span>
    </section>

    <input className='form-control input' type='text' autoCorrect='off' autoCapitalize='none'
           placeholder='Just type romajis' ref={props.inputRef}
           onChange={ props.onChange } value={ props.typed }/>

  </div>

const TheEnd = () =>
  <section className="solved-line the-end">
    <span className='japanese'>おわり</span>
    <span className='romaji'>Owari</span>
    <span className='english'>The End</span>
  </section>

const Copyright = (props) =>
  <div>
    <a className='copyright' href={ props.copyright.url }>{ props.copyright.text }</a>
  </div>

class StoryView extends React.Component {

  componentDidMount(){
    if (this.input) {
      this.input.focus();
    }
  }

  render = () => {
    const storyName = this.props.params.story
    const story = this.props.task.stories[storyName]

    return <div>
      <BreadCrumbs storyName={ storyName } onBackToHome={ this.onBackToHome } onBackToStories={ this.onBackToStories }/>
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
            inputRef={(input) => { this.input = input }}
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

  onBackToHome = () => {
    this.context.store.dispatch(push('/'))
  }

  onBackToStories = () => {
    this.context.store.dispatch(push('/stories'))
  }

  static contextTypes = storeContext
}

export default ({
  path: '/stories/:story',
  component: connectWithTaskState(StoryView),
})