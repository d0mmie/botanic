import { gql } from 'apollo-boost'
import { withStyles, Card, CardContent, CardMedia, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { openDialog } from '../store/reducers/imageDialog'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const styles = theme => ({
  card: {
    display: 'flex',
    flexDirection: 'row',
    padding: 16,
    marginTop: 16,
    alignItems: 'center'
  },
  media: {
    width: 150,
    borderRadius: 75,
    paddingTop: 150,
    cursor: 'pointer'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 'auto'
  }
})

@connect(
  state => ({ store: state.imgDialog }),
  dispatch => bindActionCreators({ openDialog }, dispatch)
)
@withStyles(styles)
export default class CharacteristicsItem extends React.Component {
  static fragment = gql`
    fragment characteristic_characteristicsItem on Characteristic {
      id
      title
      description
      image {
        id
        url
      }
    }
  `

  static propTypes = {
    image: PropTypes.object,
    description: PropTypes.string,
    title: PropTypes.string,
    classes: PropTypes.object,
    openDialog: PropTypes.func
  }

  render () {
    const { image, description, title, classes, openDialog } = this.props
    return (
      <Card elevation={0} className={classes.card}>
        <div>
          <CardMedia
            onClick={() => openDialog(image.url)}
            className={classes.media}
            image={image.url}
            title={title}
          />
        </div>
        <CardContent className={classes.content}>
          <Typography variant='title'>{title}</Typography>
          <Typography variant='subheading'>{description}</Typography>
        </CardContent>
      </Card>
    )
  }
}
