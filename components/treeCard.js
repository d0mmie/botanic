import { gql } from 'apollo-boost'
import { withStyles, ButtonBase, Card, CardContent, CardMedia, Typography } from '@material-ui/core'
import Link from 'next/link'
import PropTypes from 'prop-types'
import React from 'react'

const styles = theme => ({
  button: {
    marginTop: 12,
    width: '100%'
  },
  card: {
    display: 'flex',
    width: 'inherit'
  },
  details: {
    flex: 'auto'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 16,
    flex: '1 0 auto'
  },
  cover: {
    width: 300,
    height: 151,
    backgroundColor: '#ccc'
  }
})

@withStyles(styles)
export default class TreeCard extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    image: PropTypes.object,
    name: PropTypes.string,
    general: PropTypes.object,
    classes: PropTypes.object
  }

  static fragment = gql`
    fragment TreeCard on Tree {
      id
      name
      image {
        url
      }
      general {
        scienceName
      }
    }
  `

  render () {
    const { id, image, name, general, classes } = this.props
    return (
      <Link href={{ pathname: '/t', query: { id } }}>
        <ButtonBase className={classes.button}>
          <Card elevation={0} square raised className={classes.card}>
            <CardMedia
              className={classes.cover}
              image={image.url}
              title={name}
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography variant='headline'>{name}</Typography>
                <Typography variant='subheading' color='textSecondary'><i>{general.scienceName}</i></Typography>
              </CardContent>
            </div>
          </Card>
        </ButtonBase>
      </Link>
    )
  }
}
