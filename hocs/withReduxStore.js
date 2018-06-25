import React from 'react'
import { initializeStore } from '../store/initStore'
import PropTypes from 'prop-types'

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE'

const getOrCreateStore = initialState => {
  if (isServer) {
    return initializeStore(initialState)
  }

  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState)
  }

  return window[__NEXT_REDUX_STORE__]
}

export default App => class WithReduxStore extends React.Component {
  static propTypes = {
    initialReduxState: PropTypes.object
  }
  static async getInitialProps (appContext) {
    const reduxStore = getOrCreateStore()

    appContext.ctx.reduxStore = reduxStore

    let appProps = {}
    if (typeof App.getInitialProps === 'function') {
      appProps = await App.getInitialProps(appContext)
    }

    return {
      ...appProps,
      initialReduxState: reduxStore.getState()
    }
  }

  constructor (props) {
    super(props)
    this.reduxStore = getOrCreateStore(props.initialReduxState)
  }

  render () {
    return (
      <App {...this.props} reduxStore={this.reduxStore} />
    )
  }
}
