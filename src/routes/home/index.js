import React from 'react'
import {storeContext} from '../../utils'
import {push} from 'react-router-redux'

class HomeView extends React.Component {

  render = () => (
    <div>
      <section className="welcome-title">Welcome to FluentKana</section>
      <section className="welcome-text">FluentKana is a tool that helps to improve your Hiragana reading skills through various Japanese folk tales.
        It assumes that you already know the Hiragana alphabet, but you're not able to use it unconsciously.
      </section>
      <section className="welcome-text">It's easy. Just type the Romajis for the Hiraganas. Once you type the entire line
        you'll be rewarded with the meaning of the current line and the next new line to solve.
      </section>
      <section className="welcome-text">I hope you find it useful.</section>
      <section className="welcome-lets-start" onClick={ this.onToStories }>Let's start!</section>
    </div>
  )

  onToStories = () => {
    this.context.store.dispatch(push('/stories/'))
  }

  static contextTypes = storeContext
}

export default ({
  component: HomeView,
})
