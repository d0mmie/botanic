import App, {Container} from 'next/app'
import React from 'react'
import NProgress from 'nprogress'
import Router from 'next/router'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { ApolloProvider } from 'react-apollo'

import withMaterialUI from '../hocs/withMaterialUI'
import withApolloClient from '../hocs/withApolloClient'

@withApolloClient
@withMaterialUI
export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  componentDidMount () {
    NProgress.configure({
      showSpinner: false
    })
    Router.onRouteChangeStart = () => {
      NProgress.start()
    }

    Router.onBeforeHistoryChange = () => {
      NProgress.inc()
    }

    Router.onRouteChangeComplete = () => {
      NProgress.done()
    }

    Router.onRouteChangeError = () => {
      NProgress.done()
    }
  }

  render () {
    const { Component, pageProps, pageContext, apolloClient } = this.props
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <MuiThemeProvider
            theme={pageContext.theme}
            sheetsManager={pageContext.sheetsManager}
          >
            <Component {...pageProps} />
          </MuiThemeProvider>
        </ApolloProvider>
      </Container>
    )
  }
}
