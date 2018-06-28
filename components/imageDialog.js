import { connect } from 'react-redux'
import { Dialog } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

import { closeDialog } from '../store/reducers/imageDialog'

@connect(
  state => ({ store: state.imgDialog }),
  { closeDialog }
)
export default class ImageDialog extends React.Component {
  static propTypes = {
    closeDialog: PropTypes.func,
    store: PropTypes.object
  }
  render () {
    const { closeDialog, store } = this.props
    return (
      <Dialog onClose={closeDialog} open={store.open}>
        <img style={{ maxHeight: 540, maxWidth: 600 }} src={store.imgPath} />
      </Dialog>
    )
  }
}
