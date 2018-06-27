import React from 'react'
import { Icon, withStyles } from '@material-ui/core'
import { fade } from '@material-ui/core/styles/colorManipulator'
import PropTypes from 'prop-types'

const styles = theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    borderRadius: 2,
    background: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      background: fade(theme.palette.common.white, 0.25)
    },
    '& $input': {
      transition: theme.transitions.create('width'),
      width: 200,
      '&:focus': {
        width: 250
      }
    }
  },
  search: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    font: 'inherit',
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit * 9}px`,
    border: 0,
    display: 'block',
    verticalAlign: 'middle',
    whiteSpace: 'normal',
    background: 'none',
    margin: 0,
    color: 'inherit',
    width: '100%',
    '&:focus': {
      outline: 0
    },
    '&::placeholder': {
      color: '#fff'
    }
  }
})

@withStyles(styles)
export default class SearchBox extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }
  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.search}>
          <Icon>{'search'}</Icon>
        </div>
        <input
          className={classes.input}
          placeholder='ค้นหา'
        />
      </div>
    )
  }
}
