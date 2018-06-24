import { getDataFromTree } from 'react-apollo'
import Head from 'next/head'
import PropTypes from 'prop-types'
import React from 'react'

import initApollo from '../libs/initApollo'

export default App => {
  return class Apollo extends React.Component {
    static displayName = `withApollo(${App.displayName})`
    static propTypes = {
      apolloClient: PropTypes.object,
      apolloState: PropTypes.object
    }
    static async getInitialProps (ctx) {
      const { Component, router } = ctx

      let appProps = {}
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx)
      }

      const apolloState = {}
      const apollo = initApollo()
      try {
        await getDataFromTree(
          <App
            {...appProps}
            Component={Component}
            router={router}
            apolloState={apolloState}
            apolloClient={apollo}
          />
        )
      } catch (error) {
        console.error('Error while running `getDataFromTree`', error)
      }

      if (!process.browser) {
        Head.rewind()
      }

      apolloState.data = apollo.cache.extract()

      return {
        ...appProps,
        apolloState
      }
    }

    constructor (props) {
      super(props)
      this.apolloClient = props.apolloClient || initApollo(props.apolloState.data)
    }

    render () {
      return <App {...this.props} apolloClient={this.apolloClient} />
    }
  }
}
