import { AppBar, Typography, Toolbar, IconButton, withStyles, Icon, Drawer, List, ListItem, ListItemIcon, ListItemText, Hidden } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import Link from 'next/link'

const RenderList = () => (
  <List>
    <Link href={{ pathname: '/dashboard' }}>
      <ListItem button>
        <ListItemIcon>
          <Icon>{'dashboard'}</Icon>
        </ListItemIcon>
        <ListItemText primary='แดชบอร์ด' />
      </ListItem>
    </Link>
    <Link href={{ pathname: '/tree' }}>
      <ListItem button>
        <ListItemIcon>
          <Icon>{'view_list'}</Icon>
        </ListItemIcon>
        <ListItemText primary='รายชื่อต้นไม้' />
      </ListItem>
    </Link>
  </List>
)

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  title: {
    flex: 'auto'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawerPaper: {
    position: 'fixed',
    width: 260
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      marginLeft: 260
    },
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    minWidth: 0 // So the Typography noWrap works
  }
})

@withStyles(styles)
export default class Layout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
    this.handleOpenDialog = this.handleOpenDialog.bind(this)
    this.handleCloseDialog = this.handleCloseDialog.bind(this)
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    extra: PropTypes.any,
    children: PropTypes.any.isRequired,
    classes: PropTypes.object.isRequired
  }

  handleCloseDialog () {
    this.setState({ open: false })
  }

  handleOpenDialog () {
    this.setState({ open: true })
  }

  render () {
    const { title, extra, children, classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Hidden mdUp>
              <IconButton onClick={this.handleOpenDialog} className={classes.menuButton} color='inherit'><Icon>{'menu'}</Icon></IconButton>
            </Hidden>
            <Typography variant='title' color='inherit' className={classes.title}>
              {title}
            </Typography>
            { extra && extra }
          </Toolbar>
        </AppBar>
        <Hidden smDown implementation='css'>
          <Drawer variant='permanent' open={this.state.open} onClose={this.handleCloseDialog} classes={{ paper: classes.drawerPaper }} >
            <div className={classes.toolbar} />
            <RenderList />
          </Drawer>
        </Hidden>
        <Hidden mdUp>
          <Drawer
            variant='temporary'
            open={this.state.open}
            onClose={this.handleCloseDialog}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{
              keepMounted: true
            }}
          >
            <RenderList />
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    )
  }
}
