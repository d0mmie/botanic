import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'
import JssProvider from 'react-jss/lib/JssProvider'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'

import getPageContext from '../libs/getPageContext'

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const pageContext = getPageContext()
    const sheet = new ServerStyleSheet()
    const page = ctx.renderPage(App => props => sheet.collectStyles(
      <JssProvider
        registry={pageContext.sheetsRegistry}
        generateClassName={pageContext.generateClassName}
      >
        <App pageContext={pageContext} {...props} />
      </JssProvider>
    ))

    const styleTags = sheet.getStyleElement()

    return {
      ...page,
      pageContext,
      styles: (
        <React.Fragment>
          <style
            id='jss-server-side'
            dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
          />
          { flush() || null }
        </React.Fragment>
      ),
      styleTags
    }
  }
  render () {
    return (
      <html>
        <Head>
          <title>{'Botanic'}</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='user-scalable=no, initial-scale=1, minimum-scale=1, width=device-width, height=device-height' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
          <link rel='stylesheet' href='https://unpkg.com/nprogress@0.2.0/nprogress.css' />
          {this.props.styleTags}
          <link rel='stylesheet' href='/static/css/style.css' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default MyDocument
