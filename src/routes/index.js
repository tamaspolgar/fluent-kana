import CoreLayout from '../layouts/CoreLayout'
import HomeRoute from './home'
import StoriesRoute from './stories'
import StoryRoute from './story'

export default () => ({
  component: CoreLayout,
  path: '/',
  indexRoute: HomeRoute,
  childRoutes: [
    StoriesRoute,
    StoryRoute,
  ]
})