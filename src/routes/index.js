import CoreLayout from '../layouts/CoreLayout'
import HomeRoute from './home'
import StoriesRoute from './stories'

export default () => ({
  component   : CoreLayout,
  indexRoute  : HomeRoute,
  childRoutes : [
    HomeRoute,
    StoriesRoute,
  ]
})