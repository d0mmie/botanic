import React from 'react'
import PropTypes from 'prop-types'
import getPageContext from '../libs/getPageContext'

export default App => class WithMaterialUI extends React.Component {
  static propTypes = {
    pageContext: PropTypes.object
  }

  static displayName = `withMaterialUI(${App.displayName})`

  static async getInitialProps (ctx) {
    if (App.getInitialProps) {
      return App.getInitialProps(ctx)
    }

    return {}
  }

  constructor (props) {
    super(props)
    this.pageContext = this.props.pageContext || getPageContext()
  }

  componentDidMount () {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  pageContext = null

  render () {
    return (
      <App pageContext={this.pageContext} {...this.props} />
    )
  }
}
