import { AppBar, Typography, Toolbar, IconButton, withStyles } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import PropTypes from 'prop-types'
import React from 'react'

const styles = () => ({
  title: {
    flex: 'auto'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  children: {
    paddingTop: 64
  }
})

@withStyles(styles)
export default class Layout extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    extra: PropTypes.any,
    children: PropTypes.any.isRequired,
    classes: PropTypes.object.isRequired
  }

  render () {
    const { title, extra, children, classes } = this.props
    return (
      <React.Fragment>
        <AppBar>
          <Toolbar>
            <IconButton className={classes.menuButton} color='inherit'><MenuIcon /></IconButton>
            <Typography variant='title' color='inherit' className={classes.title}>
              {title}
            </Typography>
            { extra && extra }
          </Toolbar>
        </AppBar>
        <div className={classes.children}>
          {children}
        </div>
      </React.Fragment>
    )
  }
}
