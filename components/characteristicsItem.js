import { gql } from 'apollo-boost'
import { withStyles, Card, CardContent, CardMedia, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

const styles = theme => ({
  card: {
    marginLeft: 260,
    display: 'flex',
    flexDirection: 'row',
    padding: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    alignItems: 'center'
  },
  media: {
    width: 150,
    borderRadius: 75,
    paddingTop: 150
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 'auto'
  }
})

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
    classes: PropTypes.object
  }

  render () {
    const { image, description, title, classes } = this.props
    return (
      <Card elevation={0} className={classes.card}>
        <div>
          <CardMedia
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
